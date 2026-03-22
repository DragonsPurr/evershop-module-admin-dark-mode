import React from 'react';
import { scopeAdminDarkCss } from '../../../lib/scopeAdminDarkCss.js';
import { adminDarkModeStyles } from '../../../styles/adminDarkModeStyles.js';
import {
  applyAdminDarkClassToDocument,
  readAdminDarkPreference
} from '../../../lib/themeStorage.js';

const scopedStyles = scopeAdminDarkCss(adminDarkModeStyles);

/**
 * Tailwind puts rules in `@layer utilities`. Layer order is fixed by the *first*
 * time each layer name appears in the document — if this <style> is parsed before
 * Tailwind’s bundle, `dark-mode-overrides` can be registered *before* `utilities`
 * and still lose to utilities.
 *
 * Fix: `@layer utilities, dark-mode-overrides` forces our layer after `utilities`
 * regardless of stylesheet order. (Tailwind v4 may add a `theme` layer; if anything
 * still wins, try extending that line in source — see README.)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/@layer
 */
const layeredStyles = `@layer utilities, dark-mode-overrides;\n\n@layer dark-mode-overrides {\n${scopedStyles}\n}`;

export default function DarkMode() {
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    applyAdminDarkClassToDocument(readAdminDarkPreference());
  }, []);

  // Some layout renderers may not guarantee direct `<style>` tag rendering.
  // This effect ensures the style tag exists on the client after hydration.
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const existing = document.getElementById('admin-dark-mode');
    if (existing) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'admin-dark-mode';
    styleEl.textContent = layeredStyles;
    document.head.appendChild(styleEl);
  }, []);

  // Keep this stylesheet last in <head> so cascade order beats late-injected host CSS.
  // MutationObserver catches link/style tags added after hydration.
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    let debounce: ReturnType<typeof setTimeout> | undefined;
    const bump = () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        const el = document.getElementById('admin-dark-mode');
        if (el?.parentNode) document.head.appendChild(el);
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
