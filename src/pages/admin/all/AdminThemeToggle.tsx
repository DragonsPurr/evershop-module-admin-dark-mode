import React from 'react';
import {
  applyAdminDarkClassToDocument,
  readAdminDarkPreference,
  writeAdminDarkPreference
} from './themeStorage.js';

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

  return React.createElement(
    'button',
    {
      type: 'button',
      onClick: toggle,
      'aria-pressed': dark,
      title: dark ? 'Switch to light mode' : 'Switch to dark mode',
      style: {
        marginLeft: 'auto',
        marginRight: '8px',
        padding: '6px 12px',
        borderRadius: '6px',
        border: dark
          ? '1px solid rgba(255,255,255,0.22)'
          : '1px solid rgba(15,23,42,0.25)',
        background: dark ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.95)',
        color: dark ? '#e5edf8' : '#0f172a',
        cursor: 'pointer',
        fontSize: '13px',
        fontWeight: 500,
        lineHeight: 1.2,
        flexShrink: 0
      }
    },
    dark ? 'Dark' : 'Light'
  );
}

export const layout = {
  areaId: 'header',
  sortOrder: 10000
};
