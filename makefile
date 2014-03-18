.PHONY: uglify

uglify:
	uglifyjs ./timeformat.js -m > ./timeformat.min.js
