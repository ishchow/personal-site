## Purpose

Define the GitHub Actions CI/CD pipeline that renders the Quarto site and deploys to CloudFlare Pages, with PR preview deploys.

## ADDED Requirements

### Requirement: GitHub Actions build and deploy workflow
The project SHALL include a GitHub Actions workflow at `.github/workflows/publish.yml` that renders the Quarto site and deploys the output to CloudFlare Pages.

#### Scenario: Deploy on push to main
- **WHEN** a commit is pushed to the `main` branch
- **THEN** the workflow renders the site with `quarto render` and deploys `_site/` to CloudFlare Pages using `cloudflare/pages-action`

### Requirement: CloudFlare credentials via GitHub secrets
The workflow SHALL reference `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from GitHub repository secrets. The CloudFlare Pages project name SHALL be configurable in the workflow file.

#### Scenario: Secrets are used for authentication
- **WHEN** the deploy step runs
- **THEN** it authenticates with CloudFlare using the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets

### Requirement: PR preview deploys
The workflow SHALL trigger on `pull_request` events in addition to pushes to `main`. Non-main branch deploys SHALL generate preview URLs on CloudFlare Pages.

#### Scenario: PR generates preview URL
- **WHEN** a pull request is opened or updated
- **THEN** the workflow renders and deploys the site, and CloudFlare Pages provides a preview URL for the PR

### Requirement: Workflow permissions
The workflow SHALL request only the minimum required permissions: `contents: read` and `deployments: write`.

#### Scenario: Minimal permissions
- **WHEN** the workflow runs
- **THEN** it operates with only `contents: read` and `deployments: write` permissions

### Requirement: Quarto installation in CI
The workflow SHALL install Quarto using the `quarto-dev/quarto-actions/setup` action before rendering.

#### Scenario: Quarto available in CI
- **WHEN** the build step runs
- **THEN** Quarto is installed and available for rendering the site
