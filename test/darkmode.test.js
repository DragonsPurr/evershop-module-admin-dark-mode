import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';

const distFile = path.resolve(
  process.cwd(),
  'dist/pages/admin/all/DarkMode.js'
);

const distAdminAllMiddleware = path.resolve(
  process.cwd(),
  'dist/pages/admin/all/adminAll.js'
);

test('build creates DarkMode dist file', async () => {
  const content = await fs.readFile(distFile, 'utf8');
  assert.ok(content.includes('export const layout'), 'missing layout export');
});

test('admin/all middleware entry exists', async () => {
  const content = await fs.readFile(distAdminAllMiddleware, 'utf8');
  assert.ok(content.length > 0, 'admin/all/adminAll.js should not be empty');
});

test('DarkMode dist contains expected CSS + mount id', async () => {
  const content = await fs.readFile(distFile, 'utf8');

  assert.match(content, /color-scheme:\s*dark/);
  assert.match(content, /background:\s*#0b1220\s*!important/);
  assert.match(content, /id:\s*'admin-dark-mode'/);

  // Basic sanity check that the styles string is injected via dangerouslySetInnerHTML.
  assert.match(
    content,
    /dangerouslySetInnerHTML:\s*\{\s*__html:\s*styles\s*\}/
  );
});

test('layout export is correct', async () => {
  const content = await fs.readFile(distFile, 'utf8');

  // We keep this as a regex check so tests do not need React installed.
  assert.match(
    content,
    /export const layout\s*=\s*\{\s*areaId:\s*'body'\s*,\s*sortOrder:\s*9999\s*\};/s
  );
});

test('bootstrap default export is a function', async () => {
  const bootstrapFile = path.resolve(process.cwd(), 'dist/bootstrap.js');
  const url = new URL(`file://${bootstrapFile}`);
  const mod = await import(url);
  assert.equal(typeof mod.default, 'function');
});

