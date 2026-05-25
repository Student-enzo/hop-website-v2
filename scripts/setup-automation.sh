#!/bin/bash
# One-time setup: installs the blog automation launchd job on this Mac.

set -euo pipefail

REPO="/Users/enissongodoy/gsd-workspaces/hop-bahamas-website"
PLIST_SRC="$REPO/scripts/com.hopbahamas.blog-automation.plist"
PLIST_DEST="$HOME/Library/LaunchAgents/com.hopbahamas.blog-automation.plist"

echo "Setting up HOP blog automation..."

# Make the script executable
chmod +x "$REPO/scripts/generate-blog-post.sh"

# Create logs directory
mkdir -p "$REPO/logs"

# Copy plist to LaunchAgents
cp "$PLIST_SRC" "$PLIST_DEST"

# Load it (starts watching for the schedule)
launchctl unload "$PLIST_DEST" 2>/dev/null || true
launchctl load "$PLIST_DEST"

echo ""
echo "Done. Blog automation is active."
echo ""
echo "Schedule: Monday + Thursday at 9:00am"
echo "Logs:     $REPO/logs/automation.log"
echo ""
echo "To run manually right now:"
echo "  bash $REPO/scripts/generate-blog-post.sh"
echo ""
echo "To disable:"
echo "  launchctl unload $PLIST_DEST"
echo ""
echo "To check status:"
echo "  launchctl list | grep hopbahamas"
