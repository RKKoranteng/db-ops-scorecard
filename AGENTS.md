# Working on Database Ops Scorecard

This file explains why the project is built the way it is. When a change conflicts with these principles, the principles win.

How-to guidance (setup, previewing, screenshots, commits, and pull requests) lives only in [CONTRIBUTING.md](CONTRIBUTING.md). Don't repeat it here; point to it instead.

## What this project is

[Database Ops Scorecard](https://scorecard.rkkoranteng.com/) is a set of rapid database self-assessments, each on its own tab and scored separately: Environment Agility (can you rebuild an environment quickly, with minimal manual intervention?), Operations (capacity, availability, performance, recoverability, and observability), and Security. People answer a short set of questions and get an honest score, a breakdown by area, and a summary they can share. The scorecards and their questions live in `SCORECARDS` in `js/app.js`. It is a conversation starter and a baseline for improvement, not an audit or a compliance framework.

The project has one maintainer, and its value comes from staying small and trustworthy. Every decision, in the writing and in the code, serves one path: answer the questions, understand the score, and know where to improve.

## Technical principles

**No backend.** The site is static HTML, CSS, and JavaScript served from GitHub Pages. Do not introduce anything that needs a server, a database, an API, user accounts, or a build service.

**Nothing leaves the browser.** Answers and scores are computed and kept on the user's device. Don't add tracking, analytics, cookies, or any network call that carries what someone answered. People assess their weak spots here; that trust is the product.

**Three files, no dependencies.** Markup lives in `index.html`, styles in `css/style.css`, and behavior in `js/app.js`. No frameworks, no preprocessors, no packages, no build step. Someone should be able to read the whole app in one sitting and understand it months later.

**Boring is fine.** The measure of a tool is whether the project is hindered without it, not whether it is popular. Before proposing a new dependency, file, or toolchain, ask what problem it solves that plain HTML, CSS, and JavaScript cannot. Small exceptions exist for repository automation (the Node changelog hook and release scripts); they are dev-only and never part of the shipped site.

**The scoring is the product.** Questions, weights, rating thresholds, and labels are deliberate positions about what reliable database operations look like. Don't change them as a side effect of other work. A scoring change gets its own commit, explains its reasoning, and appears in the changelog so users can tell why their score moved.

## How we use LLMs

LLMs help one maintainer keep the project healthy, within strict limits.

LLMs are **not** used to:

- **Decide what the scorecard measures.** Questions, scoring, and recommendations are human positions, owned by someone accountable for them.
- **Add needless features.** If a feature would not exist without an LLM to justify it, it should not exist.
- **Push or release on their own.** Agents commit locally; a human reviews and pushes.

LLMs **are** used to:

- **Build reusable tools that run without an LLM.** The changelog hook and release scripts are ordinary scripts anyone can run, offline, for free. An LLM may help write a tool once; the tool must then stand on its own.
- **Check accessibility, layout, and behavior** across screen sizes and browsers, which one maintainer can't do by hand for every change.

## Writing and content

Write plainly and lead with the point. The audience is DBAs, platform engineers, and engineering managers: be specific, avoid jargon that doesn't earn its place, and never use fear to sell. Scores and recommendations should explain their reasoning, so a reader can disagree intelligently because we told them why.

This applies to site content, and it is a good default for documentation, commit messages, and pull request descriptions too.
