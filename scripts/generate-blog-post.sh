#!/bin/bash
# HOP Bahamas — Automated Blog Post Generator
# Runs via macOS launchd on schedule. Uses claude CLI (no API key required).

set -euo pipefail

REPO="/Users/enissongodoy/gsd-workspaces/hop-bahamas-website"
LOG="$REPO/logs/automation.log"
PROMPT="$REPO/scripts/blog-generation-prompt.md"
TIMESTAMP=$(date "+%Y-%m-%d %H:%M")

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
  osascript -e 'display notification "Blog automation failed — check logs/automation.log" with title "HOP Blog" subtitle "Generation error" sound name "Basso"' 2>/dev/null || true
  exit 1
fi

# Notify: extract slug from last auto-publish commit message
LAST_SLUG=$(git log --format="%s" --grep="feat(blog): auto-publish" -1 2>/dev/null | sed 's/feat(blog): auto-publish — //' || echo "new post")
osascript -e "display notification \"${LAST_SLUG}\" with title \"HOP Blog — Post Published\" subtitle \"Live on hopbahamas.com\" sound name \"Glass\"" 2>/dev/null || true

echo "[$TIMESTAMP] Run complete." | tee -a "$LOG"
