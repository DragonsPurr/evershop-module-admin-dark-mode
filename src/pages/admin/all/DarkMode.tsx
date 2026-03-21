import React from 'react';

const styles = `
  :root {
    color-scheme: dark;
  }

  body {
    background: #0b1220 !important;
    color: #dbe3f0 !important;
  }

  a {
    color: #8ab4ff;
  }

  /* Generic surfaces */
  .bg-white,
  .bg-gray-50,
  .bg-gray-100,
  .bg-surface,
  .card,
  .panel {
    background-color: #111827 !important;
    color: #dbe3f0 !important;
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
  nav-item,
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
`;

export default function DarkMode() {
  // Some layout renderers may not guarantee direct `<style>` tag rendering.
  // This effect ensures the style tag exists on the client after hydration.
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    const existing = document.getElementById('admin-dark-mode');
    if (existing) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'admin-dark-mode';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
  }, []);

  return React.createElement('style', {
    id: 'admin-dark-mode',
    dangerouslySetInnerHTML: { __html: styles }
  });
}

export const layout = {
  areaId: 'body',
  sortOrder: 9999
};

