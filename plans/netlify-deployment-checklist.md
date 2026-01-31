# Netlify Deployment Checklist

- All static assets (images, video) are in the `/public` directory and referenced with relative paths.
- `vite.config.ts` does not use server-only config and aliases are compatible with Netlify static hosting.
- `package.json` contains correct build (`vite build`) and preview (`vite preview`) scripts.
- `tsconfig.json` paths and module settings are compatible with Netlify static hosting.
- `index.html` references assets using relative paths (checked: all `/public` assets use `/` prefix, which is correct for Vite/Netlify).
- Add a `_redirects` file in `/public` for SPA routing:
  ```
  /*    /index.html   200
  ```
  (Architect mode cannot create this file, switch to code mode to add it.)
- Update `README.md` with Netlify deployment instructions:
  - Push code to GitHub
  - Connect repository to Netlify
  - Set build command: `vite build`
  - Set publish directory: `dist`
- No server-side code or dependencies detected (all React/Vite, no Node server).
- Test local build with `npm run build` and `npm run preview` to confirm production readiness.

## Next Steps
- Switch to code mode and create `/public/_redirects` for SPA routing.
- Update `README.md` with Netlify deployment steps if not already present.
- Run local build and preview to verify production output.