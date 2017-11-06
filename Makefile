VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')


version:
	@echo $(VERSION)


default: build 
.PHONY: build test

build:
	jspm build src/markerfactory.js dist/markerfactory.js --format umd  --global-name MarkerFactory
	jspm build src/markerfactory.js dist/markerfactory.esm.js --format esm --skip-source-maps --global-name MarkerFactory

test:
	./node_modules/.bin/mocha

update_version:
	@echo "Current version is " ${VERSION}
	@echo "Next version is " $(v)
	sed -i s/'"$(VERSION)"'/'"$(v)"'/ package.json

tag_and_push:
		git add --all
		git commit -a -m "Tag v $(v) $(m)"
		git tag v$(v)
		git push
		git push --tags
		npm publish

tag: update_version build tag_and_push		

		