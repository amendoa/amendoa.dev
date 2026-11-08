# amendoa.dev

Matheus Silva de Almeida's bilingual static blog at [amendoa.dev](https://amendoa.dev), built with Astro and GitHub Primer. GitHub Actions deploys it to Cloudflare Pages on pushes to `main`.

Requires Node.js 24 and pnpm 12.15.0.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev --port 4322
pnpm check
pnpm build
```

Development listens on the local network. Configure additional allowed hostnames in `.env` using [.env.example](.env.example); see the [development guide](docs/development.md). Production output is `dist/`. With the development server running, `pnpm test:e2e` checks the primary browser interactions (install Chromium with `pnpm exec playwright install chromium` first).

- [Approved design](DESIGN.md)
- [Architecture](docs/architecture/overview.md)
- [Authoring and development](docs/development.md)
- [Deployment and rollback](docs/deployment.md)
- [To do](TODO.md)

[MIT license](LICENSE).
