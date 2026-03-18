#!/usr/bin/env bash
set -euo pipefail

echo "==> Trusting mise config..."
mise trust

echo "==> Installing tools (Python, uv)..."
mise install

echo "==> Installing Python dependencies..."
uv sync

echo "==> Setup complete!"
