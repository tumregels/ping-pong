SHELL := /bin/bash

.PHONY: all publish

all: publish

publish: 
	git config --global user.name "publisher" && \
	git config --global user.email "publisher@git.hub" && \
	git checkout -b gh-pages && \
	git add . && \
	git commit -am 'update gh-pages' && \
	git push https://github.com/ruboshirinyan/ping-pong gh-pages --force && \
	git checkout master