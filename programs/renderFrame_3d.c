#include <quickjs/quickjs.h>
#include <quickjs/quickjs-libc.h>
#include <stdlib.h>
#include <stdint.h>

void setupAndLoadEntryScript(
	JSRuntime* jsRuntime,
	JSContext* jsContext,
	JSValue globalJs,
	char* scriptEntryPath
) {
	js_std_add_helpers(jsContext, 0, NULL);
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
  int32_t frameCount = atoi(argv[2]);
  int32_t frameIndex = atoi(argv[3]);
  JSRuntime* jsRuntime = JS_NewRuntime();
	JSContext* jsContext = JS_NewContext(jsRuntime);
  JSValue globalJs = JS_GetGlobalObject(jsContext);
  setupAndLoadEntryScript(
		jsRuntime,
		jsContext,
		globalJs,
		scriptPath
	);
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