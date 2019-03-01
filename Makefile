.PHONY: setup
setup: packages

.PHONY: packages
packages:
	yarn install

.PHONY: configure
configure:
	adonis key:generate
	adonis migration:run

.PHONY: test
test:
	yarn run test

.PHONY: prettier
prettier:
	yarn run prettier

.PHONY: format
format:
	yarn run format