## Purpose

Define the Quarto project scaffold for ishaat.ca including site configuration, theme, navigation, footer, about page, 404 page, and RSS feed.

## Requirements

### Requirement: Quarto project configuration
The project SHALL be configured as a Quarto website with blog support via `_quarto.yml` at the project root. The output directory SHALL be `_site`.

#### Scenario: Project renders successfully
- **WHEN** `quarto render` is executed in the project root
- **THEN** the site is rendered to the `_site/` directory without errors

### Requirement: Flatly/darkly theme toggle
The site SHALL use the flatly Bootswatch theme for light mode and the darkly Bootswatch theme for dark mode. Quarto SHALL render a theme toggle control in the navbar.

#### Scenario: Theme toggle is present
- **WHEN** a user visits any page on the site
- **THEN** a light/dark theme toggle icon is visible in the navbar

#### Scenario: Default theme respects system preference
- **WHEN** a user visits the site with a system dark mode preference
- **THEN** the site renders in darkly theme

### Requirement: Top navbar navigation
The site SHALL display a top navigation bar with the site title on the left, and links to About, Tags, RSS feed, search, and theme toggle on the right.

#### Scenario: Navbar layout
- **WHEN** a user visits any page
- **THEN** the navbar displays "Ishaat Chowdhury" as the site title on the left, and About link, Tags link, RSS icon, search, and theme toggle on the right

### Requirement: Blog listing page
The `index.qmd` at the project root SHALL be a listing page that displays all posts from `posts/**/index.qmd` sorted by date descending. Categories SHALL be displayed for each post.

#### Scenario: Posts are listed
- **WHEN** a user visits the home page
- **THEN** all published (non-draft) posts are listed in reverse chronological order with title, date, description, and categories

#### Scenario: Recursive post discovery
- **WHEN** posts exist in nested year/sequence directories under `posts/`
- **THEN** the listing page discovers and displays all of them

### Requirement: About page
The project SHALL include an `about.qmd` page accessible from the navbar. It SHALL contain a brief bio, tech stack description, and licensing information (content under CC BY-NC-4.0, source code under MIT).

#### Scenario: About page renders
- **WHEN** a user clicks "About" in the navbar
- **THEN** the about page is displayed with bio, tech stack, and license info

### Requirement: Page footer
The site SHALL display a footer on all pages containing copyright notice, and links to RSS, Email, GitHub, and LinkedIn.

#### Scenario: Footer content
- **WHEN** a user visits any page
- **THEN** the footer displays "© 2026 Ishaat Chowdhury" and links to RSS, email, GitHub, and LinkedIn

### Requirement: Custom CSS file
The project SHALL include a `styles.css` file for custom style overrides, referenced in `_quarto.yml`.

#### Scenario: Custom styles are applied
- **WHEN** the site is rendered
- **THEN** the `styles.css` file is included in all pages

### Requirement: Site URL configuration
The site SHALL be configured with `site-url: "https://www.ishaat.ca"` in `_quarto.yml` and SHALL enable Open Graph and Twitter Card metadata generation.

#### Scenario: Social metadata is generated
- **WHEN** the site is rendered
- **THEN** each page includes Open Graph and Twitter Card meta tags

### Requirement: 404 page
The project SHALL include a `404.qmd` page that provides a user-friendly not-found message with navigation guidance.

#### Scenario: 404 page exists
- **WHEN** a user visits a non-existent URL
- **THEN** the 404 page is displayed with links to the home page, about page, and tags page
