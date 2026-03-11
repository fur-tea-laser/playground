#include <libavformat/avformat.h>
#include <libavcodec/avcodec.h>
#include <libavutil/opt.h>
#include <libavutil/imgutils.h>
#include <libswscale/swscale.h>
#include <stdio.h>

int main(int argc, char** argv) {
  char* outputDirectoryPath = argv[1];
	char* framesDirectoryPath = argv[2];
	char* animationName = argv[3];
	char outputFilePath[200];
	snprintf(outputFilePath, sizeof(outputFilePath), "%s%s.mp4", outputDirectoryPath, animationName);
  char sequenceFramePattern[200];
	snprintf(sequenceFramePattern, sizeof(sequenceFramePattern), "%s%s_%%d.png", framesDirectoryPath, animationName);
	// 1. input initialization (demuxer & decoder)
	// open the input file sequence
	AVFormatContext* inputFormatContext = NULL;
	avformat_open_input(&inputFormatContext, sequenceFramePattern, NULL, NULL);
	// read stream information to populate details like width, height from first image
	avformat_find_stream_info(inputFormatContext, NULL);
	// find primary video stream in input
	const AVCodec* inputCodec = NULL;
	int inputStreamIndex = av_find_best_stream(inputFormatContext, AVMEDIA_TYPE_VIDEO, -1, -1, &inputCodec, 0);
	AVStream* inputStream = inputFormatContext->streams[inputStreamIndex];
	// create decoder context for input pngs
	AVCodecContext* decoderContext = avcodec_alloc_context3(inputCodec);
	// copy paramaters (width, height, format) from the stream to the decoder context
	avcodec_parameters_to_context(decoderContext, inputStream->codecpar);
	// initialize the decoder
	avcodec_open2(decoderContext, inputCodec, NULL);
	// 2. output initialization (muxer & encoder)
	// allocate mp4 output context
	AVFormatContext* outputFormatContext = NULL;
	avformat_alloc_output_context2(&outputFormatContext, NULL, NULL, outputFilePath);
	// find H.264 encoder
	const AVCodec* outputCodec = avcodec_find_encoder(AV_CODEC_ID_H264);
	// create encoder context
	AVCodecContext* encoderContext = avcodec_alloc_context3(outputCodec);
	// encoder configuration
	encoderContext->width = decoderContext->width;
	encoderContext->height = decoderContext->height; 
	encoderContext->sample_aspect_ratio = decoderContext->sample_aspect_ratio;
	encoderContext->pix_fmt = AV_PIX_FMT_YUV420P;
	encoderContext->framerate = (AVRational){30,1};
	encoderContext->time_base = (AVRational){1,encoderContext->framerate.num};
	// encoderContext->bit_rate = 4000000; // ignored because using qp
	encoderContext->gop_size = 1; // all-intra encoding
	encoderContext->max_b_frames = 0; // all-intra encoding
	// set H.264 preset (speed vs compression)
	// ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow
	av_opt_set(encoderContext->priv_data, "preset", "ultrafast", 0);
	// set crf value (0-51), 18-23 is sweet spot for high-quality. 0 is lossless, 51 is trash.
	// av_opt_set(encoderContext->priv_data, "crf", "18", 0); // ignored because using qp
	// set quantization parameter (0-51). 0 lossless. 18 visually transparent. 23 default. 51 maximum compressioin (trash)
	av_opt_set(encoderContext->priv_data, "qp", "18", 0);
	// open the encoder
	avcodec_open2(encoderContext, outputCodec, NULL);
	// create new stream in output file
	AVStream* outputStream = avformat_new_stream(outputFormatContext, NULL);
	outputStream->time_base = encoderContext->time_base; // ??? line below
	// copy encoder parameters to output stream
	avcodec_parameters_from_context(outputStream->codecpar, encoderContext);
	// open output file on disk
	avio_open(&outputFormatContext->pb, outputFilePath, AVIO_FLAG_WRITE);
	// write mp4 header
	avformat_write_header(outputFormatContext, NULL);
	// 3. rgb -> yuv conversion
	// create software scaler context
	struct SwsContext* scalerContext = sws_getContext(decoderContext->width, decoderContext->height, decoderContext->pix_fmt, encoderContext->width, encoderContext->height, encoderContext->pix_fmt, SWS_BILINEAR, NULL, NULL, NULL);
	// 4. frame & packet allocation
	AVFrame* inputFrame = av_frame_alloc();
	AVFrame* outputFrame = av_frame_alloc();
	AVPacket* inputPacket = av_packet_alloc();
	AVPacket* outputPacket = av_packet_alloc();
	// allocate memory for output frame (yuv)
	outputFrame->format = encoderContext->pix_fmt;
	outputFrame->width = encoderContext->width;
	outputFrame->height = encoderContext->height;
	av_frame_get_buffer(outputFrame, 0);
	// 5. encoding loop
	int presentationTimestampCounter = 0;
	// read packets from input till empty
	while (av_read_frame(inputFormatContext, inputPacket) >= 0) {
		// only process video stream packets
		if (inputPacket->stream_index == inputStreamIndex) {
			// send png packet to decoder
			avcodec_send_packet(decoderContext, inputPacket);
			// receive uncompressed frame(s) from decoder
			// (loop because packet could yield multitple frames, though rare for png)
			while (avcodec_receive_frame(decoderContext, inputFrame) >= 0) {
				// scale frame fromrgb to yuv
				sws_scale(scalerContext, (const uint8_t* const*)inputFrame->data, inputFrame->linesize, 0, decoderContext->height, outputFrame->data, outputFrame->linesize);
				// make output frame writable
				av_frame_make_writable(outputFrame);
				// set timestamp (important for playback speed)
				outputFrame->pts = presentationTimestampCounter++;
				// send raw yuv frameto encoder
				avcodec_send_frame(encoderContext, outputFrame);
				// receive compressed h.264 packet(s) from encoder
				while (avcodec_receive_packet(encoderContext, outputPacket) >= 0) {
					// rescale encoder timebase to output stream timebase (container)
					av_packet_rescale_ts(outputPacket, encoderContext->time_base, outputStream->time_base);
					outputPacket->stream_index = outputStream->index;
					// write packet to file
					av_interleaved_write_frame(outputFormatContext, outputPacket);
					// reset output packet by unreferencing
					av_packet_unref(outputPacket);
				}
				// cleanup input frame
				av_frame_unref(inputFrame);
			}
		}
		// cleanup input packet
		av_packet_unref(inputPacket);
	}	
	// 6. flush encoder
	// send null to encoder to signal EOF and flush remaining frames
	avcodec_send_frame(encoderContext, NULL);
	// ???
	while (avcodec_receive_packet(encoderContext, outputPacket) >= 0) {
		av_packet_rescale_ts(outputPacket, encoderContext->time_base, outputStream->time_base);
		outputPacket->stream_index = outputStream->index;
		av_interleaved_write_frame(outputFormatContext, outputPacket);
		av_packet_unref(outputPacket);
	}
	// 7. finalization
	// write mp4 trailer (creates the moov atom required for playback)
	av_write_trailer(outputFormatContext);
	// cleanup memory
	avformat_close_input(&inputFormatContext);
	if (!(outputFormatContext->oformat->flags & AVFMT_NOFILE)) {
		avio_closep(&outputFormatContext->pb);
	}
	avformat_free_context(outputFormatContext);
	avcodec_free_context(&encoderContext);
	avcodec_free_context(&decoderContext);
	av_frame_free(&inputFrame);
	av_frame_free(&outputFrame);
	av_packet_free(&inputPacket);
	av_packet_free(&outputPacket);
	sws_freeContext(scalerContext);
	return 0;
}	