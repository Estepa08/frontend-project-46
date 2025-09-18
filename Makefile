.PHONY: test lint fix

test:
	npm test

test watch:
	npm run test:watch

lint:
	npx eslint . 

fix:
	npx eslint . --fix