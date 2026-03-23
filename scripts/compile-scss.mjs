/**
 * Compiles src/styles/scss/adminDarkMode.scss → src/styles/adminDarkModeStyles.ts
 * (export const adminDarkModeStyles = ...). Run before tsc via npm run build.
 */
import * as sass from 'sass';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const scssEntry = path.join(projectRoot, 'src/styles/scss/adminDarkMode.scss');
const outTs = path.join(projectRoot, 'src/styles/adminDarkModeStyles.ts');

export async function compileAdminScss() {
  const result = sass.compile(scssEntry, {
    style: 'expanded',
    charset: false,
    loadPaths: [path.join(projectRoot, 'src/styles/scss')]
  });

  const header = `/**
 * AUTO-GENERATED from src/styles/scss/adminDarkMode.scss — do not edit by hand.
 * Run \`npm run build\` after changing SCSS.
 */
`;

  const body = `${header}export const adminDarkModeStyles = ${JSON.stringify(result.css)};\n`;
  await fs.writeFile(outTs, body, 'utf8');
}
