#!/usr/bin/env bash
set -euo pipefail
psql "${BKG_FORGE_DATABASE_URL}" -c "CREATE EXTENSION IF NOT EXISTS vector;"
