#include <stdlib.h>
#include <stdint.h>
#include <stddef.h>
#include <math.h>
#include <quickjs/quickjs.h>
#include <quickjs/quickjs-libc.h>
#include "./shared/PngEncoding.h"
#include "./shared/PngPixels.h"

typedef struct {
  char* framesDirectoryPath;
	char* animationName;
  Rgb8bitPngPixels* framePixels;
	uint8_t* frameEncoding;
	uint16_t framePixelResolution;
  uint16_t frameIndex;
  double fieldOfViewAngle;
} FrameState;

static void freeBufferData(
	JSRuntime* jsRuntime, 
	void* opaque,
	void* bufferData
) {
	free(bufferData);
}

const size_t FRAME_CELL_SIZE = 35;

static JSValue js_getFrameCellBuffer(
	JSContext* jsContext, 
	JSValueConst this_val, 
	int argc, 
	JSValueConst* argv
) {
	uint32_t frameCellCount;
	JS_ToUint32(jsContext, &frameCellCount, argv[0]);
	uint32_t bufferSize = FRAME_CELL_SIZE * frameCellCount;
	void* bufferData = malloc(bufferSize);
	return JS_NewArrayBuffer(jsContext, bufferData, bufferSize, freeBufferData, NULL, 0);	
}

void renderCellPixel(
	Rgb8bitPngPixels* framePixels,
	U16 framePixelResolution,
	S64 cellPixelX,
	S64 cellPixelY,
	U8 cellPixelRed,
	U8 cellPixelGreen,
	U8 cellPixelBlue
) {
	if (
		cellPixelX >= 0 &&
		cellPixelX < framePixelResolution &&
		cellPixelY >= 0 &&
		cellPixelY < framePixelResolution
	) {
		Rgb8bitPixelChannels* currentPixelChannels =
			atPixelsDataPixelChannels(
				framePixels,
				cellPixelX,
				cellPixelY
			);
		currentPixelChannels->red =
			cellPixelRed;
		currentPixelChannels->green =
			cellPixelGreen;
		currentPixelChannels->blue =
			cellPixelBlue;
	}
}

