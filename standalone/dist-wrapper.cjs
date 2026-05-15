// CJS bootstrap wrapper for pkg-compatible EXE packaging
(async () => {
  await import('./src/main.js');
})().catch(err => {
  console.error(err);
  process.exit(1);
});
