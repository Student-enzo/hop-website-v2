#!/bin/bash
# HOP Bahamas — Automated Blog Post Generator
# Runs via macOS launchd on schedule. Uses claude CLI (no API key required).

set -euo pipefail

REPO="/Users/enissongodoy/gsd-workspaces/hop-bahamas-website"
LOG="$REPO/logs/automation.log"
PROMPT="$REPO/scripts/blog-generation-prompt.md"
RUNS_JSON="$REPO/public/blog-automation-runs.json"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M")
TELEGRAM_TOKEN=$(cat "$HOME/.hop-telegram-token" 2>/dev/null || echo "")
TELEGRAM_CHAT="7574614815"

mkdir -p "$REPO/logs"
cd "$REPO"

echo "[$TIMESTAMP] Starting blog generation run..." | tee -a "$LOG"

# Guard: skip if a post was published in the last 2 days
LAST_COMMIT_AGE=$(git log --format="%ar" --grep="feat(blog): auto-publish" -1 2>/dev/null || echo "never")
if [[ "$LAST_COMMIT_AGE" == *"hour"* ]] || [[ "$LAST_COMMIT_AGE" == *"minute"* ]]; then
  echo "[$TIMESTAMP] Skipped — post published less than 24h ago ($LAST_COMMIT_AGE)" | tee -a "$LOG"
  exit 0
fi

# Ensure we're on main and up to date
git checkout main 2>/dev/null
git pull origin main 2>/dev/null || echo "[$TIMESTAMP] Warning: could not pull (offline?)" | tee -a "$LOG"

# Run Claude in non-interactive mode with the blog generation prompt
echo "[$TIMESTAMP] Running Claude generation agent..." | tee -a "$LOG"

claude --print \
  --dangerously-skip-permissions \
  --allowedTools "Bash,Read,Write,WebSearch,WebFetch" \
  --max-turns 35 \
  -p "$(cat "$PROMPT")" 2>&1 | tee -a "$LOG"

CLAUDE_EXIT=${PIPESTATUS[0]}

if [ $CLAUDE_EXIT -ne 0 ]; then
  echo "[$TIMESTAMP] FAILED — claude exited with code $CLAUDE_EXIT" | tee -a "$LOG"
  # Write failure to runs log
  python3 -c "
import json, datetime, os
f = '$RUNS_JSON'
runs = json.load(open(f)) if os.path.exists(f) else []
runs.insert(0, {'timestamp': datetime.datetime.utcnow().isoformat()+'Z', 'status': 'failed', 'slug': None, 'title': None})
open(f, 'w').write(json.dumps(runs[:50], indent=2))
" 2>/dev/null || true
  git add "$RUNS_JSON" && git commit -m "chore(blog): log failed automation run" && git push origin main 2>/dev/null || true
  osascript -e 'display notification "Blog automation failed — check logs/automation.log" with title "HOP Blog" subtitle "Generation error" sound name "Basso"' 2>/dev/null || true
  exit 1
fi

# Extract slug + title from last auto-publish commit
LAST_COMMIT_MSG=$(git log --format="%s" --grep="feat(blog): auto-publish" -1 2>/dev/null || echo "")
LAST_TITLE=$(echo "$LAST_COMMIT_MSG" | sed 's/feat(blog): auto-publish — //')
LAST_SLUG=$(git log --format="%b" --grep="feat(blog): auto-publish" -1 2>/dev/null | head -1 || echo "")
if [ -z "$LAST_TITLE" ]; then LAST_TITLE="new post"; fi

# Write success to runs log
python3 -c "
import json, datetime, os
f = '$RUNS_JSON'
runs = json.load(open(f)) if os.path.exists(f) else []
runs.insert(0, {'timestamp': datetime.datetime.utcnow().isoformat()+'Z', 'status': 'success', 'title': '$LAST_TITLE'})
open(f, 'w').write(json.dumps(runs[:50], indent=2))
" 2>/dev/null || true
git add "$RUNS_JSON" && git commit -m "chore(blog): update automation run log" && git push origin main 2>/dev/null || true

# Telegram push notification (requires ~/.hop-telegram-token)
if [ -n "$TELEGRAM_TOKEN" ]; then
  MSG="HOP Blog published%0A%0A${LAST_TITLE}%0A%0Ahttps://hopbahamas.com/blog"
  curl -s "https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage" \
    -d "chat_id=${TELEGRAM_CHAT}" \
    -d "text=${MSG}" >/dev/null 2>&1 || true
fi

# Mac notification
osascript -e "display notification \"${LAST_TITLE}\" with title \"HOP Blog — Post Published\" subtitle \"Live on hopbahamas.com\" sound name \"Glass\"" 2>/dev/null || true

echo "[$TIMESTAMP] Run complete. Published: $LAST_TITLE" | tee -a "$LOG"
