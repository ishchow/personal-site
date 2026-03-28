#!/usr/bin/env bash
set -euo pipefail

if [ $# -eq 0 ] || [ -z "$1" ]; then
  echo "Usage: mise run new-post \"My Post Title\""
  exit 1
fi

TITLE="$1"
YEAR=$(date +%Y)
DATE=$(date +%Y-%m-%d)
YEAR_DIR="posts/${YEAR}"

# Slugify: lowercase, replace spaces/special chars with hyphens, collapse multiple hyphens, trim
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9 -]//g' | tr ' ' '-' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')

# Find next sequence number
mkdir -p "$YEAR_DIR"
LAST_SEQ=$(find "$YEAR_DIR" -maxdepth 1 -mindepth 1 -type d 2>/dev/null \
  | sed 's|.*/||' \
  | grep -oE '^[0-9]+' \
  | sort -n \
  | tail -1 \
  || echo "0")
NEXT_SEQ=$(printf "%03d" $(( ${LAST_SEQ:-0} + 1 )))

POST_DIR="${YEAR_DIR}/${NEXT_SEQ}-${SLUG}"
mkdir -p "$POST_DIR"

# Create index.qmd with front matter
cat > "${POST_DIR}/index.qmd" <<EOF
---
title: "${TITLE}"
date: "${DATE}"
description: ""
draft: false
categories: []
---
EOF

echo "Created: ${POST_DIR}/index.qmd"
