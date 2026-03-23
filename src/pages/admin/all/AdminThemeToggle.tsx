import React from 'react';
import {
  applyAdminDarkClassToDocument,
  readAdminDarkPreference,
  writeAdminDarkPreference
} from '../../../lib/themeStorage.js';

/**
 * Utility classes aligned with typical admin outline/secondary buttons (Tailwind/shadcn-style).
 * Dark mode overrides in SCSS target the same patterns as other buttons.
 */
const buttonClassName = [
  'admin-theme-toggle',
  'inline-flex items-center justify-center whitespace-nowrap',
  'rounded-md border border-gray-300 bg-white',
  'px-3 py-2 text-sm font-medium text-gray-900',
  'shadow-sm shrink-0 order-last ml-2',
  'hover:bg-gray-50'
].join(' ');

export default function AdminThemeToggle() {
  const [dark, setDark] = React.useState(true);

  React.useEffect(() => {
    const enabled = readAdminDarkPreference();
    setDark(enabled);
    applyAdminDarkClassToDocument(enabled);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    writeAdminDarkPreference(next);
    applyAdminDarkClassToDocument(next);
  };

  return React.createElement('button', {
    type: 'button',
    onClick: toggle,
    className: buttonClassName,
    'aria-pressed': dark,
    title: dark ? 'Switch to light mode' : 'Switch to dark mode'
  }, dark ? 'Dark' : 'Light');
}

/**
 * Render after other header widgets (e.g. user profile) so the toggle sits
 * in the far-right corner; `order-last` is a fallback if the header is flex.
 */
export const layout = {
  areaId: 'header',
  sortOrder: 99999
};
