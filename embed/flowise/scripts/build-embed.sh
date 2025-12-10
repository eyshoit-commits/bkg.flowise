#!/usr/bin/env bash
set -euo pipefail
echo "Building Flowise embed assets"
mkdir -p ../dist
echo "const widget = () => console.log('Flowise embed ready'); export default widget;" > ../dist/embed.js
