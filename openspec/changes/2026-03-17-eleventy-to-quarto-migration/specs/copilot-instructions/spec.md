## Purpose

Define the Copilot instructions file that provides AI agents with project context for ishaat.ca.

## ADDED Requirements

### Requirement: Copilot instructions file exists
A file SHALL exist at `.github/copilot-instructions.md` providing project context to Copilot.

#### Scenario: File present in repository
- **WHEN** Copilot is invoked in this repository
- **THEN** it loads `.github/copilot-instructions.md` as context

### Requirement: Instructions describe site architecture
The instructions file SHALL document the technology stack (Quarto, GitHub Actions, CloudFlare Pages), the directory structure for posts (`posts/{year}/{NNN}-{slug}/`), and the deployment pipeline.

#### Scenario: Architecture overview present
- **WHEN** reading the instructions file
- **THEN** it contains sections covering the tech stack, directory layout, and deployment flow

### Requirement: Instructions describe post creation workflow
The instructions file SHALL document how to create a new post using `mise run new-post "<title>"` and the branch naming convention (`{year}-{seq}`).

#### Scenario: Post workflow documented
- **WHEN** reading the instructions file
- **THEN** it contains the mise command for creating posts and explains the branch naming convention

### Requirement: Instructions describe key conventions
The instructions file SHALL document key conventions: categories/tags usage, posts created as drafts by default, the `posts/_metadata.yml` shared configuration, and giscus comment integration.

#### Scenario: Conventions documented
- **WHEN** reading the instructions file
- **THEN** it contains information about categories, draft workflow, shared metadata, and the comment system

### Requirement: Instructions describe migration context
The instructions file SHALL note that the site was migrated from Eleventy + TailwindCSS and that old URLs are redirected via CloudFlare redirect rules.

#### Scenario: Migration context documented
- **WHEN** reading the instructions file
- **THEN** it mentions the migration from Eleventy and the existence of CloudFlare redirect rules for legacy URLs
