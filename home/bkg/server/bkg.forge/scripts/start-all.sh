#!/usr/bin/env bash
set -euo pipefail
( cd backend && npm install && npm run dev ) &
( cd flowise && ./scripts/start-flowise.sh ) &
wait
