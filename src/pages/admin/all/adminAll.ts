// Shared admin middleware entry (uniquely named to avoid EverShop middleware id collisions).
// EverShop derives middleware `id` from the filename (e.g. `index.js` => `id: "index"`),
// so we must not use a bare `index.ts` here.

// Node ESM requires explicit file extensions for relative imports.
// With `moduleResolution: NodeNext`, TypeScript will still resolve this to `DarkMode.tsx`,
// while keeping the `.js` extension in the emitted import.
import './DarkMode.js';

export default function adminAll(request: any, response: any) {
  // No-op middleware: only ensures EverShop loads the shared admin/all bundle.
  return { request, response };
}

