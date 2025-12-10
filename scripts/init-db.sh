#!/usr/bin/env bash
set -euo pipefail
DATABASE_URL=${DATABASE_URL:-postgresql://forge:secret@localhost:7543/forge}
psql "$DATABASE_URL" -c 'CREATE EXTENSION IF NOT EXISTS vector;'
