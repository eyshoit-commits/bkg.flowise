#!/usr/bin/env bash
set -euo pipefail
npx esbuild src/index.ts --bundle --format=esm --outfile=dist/index.js