JSValue js_renderFrameCells(
	JSContext* jsContext,
	JSValueConst this_val,
	int argc,
	JSValueConst* argv
) {
	FrameState* frameState = JS_GetContextOpaque(jsContext);
  Rgb8bitPixelChannels* currentPixelChannels;
	for (
		U16 pixelColumnIndex = 0;
		pixelColumnIndex < frameState->framePixelResolution;
		pixelColumnIndex++
	) {
		for (
			U16 pixelRowIndex = 0;
			pixelRowIndex < frameState->framePixelResolution;
			pixelRowIndex++
		) {
			currentPixelChannels = 
				atPixelsDataPixelChannels(
					frameState->framePixels,
					pixelColumnIndex,
					pixelRowIndex
				);
			currentPixelChannels->red = 0;
			currentPixelChannels->green = 0;
			currentPixelChannels->blue = 0;
		}
	}
  // transform frame cells
  size_t bufferSize;
	uint8_t* bufferData = JS_GetArrayBuffer(jsContext, &bufferSize, argv[0]);
	size_t cellCount = bufferSize / FRAME_CELL_SIZE;
	uint32_t cellByteOffset;
	double centerX, centerY, centerZ, halfRoot;
	uint8_t frameColorRed, frameColorGreen, frameColorBlue;
	int cellPixelCenterX, cellPixelCenterY, cellPixelX, cellPixelY;
	uint32_t cellPixelHalfRoot;
	double cellScalar = frameState->framePixelResolution / 2;
	double fieldOfViewScalar, scalarX, scalarY, scaledX, scaledY, scaledHalfRoot, clippingW;
	for (size_t cellIndex = 0; cellIndex < cellCount; cellIndex++) {
		cellByteOffset = FRAME_CELL_SIZE * cellIndex;
		centerX = *(double*)(bufferData + cellByteOffset);
		centerY = *(double*)(bufferData + cellByteOffset + 8);
		centerZ = *(double*)(bufferData + cellByteOffset + 16);
		halfRoot = *(double*)(bufferData + cellByteOffset + 24);
		frameColorRed = *(uint8_t*)(bufferData + cellByteOffset + 32);
		frameColorGreen = *(uint8_t*)(bufferData + cellByteOffset + 33);
		frameColorBlue = *(uint8_t*)(bufferData + cellByteOffset + 34);
		fieldOfViewScalar = tan(frameState->fieldOfViewAngle / 2);
		scalarY = 1 / fieldOfViewScalar;
		scalarX = 1 / fieldOfViewScalar;
		scaledX = centerX * scalarX;
		scaledY = centerY * scalarY;
		scaledHalfRoot = halfRoot * scalarY;
		clippingW = -centerZ;
		scaledX = scaledX / clippingW;
		scaledY = scaledY / clippingW;
		scaledHalfRoot = scaledHalfRoot / clippingW;
		cellPixelCenterX =
			(int)round(cellScalar * (scaledX + 1));
		cellPixelCenterY =
			(int)round(cellScalar * (scaledY + 1));
		cellPixelHalfRoot =
			(uint32_t)(cellScalar * scaledHalfRoot);
		cellPixelX = cellPixelCenterX;
		cellPixelY = cellPixelCenterY;
		renderCellPixel(
			frameState->framePixels,
			frameState->framePixelResolution,
			cellPixelX,
			cellPixelY,
			frameColorRed,
			frameColorGreen,
			frameColorBlue
		);
		for (
			uint32_t halfRootIndex = 0;
			halfRootIndex < cellPixelHalfRoot;
			halfRootIndex++
		) {
			uint32_t pixelSideLength = 2 * halfRootIndex;
			for (
				uint32_t sideIndex = 0;
				sideIndex < pixelSideLength;
				sideIndex++
			) {
				cellPixelX = 
					cellPixelCenterX - halfRootIndex + sideIndex;
				cellPixelY = 
					cellPixelCenterY - halfRootIndex;
				renderCellPixel(
					frameState->framePixels,
					frameState->framePixelResolution,
					cellPixelX,
					cellPixelY,
					frameColorRed,
					frameColorGreen,
					frameColorBlue
				);
				cellPixelX =
					cellPixelCenterX + halfRootIndex;
				cellPixelY =
					cellPixelCenterY - halfRootIndex + sideIndex;
				renderCellPixel(
					frameState->framePixels,
					frameState->framePixelResolution,
					cellPixelX,
					cellPixelY,
					frameColorRed,
					frameColorGreen,
					frameColorBlue
				);
				cellPixelX =
					cellPixelCenterX - halfRootIndex + sideIndex + 1;
				cellPixelY =
					cellPixelCenterY + halfRootIndex;
				renderCellPixel(
					frameState->framePixels,
					frameState->framePixelResolution,
					cellPixelX,
					cellPixelY,
					frameColorRed,
					frameColorGreen,
					frameColorBlue
				);
				cellPixelX = 
					cellPixelCenterX - halfRootIndex;
				cellPixelY =
					cellPixelCenterY - halfRootIndex + sideIndex + 1;
				renderCellPixel(
					frameState->framePixels,
					frameState->framePixelResolution,
					cellPixelX,
					cellPixelY,
					frameColorRed,
					frameColorGreen,
					frameColorBlue
				);
			}
		}
	}
  ///
  encodeRgb8bitPngPixels(
		frameState->frameEncoding, 
		frameState->framePixels
	);
  char frameFilePath[200];
	snprintf(
		frameFilePath,
		sizeof(frameFilePath),
		"%s%s_%d.png",
		frameState->framesDirectoryPath,
		frameState->animationName,
		frameState->frameIndex
	);
	FILE* frameFile =
		fopen(frameFilePath, "wb");
	fwrite(
		frameState->frameEncoding,
		1,
		getRgb8bitPngEncodingSize(frameState->frameEncoding),
		frameFile
	);
	fclose(frameFile);
	return JS_UNDEFINED;
}

static const JSCFunctionListEntry jsHostFunctions[] = {
	JS_CFUNC_DEF("getFrameCellBuffer", 1, js_getFrameCellBuffer),
	JS_CFUNC_DEF("renderFrameCells", 1, js_renderFrameCells)
};

