#!/usr/bin/env bash
set -euo pipefail
(cd backend && npm install && npm run dev) &
(cd webui && npm install && npm run dev -- --host) &
wait
