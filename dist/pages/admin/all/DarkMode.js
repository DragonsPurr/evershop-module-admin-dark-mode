import React from 'react';
import { scopeAdminDarkCss } from './scopeAdminDarkCss.js';
import { applyAdminDarkClassToDocument, readAdminDarkPreference } from './themeStorage.js';
const styles = `
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
    background: #000000 !important;
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
    background-color: #000000 !important;
    color: #ffffff !important;
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
  .bg-card,
  .bg-white.sticky,
  .bg-white.fixed,
  .bg-white.border-b,
  .bg-gray-50.sticky,
  .bg-gray-50.fixed {
    background-color: #0f172a !important;
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
const scopedStyles = scopeAdminDarkCss(styles);
/**
 * Tailwind v3+ puts utilities in `@layer utilities`, which wins over unlayered
 * rules from a plain <style> tag when specificity is equal. Wrapping our rules in
 * a new named layer appends them after the utilities layer so overrides win.
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
 */
const layeredStyles = `@layer dark-mode-overrides {\n${scopedStyles}\n}`;
export default function DarkMode() {
    React.useEffect(() => {
        if (typeof document === 'undefined')
            return;
        applyAdminDarkClassToDocument(readAdminDarkPreference());
    }, []);
    // Some layout renderers may not guarantee direct `<style>` tag rendering.
    // This effect ensures the style tag exists on the client after hydration.
    React.useEffect(() => {
        if (typeof document === 'undefined')
            return;
        const existing = document.getElementById('admin-dark-mode');
        if (existing)
            return;
        const styleEl = document.createElement('style');
        styleEl.id = 'admin-dark-mode';
        styleEl.textContent = layeredStyles;
        document.head.appendChild(styleEl);
    }, []);
    // Keep this stylesheet last in <head> so cascade order beats late-injected host CSS.
    // MutationObserver catches link/style tags added after hydration.
    React.useEffect(() => {
        if (typeof document === 'undefined')
            return;
        let debounce;
        const bump = () => {
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                const el = document.getElementById('admin-dark-mode');
                if (el === null || el === void 0 ? void 0 : el.parentNode)
                    document.head.appendChild(el);
            }, 0);
        };
        bump();
        const t0 = setTimeout(bump, 0);
        const t1 = setTimeout(bump, 100);
        const t2 = setTimeout(bump, 500);
        const obs = new MutationObserver(bump);
        obs.observe(document.head, { childList: true });
        return () => {
            clearTimeout(debounce);
            clearTimeout(t0);
            clearTimeout(t1);
            clearTimeout(t2);
            obs.disconnect();
        };
    }, []);
    return React.createElement('style', {
        id: 'admin-dark-mode',
        dangerouslySetInnerHTML: { __html: layeredStyles }
    });
}
export const layout = {
    areaId: 'body',
    sortOrder: 9999
};
//# sourceMappingURL=DarkMode.js.map