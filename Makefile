.PHONY: clean build dev

install:
	npm install

clean:
	rm -rf dist
clean-all:
	rm -rf dist
	rm -rf node_modules
	rm -rf .vite
	rm -rf .vite-plugin-ssr
	rm -rf .vite-plugin-ssr-cache
	rm -rf .vite-plugin-ssr-cache-dir
	rm -rf .vite-plugin-ssr-cache-dir-dir
	rm -rf .vite-plugin-ssr-cache-dir-dir-dir
	rm -rf .vite-plugin-ssr-cache-dir-dir-dir-dir

build:
	npm run build

dev:
	npm run dev

deploy: build
	npm run deploy