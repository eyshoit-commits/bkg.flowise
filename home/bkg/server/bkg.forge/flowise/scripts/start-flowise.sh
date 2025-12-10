#!/usr/bin/env bash
set -euo pipefail
export COMPOSE_PROJECT_NAME=bkg_flowise
cp -n .env.example .env || true
docker compose up -d
