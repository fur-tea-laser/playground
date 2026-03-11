#! /bin/sh

gcc -o /home/coder/project/binaries/renderFrame_3d /home/coder/project/programs/renderFrame_3d.c -O3 /home/coder/project/programs/shared/*.c -L/usr/local/lib/quickjs -lquickjs -lm -lpthread -lz