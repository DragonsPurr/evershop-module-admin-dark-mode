# admin_dark_mode

Minimal EverShop extension that injects dark mode CSS into all admin pages.

EverShop treats each module under `pages/**` as a route or middleware entry and expects middleware files to **default-export a function**. Shared helpers (e.g. `scopeAdminDarkCss`, `themeStorage`) live under `src/lib/` so they are not mistaken for middleware.

This extension is loaded from:

- `extensions/admin_dark_mode`
- entry file: `dist/pages/admin/all/DarkMode.js` (generated from `src/pages/admin/all/DarkMode.tsx`)

### Styles (SCSS)

Dark mode CSS lives under **`src/styles/scss/`** and is compiled to **`src/styles/adminDarkModeStyles.ts`** when you run **`npm run build`** (do not edit that `.ts` file by hand).

- **`adminDarkMode.scss`** — entry file; pulls in partials.
- **`_variables.scss`** — colors / tokens (start here to retune the theme).
- **`_evershop-layout.scss`** — dark overrides aligned with EverShop core admin shell ([`global.scss`](https://github.com/evershopcommerce/evershop/blob/dev/packages/evershop/src/modules/base/pages/admin/all/global.scss): `.header`, `.content-wrapper`, `.footer`).
- **`_surfaces.scss`**, **`_inputs.scss`**, **`_buttons.scss`**, **`_chrome.scss`**, **`_header-search.scss`** (top bar search input + leading icon control), **`_sidebar.scss`**, **`_text-tokens.scss`** — UI overrides.

EverShop’s admin form styles ([`form.scss`](https://github.com/evershopcommerce/evershop/blob/dev/packages/evershop/src/modules/base/pages/admin/all/form.scss)) use Tailwind **`@reference`** / **`@apply`**. This extension does **not** import that file; it would require EverShop’s Tailwind pipeline. We mirror the same areas (inputs, buttons, etc.) with plain SCSS + `!important` overrides.

`DarkMode.tsx` only runs the compiled CSS through `scopeAdminDarkCss()`, wraps **`@layer dark-mode-overrides`**, and injects the `<style>` tag.

### Dark / light toggle

A **Dark** / **Light** button is registered for the admin **`header`** area (`src/pages/admin/all/AdminThemeToggle.tsx`). It uses the same Tailwind-style classes as other outline buttons (`border-gray-300`, `bg-white`, etc.) so the SCSS overrides match. `layout.sortOrder` is **`99999`** so it renders **after** other header widgets (e.g. user profile) and sits in the **far-right** corner; add `order-last` as a flex fallback. It toggles the `admin-dark-mode` class on `<html>` and persists the choice in `localStorage` under `evershop_admin_dark_mode` (`"true"` / `"false"`). Dark styles are scoped to `html.admin-dark-mode`, so switching to light restores the default EverShop admin look.

If the button does not appear, your admin layout may use a different area id for the top bar—adjust `layout.areaId` in `AdminThemeToggle.tsx` to match. If order is wrong relative to the profile menu, adjust **`layout.sortOrder`** (higher = later in the header area, usually further right).

## Production (EverShop host app)

This extension only ships compiled JS under `dist/`. EverShop generates per-route assets such as `.evershop/build/admin/<routeId>/server/query.graphql` when you run a **full build from your EverShop project root** (e.g. `npm run build` / the documented production build). Do **not** add ad-hoc `pages/admin/<route>/route.json` routes in this repo alone—those files will not exist until the host app’s webpack build runs, which causes `ENOENT ... query.graphql` in production.

After changing this extension, run your EverShop app’s production build so admin bundles include `extensions/<name>/dist/**`.

### Stale admin CSS / “changes not showing”

There isn’t a special EverShop “theme cache” you must clear for this extension—updates are usually one of:

1. **Extension output** — In this repo run `npm run build` so `dist/**` matches `src/**`. The host app loads the compiled files under `extensions/<name>/dist/`, not `src/`.
2. **Host app build** — From your **EverShop project root**, run a full build (e.g. `npm run build`) or whatever your setup uses so webpack picks up changed extension files. If you use a `.evershop` (or similar) build directory, delete it and rebuild if you suspect a stale build artifact.
3. **Dev server** — Restart the EverShop dev process after changing `dist/` so Node doesn’t keep an old module graph in memory.
4. **Browser** — Hard refresh (e.g. Cmd+Shift+R), or DevTools → Network → **Disable cache** while testing, or try a private window. Confirms you’re not seeing an old hashed JS bundle from disk cache.
5. **Docker / volumes** — If the app runs in a container, confirm the updated `extensions/.../dist` is mounted or baked into the image and restart the container.

If styles still lose to the default theme, open DevTools → **Computed** on the element and see which rule wins—it’s usually cascade/specificity, not cache.

**Tailwind `@layer utilities`:** Utilities live in `@layer utilities`. Layer order is determined by the **first** time each layer name appears in the document, so a plain `@layer dark-mode-overrides { … }` can still lose if this extension’s `<style>` is parsed **before** Tailwind’s bundle (your layer ends up *below* utilities in precedence). The injected CSS therefore starts with `@layer utilities, dark-mode-overrides` so `dark-mode-overrides` is always **after** `utilities`. If something still wins (e.g. Tailwind v4 `theme` or another layer), extend that line in **`DarkMode.tsx`** (where `layeredStyles` is built) to list every layer name in stack order, ending with `dark-mode-overrides`.
