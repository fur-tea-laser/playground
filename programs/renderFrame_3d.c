#include <quickjs/quickjs.h>
#include <quickjs/quickjs-libc.h>
#include <stdlib.h>
#include <stdint.h>
#include <stddef.h>

typedef struct {
	uint16_t framePixelResolution;
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

JSValue js_renderFrameCells(
	JSContext* jsContext,
	JSValueConst this_val,
	int argc,
	JSValueConst* argv
) {
	FrameState* frameState = JS_GetContextOpaque(jsContext);
  printf("%d\n", frameState->framePixelResolution);
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
  uint16_t framePixelResolution = atoi(argv[2]);
  int32_t frameCount = atoi(argv[3]);
  int32_t frameIndex = atoi(argv[4]);
  uint8_t* memoryBlock = 
		(uint8_t*)malloc(sizeof(FrameState));
	uint8_t* memoryCursor = memoryBlock;
	FrameState* frameState =
		(FrameState*)memoryBlock;
  frameState->framePixelResolution = framePixelResolution;
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