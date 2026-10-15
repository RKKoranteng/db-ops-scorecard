# Contributing to Database Ops Scorecard

Please do contribute! Issues and pull requests are welcome. This file is the single home for contributor guidance: how to set up the project, work on it, and submit changes. For background on the project, see [AGENTS.md](AGENTS.md).

## Development

### Dependencies

- Git
- A modern browser (Chrome or Edge for the screenshot steps below)
- Node.js, used by the changelog hook
- Python 3 (optional), for a local preview server

The site itself is static HTML, CSS, and vanilla JavaScript with no build step, frameworks, or package dependencies.

### Installation

- `git clone https://github.com/RKKoranteng/db-ops-scorecard.git`
- `cd db-ops-scorecard`
- `git config core.hooksPath .githooks` turns on the hook that adds each commit to the changelog

### Common tasks

- `python -m http.server 8000` serves the site at http://localhost:8000. Opening `index.html` directly in a browser also works.
- Edit `index.html`, `css/style.css`, and `js/app.js`, then refresh the browser to see your changes.

### Commits and changelog

Start each commit message with a prefix. The hook adds the message to [CHANGELOG.md](CHANGELOG.md) under `## [Unreleased]`, in the [Keep a Changelog][keepachangelog] format:

| Prefix | Changelog section | Example |
|---|---|---|
| `add:` | Added | `add: scoring thresholds` |
| `ref:` | Changed | `ref: update tagline hover behavior` |
| `fix:` | Fixed | `fix: mobile layout of results` |
| `del:` | Removed | `del: old footer class` |

Merges, `goo:` commits, and messages containing `[skip changelog]` are left out.

### Screenshots

To capture screenshots of a visual change:

1. Open the affected page in Chrome or Edge and press `F12` to open DevTools.
2. Capture it at desktop width, then press `Ctrl+Shift+M` (`Cmd+Shift+M` on macOS) to switch to a mobile width such as 390px and capture it again. Do both in light and dark mode, using the moon/sun button in the header.
3. To capture the whole page, press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) and run **Capture full size screenshot**.
4. If your change affects the results view, answer the questions first so the score and category breakdown are on screen.

Include before and after screenshots when you change existing layout or styling.

### Deployment

Every push to `main` deploys and releases automatically:

- The Pages workflow publishes the site to [scorecard.rkkoranteng.com][site].
- The Release Changelog workflow moves the `Unreleased` entries to a new [CalVer][calver] version (`YYYY.MM.DD`, then `YYYY.MM.DD.1`, `.2`, ... for later pushes the same day) and publishes a matching tag and GitHub release with those entries as the release notes.

## Issues

[Open an issue][issues] using one of the templates:

- **Bug report**: current behavior and expected behavior
- **Feature request**: a user story and acceptance criteria
- **Documentation issue**: what's wrong and the page(s) affected

## Pull requests

These apply to humans and AI agents alike:

- Work in a short-lived branch such as `feature/improve-score-labels` or `bugfix/fix-mobile-layout`, then open a [pull request][pull-request] against `main`.
- Always include screenshots of visual changes when possible, captured as shown in [Screenshots](#screenshots), and embed the images in the PR description.
- Be succinct in PR descriptions. Link to code, docs, issues, or live pages instead of restating their content.
- Don't format plain text weird: write normal paragraphs with no artificial line returns (hard wraps) and let text wrap naturally.
- Use GitHub-flavored Markdown properly — headings, lists, tables, and code fences where they help — so the description renders well.

Thank you for your help improving this project!
