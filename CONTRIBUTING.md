# Contributing 
Welcome and thanks for your interest in contributing to this project. [Here's how you can contribute.](https://github.com/RKKoranteng/db-ops-scorecard/wiki/Project-Documentation#Contributing)
## Changelog
Commits are added to `CHANGELOG.md` automatically. Enable the hook once per clone:

```sh
git config core.hooksPath .githooks
```

Each commit's subject goes under `## [Unreleased]`, grouped by its prefix: `add:`/`feat:` → Added, `fix:` → Fixed, `del:` → Removed, anything else → Changed. Merges, `goo:` commits and subjects containing `[skip changelog]` are left out. On push to main, the Release Changelog workflow dates the entries and publishes a matching tag and GitHub release.

When Claude Code finishes a task with uncommitted changes, the Stop hook in `.claude/settings.json` has Claude commit them with a prefixed message, so the change and its changelog entry are ready to push. Claude never pushes on its own.
