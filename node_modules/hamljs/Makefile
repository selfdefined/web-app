REPORTER = spec
test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter $(REPORTER) \
		test/test.js

benchmark:
	@node-bench benchmarks/run.js

.PHONY: test benchmark
