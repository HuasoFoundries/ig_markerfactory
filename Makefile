VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')
current_eslint = $(shell cat package.json | sed -n 's/.*"babel-eslint": "\([^"]*\)",/\1/p')
current_babel_eslint = $(shell cat package.json | sed -n 's/.*"eslint": "\([^"]*\)",/\1/p')
SHELL = /usr/bin/env bash

YELLOW=\033[0;33m
RED=\033[0;31m
WHITE=\033[0m
GREEN=\u001B[32m

version:
	@echo $(VERSION)


default: build 
.PHONY: build test

update_eslint:
	@echo  -e "Current eslint is $(GREEN)$(current_eslint)$(WHITE), current babel-eslint is $(GREEN)$(current_babel_eslint)$(WHITE)" ;\
	npm remove --save-dev eslint babel-eslint ;\
	npm install --save-dev eslint babel-eslint

	

build:
	@$$(npm bin)/rollup -c
	@MINIFY=true $$(npm bin)/rollup -c
	@sed -i s/"global.MarkerFactory"/"global"/g dist/markerfactory.js
	@sed -i s/"global.MarkerFactory"/"global"/g dist/markerfactory.min.js

test:
	$$(npm bin)/mocha

update_version:
	@echo "Current version is " ${VERSION}
	@echo "Next version is " $(v)
	@sed -i s/'"version": "$(VERSION)"'/'"version": "$(v)"'/ package.json

tag_and_push:
		git add --all
		git commit -a -m "Tag v $(v) $(m)"
		git tag v$(v)
		git push
		git push --tags
		npm publish

tag: build test update_version tag_and_push		

		