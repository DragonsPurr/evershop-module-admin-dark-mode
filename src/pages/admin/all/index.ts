// Shared admin middleware entry for EverShop.
// This ensures the `pages/admin/all` bundle is included, and we import the shared component
// so its `layout` export is registered by the view system.

import './DarkMode';

export default (request: any, response: any) => {
  // No-op middleware: we only need this file for EverShop's admin/all entry wiring.
  return { request, response };
};

