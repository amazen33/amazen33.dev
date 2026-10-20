# Twinfra site

The public introduction to [Twinfra](https://github.com/amazen33/twinfra), served at
`https://twinfra.amazen33.dev`. It explains what Twinfra is, how it is built, its evidence model, its
decisions and roadmap, and a fact-checked AI review.

## Content rules

- Every statement is checked against `amazen33/twinfra` `main`: `README.md`, `docs/capabilities.md`,
  `docs/adr/`, `docs/acceptance/` and `compatibility.yaml`. A claim may not be stronger than the
  evidence behind it (Twinfra ADR-0052).
- **Signed** is used only for components with an Accepted receipt; the content tests enforce this.
- No private addresses, hostnames, ports or credentials. CI fails the build if a private address appears.
- `src/data/adrs.ts` is generated from Twinfra's `docs/adr/README.md`; do not edit it by hand.

## Develop

```bash
npm ci --ignore-scripts
npm run dev
```

`npm run lint`, `npm test` and `npm run build` are what CI runs. Dependencies are pinned exactly and
were at least 14 days old when added (`npm install --before=<date>`).

## Deploy

CI uploads the tested build as the `site-dist` artifact. Deploy that artifact only, never a local build:

```bash
gh run download <run-id> -n site-dist -D site-dist
npx wrangler@4.139.0 pages deploy site-dist --project-name twinfra --branch main
```

The custom domain `twinfra.amazen33.dev` is attached to the Pages project in the Cloudflare dashboard.
