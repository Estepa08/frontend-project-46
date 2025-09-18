.PHONY: test lint fix

test:
	npm test

test watch:
	npm run test:watch

test-coverage:
	npm test -- --coverage	

lint:
	npx eslint . 

fix:
	npx eslint . --fix