VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')


version:
	@echo $(VERSION)


default: build 
.PHONY: build test

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

		