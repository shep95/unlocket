# noah — website

The marketing and download site for **noah**, a free native AI code editor by
**#houseofasher** ([asherin.com](https://asherin.com)). The editor itself lives
in [shep95/noah](https://github.com/shep95/noah); this repo is only the website.

Built with Next.js (App Router), fully static.

## Develop

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Deploy

This is a standard Next.js app and deploys unchanged to either host:

- **Vercel** — import the repo; `vercel.json` is included. Zero config.
- **Railway** — create a service from the repo; `railway.json` is included
  (Nixpacks build, `npm run start`). The start script binds `0.0.0.0` and
  Next.js reads Railway's `$PORT` automatically.

Set `NEXT_PUBLIC_APP_URL` to the deployed origin so canonical/OG URLs are correct.

> Note: only this website is web-hosted. **noah the editor is a native desktop
> app** (Rust/GPUI) and is distributed as a downloadable binary — it is not, and
> cannot be, hosted on Vercel or Railway.

## Security

- No backend, no user accounts, no data collection — the site is static.
- Strict CSP and security headers in `next.config.mjs`.
- Next.js pinned to the latest patched 14.2.x. Remaining `npm audit` findings are
  in dev-only tooling (eslint / typescript-eslint) that is not shipped.
