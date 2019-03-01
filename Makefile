.PHONY: setup
setup: packages

.PHONY: packages
packages:
	yarn install

.PHONY: configure
configure:
	npm install -g @adonisjs/cli
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