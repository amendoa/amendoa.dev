# Quartz blog setup source code

Source code accompanying the [Portuguese tutorial](https://amendoa.dev/pt/posts/configurando-um-blog-com-quartz/) and [English tutorial](https://amendoa.dev/en/posts/how-i-built-my-blog-with-quartz/).

This directory contains the Quartz v4.5.1 source code used in the tutorial.

Requires Node.js, npm, Make, curl, tar, and a Unix-compatible shell. Run these commands **from this directory**:

```sh
make
./scripts/dev.sh
```

The development server runs on port 3000. To build the static output:

```sh
./scripts/build.sh
```

Output is written to this directory's `dist/` folder. Running `make` again replaces the downloaded `quartz/` directory.
