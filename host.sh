#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-8000}"
SITE_DIR="$(cd "$(dirname "$0")" && pwd)/site"
URL="http://localhost:${PORT}/"

cd "$SITE_DIR"

python3 -m http.server "$PORT" --bind 127.0.0.1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" 2>/dev/null || true' EXIT INT TERM

sleep 0.5
xdg-open "$URL" >/dev/null 2>&1 &

wait "$SERVER_PID"
