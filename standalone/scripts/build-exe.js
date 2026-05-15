// Build EXE: bundle ESM -> CJS -> pkg
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const DIST = join(ROOT, 'dist');
const SRC = join(ROOT, 'src', 'main.js');
const BUNDLE = join(DIST, 'bundle.cjs');
const EXE_NAME = 'yxlearning-helper.exe';

// Ensure node/npm/npx are in PATH for child processes
const NODE_DIR = 'C:\\Users\\12214\\AppData\\Local\\Programs\\nodejs-22.22.2';
const execOpts = {
  cwd: ROOT,
  stdio: 'inherit',
  env: { ...process.env, PATH: process.env.PATH + ';' + NODE_DIR },
  shell: true
};

console.log('=== Step 1: Bundle ESM to CJS with esbuild ===');
mkdirSync(DIST, { recursive: true });
execSync(
  `node node_modules/esbuild/bin/esbuild "${SRC}" --bundle --platform=node --format=cjs --outfile="${BUNDLE}" --external:playwright-core --external:playwright`,
  execOpts
);

console.log('=== Step 2: Patch bundle for pkg compatibility ===');
let bundle = readFileSync(BUNDLE, 'utf8');

// Fix import_meta.url for CJS (esbuild leaves it empty)
bundle = bundle.replace(
  'var import_meta = {};',
  'var import_meta = {};\nimport_meta.url = require("node:url").pathToFileURL(__filename).href;'
);

// Replace static playwright require with createRequire-based one that pkg can't resolve
bundle = bundle.replace(
  'var import_playwright = require("playwright");',
  'var _pkg_IS_PACKAGED = typeof process.pkg !== "undefined";\n' +
  'var _pkg_exeDir = _pkg_IS_PACKAGED ? require("node:path").dirname(process.execPath) : __dirname;\n' +
  'var _pkg_require = require("node:module").createRequire\n' +
  '  ? require("node:module").createRequire(require("node:path").join(_pkg_exeDir, "_"))\n' +
  '  : require;\n' +
  'var import_playwright = _pkg_require("playwright");'
);

// Reuse the already-computed IS_PACKAGED
bundle = bundle.replace(
  'var IS_PACKAGED = typeof process.pkg !== "undefined";',
  'var IS_PACKAGED = _pkg_IS_PACKAGED;'
);

writeFileSync(BUNDLE, bundle);
console.log('  Bundle patched.');

console.log('=== Step 3: Copy playwright node_modules for runtime ===');
const distNM = join(DIST, 'node_modules');
mkdirSync(join(distNM, 'playwright'), { recursive: true });
mkdirSync(join(distNM, 'playwright-core'), { recursive: true });

function copyDir(src, dest) {
  cpSync(src, dest, { recursive: true, force: true });
}

copyDir(join(ROOT, 'node_modules', 'playwright'), join(distNM, 'playwright'));
copyDir(join(ROOT, 'node_modules', 'playwright-core'), join(distNM, 'playwright-core'));

// Remove bundled browser binaries (we ship our own Chromium)
const localBrowsers = join(distNM, 'playwright-core', '.local-browsers');
if (existsSync(localBrowsers)) {
  rmSync(localBrowsers, { recursive: true, force: true });
  console.log('  Removed .local-browsers (using external Chromium).');
}
console.log('  playwright packages copied.');

console.log('=== Step 4: Copy Chromium runtime ===');
const chromiumExe = chromium.executablePath();
const chromiumSource = dirname(chromiumExe);
const chromiumTarget = join(DIST, 'chromium', 'chrome-win64');
if (!existsSync(chromiumExe)) {
  throw new Error(`Chromium executable not found: ${chromiumExe}. Run npm run install-browser first.`);
}
rmSync(join(DIST, 'chromium'), { recursive: true, force: true });
copyDir(chromiumSource, chromiumTarget);
console.log(`  Chromium copied: ${chromiumTarget}`);

console.log('=== Step 5: Build EXE with pkg ===');
execSync(
  `node node_modules/@yao-pkg/pkg/lib-es5/bin.js "${BUNDLE}" --targets node22-win-x64 --output "${join(DIST, EXE_NAME)}" --public --fallback-to-source`,
  execOpts
);

console.log('=== Step 6: Patch PE header for GUI subsystem (hide console) ===');
patchSubsystemToGUI(join(DIST, EXE_NAME));

console.log(`=== Done: ${join(DIST, EXE_NAME)} ===`);

// Patch Windows PE subsystem from Console (3) to GUI (2) so no console window appears
function patchSubsystemToGUI(exePath) {
  const buf = readFileSync(exePath);
  // Check DOS signature
  if (buf[0] !== 0x4D || buf[1] !== 0x5A) {
    console.log('  Not a valid PE file, skipping subsystem patch');
    return;
  }
  // Read e_lfanew (PE signature offset) from DOS header at offset 0x3C
  const peOffset = buf.readUInt32LE(0x3C);
  // Verify PE signature
  if (buf[peOffset] !== 0x50 || buf[peOffset + 1] !== 0x45) {
    console.log('  PE signature not found, skipping');
    return;
  }
  // Optional header starts at peOffset + 24 (4 sig + 20 COFF)
  const optHeader = peOffset + 24;
  // Subsystem field is at offset 68 in the optional header
  const subsystemOffset = optHeader + 68;
  const subsystem = buf.readUInt16LE(subsystemOffset);
  console.log(`  Current subsystem: ${subsystem} (${subsystem === 2 ? 'GUI' : subsystem === 3 ? 'Console' : 'Unknown'})`);
  if (subsystem === 3) {
    buf.writeUInt16LE(2, subsystemOffset);
    writeFileSync(exePath, buf);
    console.log('  Patched to GUI (2) — no console window');
  } else if (subsystem === 2) {
    console.log('  Already GUI, no patch needed');
  }
}
