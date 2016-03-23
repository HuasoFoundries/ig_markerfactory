VERSION = $(shell cat package.json | sed -n 's/.*"version": "\([^"]*\)",/\1/p')


version:
	@echo $(VERSION)


default: build
.PHONY: build


update_version:
	@echo "Current version is " ${VERSION}
	@echo "Next version is " $(v)
	sed -i s/"$(VERSION)"/"$(v)"/g package.json

tag_and_push:
		git add --all
		git commit -a -m "Tag v $(v) $(m)"
		git tag v$(v)
		git push
		git push --tags

tag: update_version build tag_and_push		
		