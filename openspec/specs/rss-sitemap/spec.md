## Purpose

Define RSS feed and sitemap generation for ishaat.ca using Quarto's built-in capabilities.

## Requirements

### Requirement: RSS feed generation
The site SHALL generate an RSS/Atom feed at `/index.xml` containing all published blog posts. The feed SHALL be configured in `_quarto.yml` under the website listing.

#### Scenario: Feed is generated
- **WHEN** the site is rendered
- **THEN** an XML feed file exists at `_site/index.xml`

#### Scenario: Feed contains all posts
- **WHEN** 3 published posts exist
- **THEN** the RSS feed contains entries for all 3 posts with title, date, description, and link

### Requirement: Feed metadata
The RSS feed SHALL include the site title ("Ishaat Chowdhury"), site URL (`https://www.ishaat.ca`), and author information.

#### Scenario: Feed metadata is correct
- **WHEN** an RSS reader parses the feed
- **THEN** it displays the site title as "Ishaat Chowdhury" and links to `https://www.ishaat.ca`

### Requirement: RSS feed linked in navbar
The navbar SHALL include an RSS icon linking to the feed URL (`/index.xml`).

#### Scenario: RSS link in navbar
- **WHEN** a user views any page
- **THEN** an RSS icon in the navbar links to `/index.xml`

### Requirement: Sitemap generation
The site SHALL generate a sitemap at `/sitemap.xml` containing URLs for all rendered pages.

#### Scenario: Sitemap is generated
- **WHEN** the site is rendered
- **THEN** a `sitemap.xml` file exists at `_site/sitemap.xml`

#### Scenario: Sitemap contains all pages
- **WHEN** the site has a home page, about page, tags page, and 3 blog posts
- **THEN** `sitemap.xml` contains entries for all of these pages
