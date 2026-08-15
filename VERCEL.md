# Vercel deployment notes

This repository is configured as a static Vite application for Vercel. Import `DTRHnet/zild-webbook` into Vercel with the defaults from `vercel.json`, or use the following settings if configuring the project manually.

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Install command | `pnpm install --frozen-lockfile` |
| Build command | `pnpm run build` |
| Output directory | `dist/public` |
| Root directory | `.` |

The app uses client-side routes such as `/chapter/...` and `/appendix/...`. The SPA rewrite in `vercel.json` sends route requests to `index.html`, while Vercel serves existing JavaScript, CSS, Markdown, and image files normally.

All generated visual assets used by the reader are self-hosted under `client/public/assets/`. The deployment does not depend on the Manus storage proxy, Manus runtime APIs, backend routes, environment variables, or server-side rendering. The generated `dist/public` directory is therefore sufficient for the deployed reading experience.

The build script also emits the scaffold’s server bundle because it is part of the inherited project template. Vercel serves the configured static output directory and does not require that server bundle for this reader.

## Local verification

```bash
pnpm install --frozen-lockfile
pnpm run check
pnpm run build
```

After deployment, verify `/`, a chapter route, `/appendices`, and an appendix route directly. The rewrite rule is specifically present so those deep links work on refresh.
