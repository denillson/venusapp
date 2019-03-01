.PHONY: setup
setup: packages

.PHONY: packages
packages:
	yarn install

.PHONY: test
test:
	yarn run test

.PHONY: prettier
prettier:
	yarn run prettier

.PHONY: format
format:
	yarn run format