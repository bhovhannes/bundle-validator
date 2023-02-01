---
'@bundle-validator/plugin-bundle-content': patch
'@bundle-validator/plugin-bundle-size': patch
'@bundle-validator/cli': patch
---

switch to pnpm, fixed bug in plugin loading code. Now plugins are being searched using Node resolution algorithm starting from the config file path.
