#!/bin/sh
# Claude Code Stop hook: commits whatever changed during a Claude task.
# First stop with uncommitted changes: asks Claude to commit them with a
# prefixed message (add:/ref:/fix:/del:), since that message becomes the
# changelog entry. If Claude still leaves changes behind, commits them itself.
# The post-commit hook in .githooks then adds the CHANGELOG.md entry.

input="$(cat)"
active="$(printf '%s' "$input" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{try{console.log(JSON.parse(s).stop_hook_active?"1":"")}catch{console.log("")}})')"

cd "$(git rev-parse --show-toplevel 2>/dev/null)" || exit 0
[ -z "$(git status --porcelain)" ] && exit 0

if [ -z "$active" ]; then
  cat <<'EOF'
{"decision":"block","reason":"There are uncommitted changes in the repo. Commit them now with `git add -A` and `git commit -m \"<prefix>: <summary>\"`, using prefix add: (new), ref: (changed), fix: (bug fix) or del: (removed). Write the summary as a short changelog entry. Do not push."}
EOF
  exit 0
fi

# Fallback: Claude didn't commit, so commit with a message naming the files
files="$(git status --porcelain | awk '{print $NF}' | head -5 | paste -sd, - | sed 's/,/, /g')"
git add -A
git commit --quiet -m "ref: update $files" >/dev/null 2>&1
echo "{\"systemMessage\":\"Auto-committed: ref: update $files\"}"
