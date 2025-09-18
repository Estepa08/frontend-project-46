.PHONY: test lint fix

test:
	npm test

lint:
	npx eslint . 

fix:
	npx eslint . --fix