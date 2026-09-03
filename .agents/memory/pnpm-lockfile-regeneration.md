---
name: pnpm lockfile versions
description: Cross-version pnpm lockfile behavior relevant to deployment and local validation
---

Use the repository’s intended pnpm major when regenerating a lockfile. A lockfile-only regeneration with a different pnpm major can rewrite large portions of the file and omit root configuration metadata such as overrides, creating a new frozen-install config mismatch rather than fixing the original issue.

**Why:** The workspace’s current pnpm 10 install already considers the checked-in lockfile current, while a pnpm 9 forced regeneration dropped override metadata and caused pnpm 10 to reject the result.

**How to apply:** Run the requested non-frozen install with the project’s configured/local pnpm version, then validate with a frozen install before committing. Do not commit a cross-major rewrite solely to manufacture a diff.