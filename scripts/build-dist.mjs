import fs from 'node:fs/promises';
import path from 'node:path';

const sourcePath = path.resolve('src/pages/admin/all/DarkMode.js');
const distPath = path.resolve('dist/pages/admin/all/DarkMode.js');

const main = async () => {
  const content = await fs.readFile(sourcePath, 'utf8');
  await fs.mkdir(path.dirname(distPath), { recursive: true });
  await fs.writeFile(distPath, content);
};

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

