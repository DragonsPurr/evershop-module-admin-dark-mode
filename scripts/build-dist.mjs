import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

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

const run = async () => {
  // Ensure we never ship stale compiled output.
  await fs.rm(distDir, { recursive: true, force: true });

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
};

run().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

