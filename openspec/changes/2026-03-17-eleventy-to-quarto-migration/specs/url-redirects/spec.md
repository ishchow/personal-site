## Purpose

Define CloudFlare redirect rules that map old Eleventy URL structure to the new Quarto URL structure, ensuring no broken links after migration.

## ADDED Requirements

### Requirement: Redirect old post URLs to new URLs
CloudFlare SHALL be configured with redirect rules that map the old Eleventy URL structure (`posts/YYYY/MM/DD/slug/`) to the new Quarto URL structure (`posts/YYYY/NNN-slug/`).

#### Scenario: Post 1 redirect
- **WHEN** a user visits `https://www.ishaat.ca/posts/2020/05/20/eleventy-tailwindcss-new-site/`
- **THEN** they are redirected (301) to `https://www.ishaat.ca/posts/2020/001-eleventy-tailwindcss-new-site/`

#### Scenario: Post 2 redirect
- **WHEN** a user visits `https://www.ishaat.ca/posts/2021/02/07/introducing-nvim-deardiary/`
- **THEN** they are redirected (301) to `https://www.ishaat.ca/posts/2021/001-introducing-nvim-deardiary/`

#### Scenario: Post 3 redirect
- **WHEN** a user visits `https://www.ishaat.ca/posts/2023/02/12/my-ultimate-windows-10-window-management-setup/`
- **THEN** they are redirected (301) to `https://www.ishaat.ca/posts/2023/001-my-ultimate-windows-10-window-management-setup/`

### Requirement: Permanent redirects (301)
All URL redirects SHALL use HTTP 301 (permanent redirect) status codes to preserve SEO value and inform search engines of the URL change.

#### Scenario: Redirect status code
- **WHEN** a client requests an old URL
- **THEN** the response status code is 301 (Moved Permanently)

### Requirement: CloudFlare Bulk Redirects
The redirects SHALL be implemented using CloudFlare Bulk Redirects (or Page Rules) rather than application-level redirects. This keeps redirect logic in the infrastructure layer.

#### Scenario: Redirects work without application changes
- **WHEN** the Quarto site is deployed without any redirect logic in its code
- **THEN** old URLs are still redirected correctly by CloudFlare

### Requirement: Redirect old feed URL
If the old RSS feed URL (`/feed.xml`) differs from the new one (`/index.xml`), a redirect SHALL be configured.

#### Scenario: Feed URL redirect
- **WHEN** a user or RSS reader requests `/feed.xml`
- **THEN** they are redirected (301) to `/index.xml`

### Requirement: Redirect old tags URL
If the old tags page URL (`/tags/`) differs from the new location, a redirect SHALL be configured.

#### Scenario: Tags URL redirect
- **WHEN** a user visits `/tags/`
- **THEN** they are redirected to the equivalent page on the new site (or a meaningful alternative)
