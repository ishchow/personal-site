## Purpose

Define the CloudFlare Pages hosting configuration for ishaat.ca, including custom domain setup, HTTPS, and apex redirect.

## Requirements

### Requirement: CloudFlare Pages project
A CloudFlare Pages project SHALL be created for hosting ishaat.ca. The project SHALL serve the static site output from the `_site/` directory.

#### Scenario: Site is accessible
- **WHEN** the site is deployed to CloudFlare Pages
- **THEN** the site is accessible at the CloudFlare Pages default URL (e.g., `project-name.pages.dev`)

### Requirement: Custom domain configuration
The CloudFlare Pages project SHALL be configured with `www.ishaat.ca` as the custom domain. The domain SHALL serve the site over HTTPS with CloudFlare's automatic SSL.

#### Scenario: Custom domain serves site
- **WHEN** a user visits `https://www.ishaat.ca`
- **THEN** the Quarto site is served from CloudFlare Pages

#### Scenario: HTTPS enabled
- **WHEN** a user visits the site
- **THEN** the connection uses HTTPS with a valid SSL certificate

### Requirement: Apex domain redirect
The apex domain `ishaat.ca` SHALL redirect to `www.ishaat.ca` (or vice versa, matching the current site behavior).

#### Scenario: Apex to www redirect
- **WHEN** a user visits `https://ishaat.ca`
- **THEN** they are redirected to `https://www.ishaat.ca`

### Requirement: Remove Netlify configuration
The `netlify.toml` file and any Netlify-specific configuration SHALL be removed from the repository after successful migration to CloudFlare Pages.

#### Scenario: No Netlify artifacts remain
- **WHEN** the migration is complete
- **THEN** no `netlify.toml`, Netlify plugins, or Netlify-specific files exist in the repository
