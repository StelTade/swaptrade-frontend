#!/usr/bin/env bash
# Simple script to trigger email dispatch endpoint. Use as a cron job or GitHub Action.
set -euo pipefail

URL=${DISPATCH_URL:-http://localhost:3000/api/email/dispatch}

echo "Calling dispatch endpoint: $URL"
curl -fsS -X POST "$URL" -H 'Content-Type: application/json' || {
  echo "Dispatch request failed" >&2
  exit 1
}
echo "Dispatched successfully"
