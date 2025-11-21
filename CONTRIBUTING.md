# Contributing 
Welcome and thanks for your interest in contributing to this project. Just a few house keeping rules:

* If you have found a bug, open a [Bug Report](https://github.com/RKKoranteng/db-ops-scorecard/issues/new/choose)
* If you have a feature request, open a [User Story](https://github.com/RKKoranteng/db-ops-scorecard/issues/new/choose)
* When filing an issue, user story, or opening a Pull Request(PR), please include a clear title and description. The title should be a short summary of the issue. For example, `Invalid Query in com_admin.` All issues, user stories, and PRs should include a description with as much detail as possible. 
* Check for open similar [issues/user stories](https://github.com/RKKoranteng/db-ops-scorecard/issues) before opening another one. You can upvote existing issues or user stories
* Follow my [Development Standards](#) for code contributions.

Please be patient as not all items will be viewed or tested immediately and be receptive to feedback about your code.

## Branch strategy
This project uses a simple trunk-based workflow. 

* `main`
    * stable, production branch.

* Short-lived branches from dev:
    * `feature/db-score-badge`
    * `bugfix/footer-layout`
    * `docs/readme-cleanup`

* All PRs go into `main`

## For contributors
 ```bash
 git checkout main
 git pull
 git checkout -b feature/my-change
```
1. Make your changes (small and focused is best).
1. Commit and push your branch.
1. Open a Pull Request into main.
1. I'll review, request changes if needed, and merge when it's ready.