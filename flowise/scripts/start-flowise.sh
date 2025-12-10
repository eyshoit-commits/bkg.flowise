#!/usr/bin/env bash
set -euo pipefail
export $(grep -v '^#' .env 2>/dev/null | xargs -d '\n' || true)
docker compose up -d
