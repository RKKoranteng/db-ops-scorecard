# Contributing

Welcome, and thanks for your interest in the [Database Ops Scorecard (D.O.S)](https://dos.rkkoranteng.com/). This guide explains how you can contribute and how the project is developed and maintained. More detail lives in the [project wiki](https://github.com/RKKoranteng/db-ops-scorecard/wiki).

- [How to Contribute](#how-to-contribute)
- [Development Philosophy](#development-philosophy)
- [Tech & Scope](#tech--scope)
- [Branching & Workflow](#branching--workflow)
- [Code Style](#code-style)
- [UX & Product Intent](#ux--product-intent)
- [Commits, Changelog & Releases](#commits-changelog--releases)
- [Support & Contact](#support--contact)

## How to Contribute
This project is solo-maintained by [RKKoranteng LLC](https://rkkoranteng.com). External contributors may:
- ✅ [Report bugs](https://github.com/RKKoranteng/db-ops-scorecard/issues/new/choose)
- ✅ [Submit feature requests](https://github.com/RKKoranteng/db-ops-scorecard/issues/new/choose)
- ✅ [Report documentation errors](https://github.com/RKKoranteng/db-ops-scorecard/issues/new/choose)

Not currently accepted without approval:
- ❌ Direct code modifications
- ❌ Large structural changes
- ❌ Architectural refactors

All contributions must align with the philosophy and scope of the platform.

Each issue template asks for a short explanation:

| Issue | Title prefix | Include |
|---|---|---|
| Bug report | `[Bug]:` | Current Behavior, Expected Behavior |
| Feature request | `[Story]:` | User Story, Acceptance Criteria |
| Documentation issue | `[Doc]:` | Current Documentation issue and the URL/page(s) affected |

## Development Philosophy
- Keep it **simple, static, and fast**.
- Prefer **clarity over cleverness**.
- Everything should be **easy to read and reason about**, even months later.
- **This is a small product**, not a framework playground.

If a change makes the project heavier, harder to understand, or deviates from its core purpose, it is likely out of scope.

## Tech & Scope
- HTML, CSS and vanilla JavaScript only
- No frameworks (React, Vue, etc.)
- No build tools (Webpack, Vite, etc.)
- No runtime backend: it runs as static files on any static host (GitHub Pages)

Out of scope: backend integrations, API-driven features, user accounts or authentication, and heavy frameworks or toolchains.

## Branching & Workflow
This project follows a **trunk-based workflow**:
- `main` is the single long-lived branch and always represents the current stable version.
- All work, even solo changes, is done in short-lived branches and merged into `main` via pull request.

Branch naming examples:
- `feature/improve-score-labels`
- `bugfix/fix-mobile-layout`
- `docs/update-wiki-copy`

## Code Style

### HTML
- Semantic where reasonable (`<main>`, `<footer>`, headings in order).
- No inline styles; use `css/style.css`.
- Class names describe purpose, not appearance:
  - Good: `results-actions`, `cta-btn`, `category-title`
  - Avoid: `blue-text`, `big-box`, `left-col`

### CSS
- Single stylesheet: `css/style.css`.
- Reuse existing patterns and colors:
  - Accent: `#478ac9`
  - Background highlight: `#E9F2FA`
  - Text: `#111827`, `#4b5563`
- Keep it responsive using the existing media query structure.
- No CSS frameworks or preprocessors.

### JavaScript
- One file: `js/app.js`.
- Use `const`/`let`, no `var`.
- Small, focused functions.
- Minimal global state (only what's needed for scoring and UI).
- No external libraries or dependencies.

## UX & Product Intent
The app is meant to:
1. Ask a short set of questions about database operations.
2. Produce a clear, honest reliability score.
3. Highlight strengths and gaps by category.
4. Offer a simple call to action if more help is needed.

So keep the UI clean and distraction-free, avoid extra flows that pull users away from that core path, and don't add tracking, analytics, or intrusive prompts.

## Commits, Changelog & Releases
Keep commit messages short and descriptive, with a prefix:
- `add: scoring thresholds`
- `fix: mobile layout of results`
- `ref: update tagline hover behavior`
- `del: old footer class`

Commits are added to [CHANGELOG.md](CHANGELOG.md) automatically, in the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format. Enable the hook once per clone:

```sh
git config core.hooksPath .githooks
```

Each commit's subject goes under `## [Unreleased]`, grouped by its prefix: `add:`/`feat:` → Added, `fix:` → Fixed, `del:` → Removed, anything else → Changed. Merges, `goo:` commits and subjects containing `[skip changelog]` are left out.

Releases follow [Calendar Versioning](https://calver.org/). Every push to `main` gets its own release: the Release Changelog workflow moves the entries to a new version (`YYYY.MM.DD`, then `YYYY.MM.DD.1`, `.2`, ... for later pushes the same day) and publishes a matching tag and GitHub release with those entries as the release notes.

When Claude Code finishes a task with uncommitted changes, the Stop hook in `.claude/settings.json` has Claude commit them with a prefixed message, so the change and its changelog entry are ready to push. Claude never pushes on its own.

## Support & Contact
For licensing inquiries, support, or professional reliability assessments:
- 📧 [richard@rkkoranteng.com](mailto:richard@rkkoranteng.com)
- 📞 [Schedule a call](https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ2BMW_ebBrDPEnl5n3oiZziXvGFj0LRBzxEQZTsjCmE_M-OWgymxc6LqCIRmCe96LgKfmeK87OT)
- 🌐 [rkkoranteng.com](https://rkkoranteng.com)
