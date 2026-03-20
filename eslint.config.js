import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**'],
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      globals: globals.node
    }
  }
];

