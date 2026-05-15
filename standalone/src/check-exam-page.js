import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const BASE_URL = process.env.BASE_URL || 'http://sddy.gxk.yxlearning.com';
const PROFILE_DIR = process.env.PROFILE_DIR || path.join(ROOT, '.profile');
const PROXY_SERVER = String(process.env.PROXY_SERVER || '').trim() || undefined;

async function fileExists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function chromiumPath() {
  const candidates = [
    process.env.CHROMIUM_EXECUTABLE,
    path.join(ROOT, 'node_modules', 'playwright-core', '.local-browsers', 'chromium-1223', 'chrome-win64', 'chrome.exe')
  ].filter(Boolean);
  for (const candidate of candidates) {
    if (await fileExists(candidate)) return candidate;
  }
  return undefined;
}

const executablePath = await chromiumPath();
const context = await chromium.launchPersistentContext(PROFILE_DIR, {
  headless: false,
  executablePath,
  proxy: PROXY_SERVER ? { server: PROXY_SERVER } : undefined
});

try {
  const page = context.pages()[0] || await context.newPage();
  page.setDefaultTimeout(15000);
  const url = `${BASE_URL.replace(/\/$/, '')}/my/exam`;
  console.log(`Opening: ${url}`);
  console.log(`Chromium: ${executablePath || chromium.executablePath()}`);
  console.log(`Proxy: ${PROXY_SERVER || '(none)'}`);
  const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(error => ({ error }));
  if (response?.error) {
    console.log(`Navigation failed: ${response.error.message}`);
  } else {
    console.log(`HTTP status: ${response?.status?.() ?? 'unknown'}`);
  }
  await page.waitForLoadState('domcontentloaded').catch(() => {});
  await page.waitForTimeout(3000);
  console.log(`Final URL: ${page.url()}`);
  console.log(`Title: ${await page.title().catch(() => '')}`);
  const text = await page.locator('body').innerText({ timeout: 5000 }).catch(error => `body read failed: ${error.message}`);
  console.log(`Body: ${String(text).replace(/\s+/g, ' ').trim().slice(0, 500)}`);
} finally {
  await context.close();
}
