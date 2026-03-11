FROM codercom/code-server:latest
USER root
RUN apt-get update 
RUN apt-get install -y python3-pip
RUN apt-get install curl
RUN apt-get install unzip
ENV HOME="/home/coder"
ENV DENO_INSTALL="$HOME/.deno"
RUN echo "export PATH=\"$DENO_INSTALL/bin:\$PATH\"" >> $HOME/.bashrc
RUN curl -fsSL https://deno.land/install.sh | sh
RUN apt-get install build-essential
RUN apt-get install zlib1g-dev
RUN apt-get install -y musl-dev
RUN apt-get install -y ffmpeg libavcodec-dev libavformat-dev libavdevice-dev libavutil-dev libswscale-dev libswresample-dev
RUN git clone https://github.com/bellard/quickjs.git && cd quickjs && make && make install
USER coder