void setupAndLoadEntryScript(
	JSRuntime* jsRuntime,
	JSContext* jsContext,
	JSValue globalJs,
	char* scriptEntryPath
) {
	js_std_add_helpers(jsContext, 0, NULL);
  JSValue hostNamespace = JS_NewObject(jsContext);
	JS_SetPropertyFunctionList(jsContext, hostNamespace, jsHostFunctions, sizeof(jsHostFunctions)/sizeof(jsHostFunctions[0]));
	JS_SetPropertyStr(jsContext, globalJs, "Host", hostNamespace);
	JS_SetModuleLoaderFunc(jsRuntime, NULL, js_module_loader, NULL);
	size_t scriptBufferLength;
	uint8_t *scriptBuffer = js_load_file(jsContext, &scriptBufferLength, scriptEntryPath);
	JSValue maybeSyntaxException = JS_Eval(jsContext, (const char*)scriptBuffer, scriptBufferLength, scriptEntryPath, JS_EVAL_TYPE_MODULE);
	if (JS_IsException(maybeSyntaxException)) {
		js_std_dump_error(jsContext);
	}
	JS_FreeValue(jsContext, maybeSyntaxException);
	js_free(jsContext, scriptBuffer);	
}

int main(int argc, char** argv) {
  char* scriptPath = argv[1];
  char* framesDirectoryPath = argv[2];
  char* animationName = argv[3];
  uint16_t framePixelResolution = atoi(argv[4]);
  double fieldOfViewAngle = atof(argv[5]);
  int32_t frameCount = atoi(argv[6]);
  int32_t frameIndex = atoi(argv[7]);
  size_t framesDirectoryPathSize =
		strlen(framesDirectoryPath) + 1;
	size_t animationNameSize =
			strlen(animationName) + 1;
  size_t framePixelsSize =
		sizeofRgb8bitPngPixels(
			framePixelResolution,
			framePixelResolution
		);
	size_t maxFrameEncodingSize =
		maxsizeofRgb8bitPngEncoding(
			framePixelResolution,
			framePixelResolution
		);
  uint8_t* memoryBlock = 
		(uint8_t*)malloc(sizeof(FrameState) + framesDirectoryPathSize + animationNameSize + framePixelsSize + maxFrameEncodingSize);
	uint8_t* memoryCursor = memoryBlock;
	FrameState* frameState =
		(FrameState*)memoryBlock;
  memoryCursor += sizeof(FrameState);
  frameState->framesDirectoryPath = (char*)memoryCursor;
	strcpy(
		frameState->framesDirectoryPath,
		framesDirectoryPath
	);
	memoryCursor += framesDirectoryPathSize;
  frameState->animationName = (char*)memoryCursor;
	strcpy(
		frameState->animationName,
		animationName
	);
	memoryCursor += animationNameSize;
  frameState->framePixels = (Rgb8bitPngPixels*)memoryCursor;
	initRgb8bitPngPixels(
		frameState->framePixels,
		framePixelResolution,
		framePixelResolution
	);
	memoryCursor += framePixelsSize;
	frameState->frameEncoding = (uint8_t*)memoryCursor;
	initRgb8bitPngEncoding(
		frameState->frameEncoding,
		frameState->framePixels
	);
  frameState->framePixelResolution = framePixelResolution;
  frameState->fieldOfViewAngle = fieldOfViewAngle;
  frameState->frameIndex = frameIndex;
  JSRuntime* jsRuntime = JS_NewRuntime();
	JSContext* jsContext = JS_NewContext(jsRuntime);
  JSValue globalJs = JS_GetGlobalObject(jsContext);
  setupAndLoadEntryScript(
		jsRuntime,
		jsContext,
		globalJs,
		scriptPath
	);
  JS_SetContextOpaque(jsContext, frameState);
  JSValue getFrameCellsCallback = JS_GetPropertyStr(jsContext, globalJs, "getFrameCells");
	JSValue getFrameCellsArgs[2] = {
		JS_NewInt32(jsContext, frameCount),
		JS_NewInt32(jsContext, frameIndex)
	};
	JSValue maybeRuntimeException = JS_Call(jsContext, getFrameCellsCallback, globalJs, 2, getFrameCellsArgs);
	if (JS_IsException(maybeRuntimeException)) {
		js_std_dump_error(jsContext);
	}
  JS_FreeValue(jsContext, maybeRuntimeException);
	JS_FreeValue(jsContext, getFrameCellsArgs[1]);
	JS_FreeValue(jsContext, getFrameCellsArgs[0]);
	JS_FreeValue(jsContext, getFrameCellsCallback);
	JS_FreeValue(jsContext, globalJs);
	JS_FreeContext(jsContext);
	JS_FreeRuntime(jsRuntime);
}