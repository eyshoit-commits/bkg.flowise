#!/usr/bin/env bash
set -euo pipefail
( cd flowise && ./scripts/start-flowise.sh )
( cd backend && npm install && npm run dev )
( cd webui && npm install && npm run dev )
