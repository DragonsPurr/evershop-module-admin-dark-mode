# admin_dark_mode

Minimal EverShop extension that injects dark mode CSS into all admin pages.

This extension is loaded from:

- `extensions/admin_dark_mode`
- entry file: `dist/pages/admin/all/DarkMode.js` (generated from `src/pages/admin/all/DarkMode.tsx`)

Tweak colors in the `styles` template string in `src/pages/admin/all/DarkMode.tsx`.

### Dark / light toggle

A **Dark** / **Light** button is registered for the admin **`header`** area (`src/pages/admin/all/AdminThemeToggle.tsx`). It toggles the `admin-dark-mode` class on `<html>` and persists the choice in `localStorage` under `evershop_admin_dark_mode` (`"true"` / `"false"`). Dark styles are scoped to `html.admin-dark-mode`, so switching to light restores the default EverShop admin look.

If the button does not appear, your admin layout may use a different area id for the top bar—adjust `layout.areaId` in `AdminThemeToggle.tsx` to match.

## Production (EverShop host app)

This extension only ships compiled JS under `dist/`. EverShop generates per-route assets such as `.evershop/build/admin/<routeId>/server/query.graphql` when you run a **full build from your EverShop project root** (e.g. `npm run build` / the documented production build). Do **not** add ad-hoc `pages/admin/<route>/route.json` routes in this repo alone—those files will not exist until the host app’s webpack build runs, which causes `ENOENT ... query.graphql` in production.

After changing this extension, run your EverShop app’s production build so admin bundles include `extensions/<name>/dist/**`.
