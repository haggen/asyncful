all: asyncful.js
	@curl -s -d output_info=compiled_code --data-urlencode "js_code@asyncful.js" http://closure-compiler.appspot.com/compile > asyncful.min.js