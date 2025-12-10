#!/usr/bin/env bash
set -euo pipefail
DB_URL=${DATABASE_URL:-"postgresql://forge:change_me_strong@localhost:7543/forge"}
psql "$DB_URL" -c 'CREATE EXTENSION IF NOT EXISTS vector;'
