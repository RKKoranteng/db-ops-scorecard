# Contributing

Please do contribute! [Issue and feature requests](https://github.com/RKKoranteng/db-ops-scorecard/issues/new/choose) are welcome.

## Pull requests

These apply to humans and AI agents alike:

- Always include screenshots of visual changes when possible, captured as shown in [Previewing and screenshots](#previewing-and-screenshots), and embed the images in the PR description.
- Be succinct in PR descriptions. Link to code, docs, issues, or live pages instead of restating their content.
- Don't format plain text weird: write normal paragraphs with no artificial line returns (hard wraps) and let text wrap naturally.
- Use GitHub-flavored Markdown properly — headings, lists, tables, and code fences where they help — so the description renders well.

## Previewing and screenshots

The site is static HTML, CSS, and JavaScript with no build step. To preview it, serve the repo root locally and open http://localhost:8000:

```sh
python -m http.server 8000
```

Opening `index.html` directly in a browser also works.

To capture screenshots of a change:

1. Open the affected page in Chrome or Edge and press `F12` to open DevTools.
2. Capture it at desktop width, then press `Ctrl+Shift+M` (`Cmd+Shift+M` on macOS) to switch to a mobile width such as 390px and capture it again.
3. To capture the whole page, press `Ctrl+Shift+P` (`Cmd+Shift+P` on macOS) and run **Capture full size screenshot**.
4. If your change affects the results view, answer the questions first so the score and category breakdown are on screen.

Include before and after screenshots when you change existing layout or styling.

Thank you for your help improving this project!
