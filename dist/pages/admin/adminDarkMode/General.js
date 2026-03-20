import React from 'react';
import DarkMode from '../all/DarkMode.js';
export default function General() {
    return React.createElement(DarkMode);
}
// EverShop's `buildQuery` middleware expects webpack-generated `query.graphql`
// to contain a parsable query payload. Adding a minimal query export ensures
// the route contributes a valid GraphQL document.
export const query = `
  query query {
    __typename
  }
`;
//# sourceMappingURL=General.js.map