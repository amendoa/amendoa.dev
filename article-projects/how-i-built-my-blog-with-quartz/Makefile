all: clean prepare get-quartz link-quartz-overrides install-quartz-dependencies

prepare:
	@mkdir quartz

get-quartz: quartz
	@cd quartz; \
    curl -L https://github.com/jackyzha0/quartz/archive/refs/tags/v4.5.1.tar.gz | tar --strip-components=1 -xzf -

link-quartz-overrides: content quartz.config.ts quartz.layout.ts static/icon.png static/og-image.png
	@cd quartz; \
	rm -rf content quartz.config.ts quartz.layout.ts quartz/static/icon.png quartz/static/og-image.png; \
	ln -s ../content; \
	ln -s ../quartz.config.ts; \
	ln -s ../quartz.layout.ts; \
	cp ../static/icon.png quartz/static/; \
	cp ../static/og-image.png quartz/static/

install-quartz-dependencies: quartz
	@cd quartz; \
	npm i

clean:
	@rm -rf quartz
