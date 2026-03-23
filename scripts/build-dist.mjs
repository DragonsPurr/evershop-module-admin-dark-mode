import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { compileAdminScss } from './compile-scss.mjs';

const projectRoot = process.cwd();
const distDir = path.join(projectRoot, 'dist');
const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
const tscEntry = path.join(
  projectRoot,
  'node_modules',
  'typescript',
  'bin',
  'tsc'
);

async function copyFilePreserveDirs(srcPath, destPath) {
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.copyFile(srcPath, destPath);
}

async function copyRouteJsonFiles() {
  const srcRoot = path.join(projectRoot, 'src');
  const destRoot = path.join(projectRoot, 'dist');

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    await Promise.all(
      entries.map(async (ent) => {
        const full = path.join(currentDir, ent.name);
        if (ent.isDirectory()) {
          await walk(full);
          return;
        }
        if (ent.isFile() && ent.name === 'route.json') {
          const rel = path.relative(srcRoot, full);
          await copyFilePreserveDirs(full, path.join(destRoot, rel));
        }
      })
    );
  }

  await walk(srcRoot);
}

const run = async () => {
  // Ensure we never ship stale compiled output.
  await fs.rm(distDir, { recursive: true, force: true });

  await compileAdminScss();

  const child = spawn(
    process.execPath,
    [tscEntry, '-p', tsconfigPath],
    {
      stdio: 'inherit'
    }
  );

  const exitCode = await new Promise((resolve) => {
    child.on('exit', resolve);
  });

  if (exitCode !== 0) process.exitCode = exitCode;

  // tsc compiles TS only; copy non-TS assets required by EverShop routing.
  await copyRouteJsonFiles();
};

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

