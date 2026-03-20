// Shared admin middleware entry (uniquely named to avoid EverShop middleware id collisions).
// EverShop derives middleware `id` from the filename (e.g. `index.js` => `id: "index"`),
// so we must not use a bare `index.ts` here.

import './DarkMode';

export default function adminAll(request: any, response: any) {
  // No-op middleware: only ensures EverShop loads the shared admin/all bundle.
  return { request, response };
}

