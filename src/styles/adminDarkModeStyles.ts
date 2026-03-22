/**
 * Raw admin dark-mode CSS (unscoped). `DarkMode.tsx` runs this through
 * `scopeAdminDarkCss()` and wraps it in `@layer dark-mode-overrides`.
 */
export const adminDarkModeStyles = `
  :root {
    color-scheme: dark;
    /*
     * shadcn / Tailwind: .text-card-foreground is usually
     *   color: hsl(var(--card-foreground));
     * so fixing the token beats almost all utility specificity. !important on the
     * custom property wins over the host theme re-defining the same variable.
     * #9fb0c8 ≈ hsl(215 26% 70%)
     */
    --card-foreground: 215 26% 70% !important;
  }

  body {
    background: #0F172A !important;
    color: #ffffff !important;
  }

  a {
    color: #8ab4ff;
  }

  /* Generic surfaces */
  .bg-white,
  .bg-gray-50,
  .bg-gray-100,
  .bg-surface {
    background-color: #0F172A !important;
    color: #8ab4ff !important;
    border-color: #2b3648 !important;
  }

  /* Card/panel surfaces only — omit color so shadcn text-card-foreground
   * and --card-foreground tokens are not overridden. */
  .card,
  .panel {
    background-color: #000000 !important;
    border-color: #2b3648 !important;
  }

  .text-gray-900,
  .text-gray-800,
  
  .text-black {
    color: #e5edf8 !important;
  }

  .text-gray-700,
  .text-gray-600,
  .text-gray-500 {
    color: #9fb0c8 !important;
  }

  .border,
  .border-gray-200,
  .border-gray-300 {
    border-color: #2b3648 !important;
  }

  /* Inputs */
  input,
  select,
  textarea {
    background: #0f172a !important;
    color: #dbe3f0 !important;
    border-color: #334155 !important;
  }

  input::placeholder,
  textarea::placeholder {
    color: #7f90a8 !important;
  }

  /* ---------- Buttons: native + Tailwind + shadcn-style variants ---------- */
  /* Light “filled” buttons */
  button[class*='bg-white'],
  button[class*='bg-gray-50'],
  button[class*='bg-gray-100'],
  button[class*='bg-slate-50'],
  button[class*='bg-slate-100'],
  button[class*='bg-zinc-50'],
  button[class*='bg-zinc-100'],
  button[class*='bg-neutral-50'],
  button[class*='bg-neutral-100'],
  button[class~='bg-muted'],
  button[class*='bg-muted'],
  button[class~='bg-secondary'],
  button[class*='bg-secondary'],
  [role='button'][class*='bg-white'],
  [role='button'][class*='bg-gray-50'],
  [role='button'][class*='bg-gray-100'],
  [role='button'][class*='bg-secondary'],
  [role='button'][class*='bg-muted'] {
    background-color: #1e293b !important;
    color: #e5edf8 !important;
    border-color: #334155 !important;
  }

  /* Outline / bordered / background-surface (shadcn outline, border-input) */
  button[class*='border-input'],
  button[class*='bg-background'],
  button.border-gray-200,
  button.border-gray-300,
  button.border-slate-200,
  button.border-slate-300,
  [role='button'][class*='border-input'],
  [role='button'][class*='bg-background'] {
    background-color: #0f172a !important;
    color: #e5edf8 !important;
    border-color: #475569 !important;
  }

  /* Primary / brand */
  button[class*='bg-primary'],
  button[class*='bg-blue-5'],
  button[class*='bg-blue-6'],
  button[class*='bg-blue-7'],
  button[class*='bg-indigo-5'],
  button[class*='bg-indigo-6'],
  button[class*='bg-sky-5'],
  button[class*='bg-sky-6'],
  [role='button'][class*='bg-primary'] {
    background-color: #1d4ed8 !important;
    color: #ffffff !important;
    border-color: #2563eb !important;
  }

  /* Destructive */
  button[class*='destructive'],
  button[class*='bg-red-5'],
  button[class*='bg-red-6'],
  button[class*='bg-red-7'],
  button[class*='bg-rose-'],
  [role='button'][class*='destructive'] {
    background-color: #027F5F !important;
    color: #ffffff !important;
    border-color:rgb(35, 193, 153) !important;
  }

  /* Ghost / link-style — keep transparent but readable text */
  button[class*='ghost'],
  button[class*='link'],
  button[class*='bg-transparent'],
  [role='button'][class*='ghost'],
  [role='button'][class*='link'] {
    background-color: transparent !important;
    color: #93c5fd !important;
    border-color: transparent !important;
  }

  /* Plain <button> with no bg/border utility (browser default grey) */
  button:not([class*='bg-']):not([class*='border-']),
  [role='button']:not([class*='bg-']):not([class*='border-']) {
    background-color: #1e293b !important;
    color: #e5edf8 !important;
    border-color: #334155 !important;
  }

  /* Header + nav */
  header,
  nav,
  .root-nav-item,
  .nav-item,
  aside,
  .header,
  .admin-header,
  .navbar,
  [class*='header'],
  [class*='topbar'],
  .sticky.top-0,
  .fixed.top-0,
  .bg-white.sticky,
  .bg-white.fixed,
  .bg-white.border-b,
  .bg-gray-50.sticky,
  .bg-gray-50.fixed {
    background-color: #0f172a !important;
    border-color: #2b3648 !important;
  }

  .bg-card, {
    background-color: #2d3b5c !important;
    border-color: #2b3648 !important;
  }

  /* Ensure common Tailwind header utility combinations are overridden */
  .bg-white,
  .bg-gray-50 {
    background-color: #111827 !important;
  }

  /* Left sidebar: active / current / hover states (often still light Tailwind) */
  aside a,
  aside nav a,
  .admin-nav a,
  .admin-nav-container a,
  [class*='sidebar'] a {
    color: #9fb0c8 !important;
  }

  aside a:hover,
  .admin-nav a:hover,
  .admin-nav-container a:hover {
    background-color: #1e293b !important;
    color: #e5edf8 !important;
  }

  aside a.active,
  aside a.router-link-active,
  aside a.router-link-exact-active,
  aside a[aria-current='page'],
  aside a[aria-current='true'],
  nav a.active,
  nav a.router-link-active,
  nav a.router-link-exact-active,
  .admin-nav a.active,
  .admin-nav a.router-link-active,
  .admin-nav a.router-link-exact-active,
  .admin-nav-container a.active,
  .admin-nav-container a.router-link-active,
  li.active > a,
  li.router-link-active > a {
    background-color: #1e293b !important;
    color: #e5edf8 !important;
    border-color: #334155 !important;
  }

  /* Active row backgrounds from Tailwind palette */
  aside .bg-blue-50,
  aside .bg-blue-100,
  aside .bg-indigo-50,
  aside .bg-gray-100,
  aside .bg-white,
  .admin-nav .bg-blue-50,
  .admin-nav .bg-blue-100,
  .admin-nav .bg-gray-100 {
    background-color: #1e293b !important;
    color: #e5edf8 !important;
  }

  aside .text-blue-600,
  aside .text-blue-700,
  aside .text-indigo-600,
  aside .text-primary,
  .admin-nav .text-blue-600,
  .admin-nav .text-blue-700,
  .admin-nav .text-indigo-600 {
    color: #93c5fd !important;
  }

  .uploader {
    background-color:#2d3b5c !important;
  }

  /*
   * text-base + text-card-foreground (muted body/card copy).
   * Fallbacks when the host does not use --card-foreground, or uses oklch() / inline color.
   * [class~="…"] matches a whole class token; [class*="…"] catches text-card-foreground/80 etc.
   */
  body .text-base,
  .card .text-base,
  .panel .text-base,
  body .card .text-base,
  body .panel .text-base {
    color: #9fb0c8 !important;
  }

  body .text-card-foreground,
  body [class~='text-card-foreground'],
  body [class*='text-card-foreground'],
  .card .text-card-foreground,
  .panel .text-card-foreground,
  body .card .text-card-foreground,
  body .panel .text-card-foreground,
  body div.text-card-foreground,
  body span.text-card-foreground,
  body p.text-card-foreground,
  body a.text-card-foreground,
  body h1.text-card-foreground,
  body h2.text-card-foreground,
  body h3.text-card-foreground,
  body h4.text-card-foreground {
    color: #9fb0c8 !important;
  }
`;
