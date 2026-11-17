---
title: "Setting Up a Blog With Quartz"
lang: en
translationKey: how-i-built-my-blog-with-quartz
routeSlug: how-i-built-my-blog-with-quartz
tags: [quartz]
date: 2026-01-10
---

This tutorial documents a setup I built with Quartz v4.5.1. My blog no longer uses this structure; it now runs on Astro.

Creating a personal blog may seem challenging—especially if, like me, you once considered building everything from scratch. Building tools from scratch is really cool and challenging, but the truth is that if your main goal is to share content, a ready-made solution will do the job just fine.

At the time, I was using [Obsidian](https://obsidian.md/) to write and organize my notes and documentation in [Markdown](https://en.wikipedia.org/wiki/Markdown) files, so I decided to use [Quartz](https://github.com/jackyzha0/quartz).

It’s a static site generator [compatible with Obsidian](https://quartz.jzhao.xyz/features/Obsidian-compatibility). The tool is packed with features such as graph view, full-text search, popover previews, Mermaid support, and [many others](https://quartz.jzhao.xyz/#-features).

The setup is very simple. Below, I’ll show you how mine was done. It’s not necessarily the best approach, so feel free to use it and modify it however you like.

## Setup

*Requirements: Node.js and NPM.*

Unlike most SSGs, Quartz does not offer a bootstrapping CLI. According to the [Quartz philosophy](https://quartz.jzhao.xyz/philosophy), you should clone and use the repository however you want, which naturally allows for any kind of customization. In the [Get Started section of the official documentation](https://quartz.jzhao.xyz/#-get-started), this setup is explained in more detail.

Since I don’t plan to do any advanced configuration—and I also don’t want to version all of those files—I’ll do things a bit differently. The idea is to use Quartz only as a package, where I’ll overwrite just the files I need for minimal configuration. All of this setup will be written in a [Makefile](https://www.gnu.org/software/make/manual/make.html).

Alright, let’s start by creating the project directory:

```zsh
mkdir blog && cd $_
```

> **Tip**
> `$_` holds the last argument of the previous command.

Now, let’s create the `Makefile`:

```zsh
touch Makefile
```

This file will contain the instructions required to prepare the directories, download the Quartz source code, overwrite the necessary files, and install dependencies. The final content looks like this:

```make title="Makefile"
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
```

To keep things from getting tedious, I won’t go deep into each command. But here’s a brief description of each target:

| Target                      | Description                                                    |
| --------------------------- | -------------------------------------------------------------- |
| all                         | Responsible for calling all other targets in sequence          |
| prepare                     | Creates the directories required by the other targets          |
| get-quartz                  | Downloads and extracts the Quartz source code                  |
| link-quartz-overrides       | Maps files and directories from the root to Quartz’s structure |
| install-quartz-dependencies | Installs Quartz dependencies                                   |
| clean                       | Cleans up directories created during Makefile execution        |

> **Tip**
> If you don’t specify any target when running the Makefile (the `make` command), the first target will always be executed. You can take advantage of this and create a target that calls all others. That’s why it’s very common to see the first target named `all`.

> **Tip**
> The syntax of a Makefile target looks roughly like this:
>
> ```
> target: requirements
> 	body
> ```
>
> In `requirements`, you can list all files and/or directories needed for that target to run. If any are missing, execution will fail.

> **Tip**
> The `-L` flag in `curl` redirects the binary output to `tar`, so I receive the downloaded file via `stdout`.

You may have noticed that in the `link-quartz-overrides` target, we create some [symbolic links](https://en.wikipedia.org/wiki/Symbolic_link) for certain files and copy others. Among them are the [content](https://quartz.jzhao.xyz/authoring-content) directory, [Quartz configuration files](https://quartz.jzhao.xyz/configuration), and static image files such as the [favicon](https://quartz.jzhao.xyz/plugins/Favicon) and `og-image`.

These files are required both for the Makefile to run and for Quartz to function correctly. So let’s create them. To make things easier, we’ll use files from the Quartz repository itself as a base. To do that, run the following commands line by line:

```zsh
curl -O https://raw.githubusercontent.com/jackyzha0/quartz/refs/tags/v4.5.1/quartz.layout.ts
curl -O https://raw.githubusercontent.com/jackyzha0/quartz/refs/tags/v4.5.1/quartz.config.ts

mkdir static
curl -o static/icon.png https://raw.githubusercontent.com/jackyzha0/quartz/refs/heads/v4/quartz/static/icon.png
curl -o static/og-image.png https://raw.githubusercontent.com/jackyzha0/quartz/refs/heads/v4/quartz/static/og-image.png

mkdir content
echo ":)" > content/index.md
```

> **Tip**
> If, like me, you’re using Obsidian, linking the `content` directory to your [vault](https://help.obsidian.md/manage-vaults) can be a good idea. That way, you can sync your blog’s Markdown files across devices using a cloud service.
>
> In my case, my vault is synced via iCloud, so I created a local link using [bindfs](https://bindfs.org/). Later, you can make the link permanent using `launchctl` or `systemctl`.

At this point, we have all the files required for the basic setup. However, since the `quartz.layout.ts` and `quartz.config.ts` files are no longer in their original directory, we need to update the imports:

```diff title="quartz.config.ts"
+ import { QuartzConfig } from "./quartz/quartz/cfg"
+ import * as Plugin from "./quartz/quartz/plugins"
- import { QuartzConfig } from "./quartz/cfg"
- import * as Plugin from "./quartz/plugins"
```

```diff title="quartz.layout.ts"
+ import { PageLayout, SharedLayout } from "./quartz/quartz/cfg"
+ import * as Component from "./quartz/quartz/components"
- import { PageLayout, SharedLayout } from "./quartz/cfg"
- import * as Component from "./quartz/components"
```

With all files created and the Makefile ready, we can run:

```zsh
make
```

If everything goes well, running `ls` should give you a folder structure like this:

![Project folders after setup](/attachments/how-i-built-my-blog-with-quartz/project-structure.png)

In addition to the files we created, the entire Quartz source code will be inside the `quartz` directory. If you plan to version this in git, for example, the `quartz` directory can be ignored:

```txt title=".gitignore"
quartz
```

At this point, we have everything needed to run the project. On the official site, in the [architecture section](https://quartz.jzhao.xyz/advanced/architecture#on-the-server), there’s a reference to an internal CLI with a command that starts a local server. To make this easier, let’s create a script:

```shell title="scripts/dev.sh"
#!/bin/bash

if [[ ! -d quartz ]]; then
    echo "quartz dir not found, try to run \"make\" command"
    exit 1
fi

cd quartz && ./quartz/bootstrap-cli.mjs build --serve --port 3000
```

> **Note**
> The `cd quartz` is required because, in this case, the working directory must be the Quartz directory.

Don’t forget to set execution permissions for the script:

```zsh
chmod +x ./scripts/dev.sh
```

Then, if we run:

```zsh
./scripts/dev.sh
```

The local server should be running on port `3000`:

![Local development server running](/attachments/how-i-built-my-blog-with-quartz/dev-server.png)

And if we access `http://localhost:3000` in the browser, we’ll see something like:

![Local site preview](/attachments/how-i-built-my-blog-with-quartz/site-preview.png)

With that, everything is working locally (with hot reload and all). Starting from the configuration files, you can customize everything your way. To better understand these files, check the [configuration documentation](https://quartz.jzhao.xyz/configuration) and experiment a lot locally.

Finally, if you want to publish your work, it might be useful to create a build script:

```shell title="scripts/build.sh"
#!/bin/bash

if [[ ! -d quartz ]]; then
    echo "quartz dir not found, try to run \"make\" command"
    exit 1
fi

cd quartz && ./quartz/bootstrap-cli.mjs build --output ../dist
```

```zsh
chmod +x ./scripts/build.sh
```

This script will generate a `dist` directory at the root of the project. Inside it, you’ll find all the files you need for deployment.

---

The source code for this step-by-step guide is available [in the article’s project folder](https://github.com/amendoa/amendoa.dev/tree/main/article-projects/how-i-built-my-blog-with-quartz).
