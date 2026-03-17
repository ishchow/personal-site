## Purpose

Define the blog post directory layout, front matter schema, categories/tags, image handling, video embeds, and code highlighting for ishaat.ca.

## Requirements

### Requirement: Post directory structure
Posts SHALL be organized in `posts/{year}/{NNN}-{slug}/` directories where `{year}` is a four-digit year, `{NNN}` is a three-digit zero-padded sequence number, and `{slug}` is a URL-friendly slugified title.

#### Scenario: Directory layout
- **WHEN** a post titled "My First Post" is created in 2023
- **THEN** it resides at `posts/2023/001-my-first-post/index.qmd`

#### Scenario: Sequence numbers reset per year
- **WHEN** the first post of a new year is created
- **THEN** the sequence number starts at `001` for that year

### Requirement: Post front matter schema
Each post `index.qmd` SHALL contain YAML front matter with: `title`, `date` (YYYY-MM-DD), `description`, `categories` (list of tags), and optionally `draft: true`. Posts SHALL NOT include an `author` field — author is inherited from `posts/_metadata.yml`.

#### Scenario: Required front matter fields
- **WHEN** a published post is rendered
- **THEN** its front matter includes `title`, `date`, `description`, and `categories`

#### Scenario: Author inheritance
- **WHEN** a post does not specify `author` in its front matter
- **THEN** the rendered post displays the author from `posts/_metadata.yml`

### Requirement: Shared post metadata
A `posts/_metadata.yml` file SHALL exist to centralize shared post configuration including `author`, `freeze: true`, and any common settings.

#### Scenario: Metadata inheritance
- **WHEN** `posts/_metadata.yml` sets `author: "Ishaat Chowdhury"`
- **THEN** all posts under `posts/` inherit that author

### Requirement: Categories (tags) support
Posts SHALL use the Quarto `categories` field in front matter to specify tags. The site SHALL support browsing posts by category.

#### Scenario: Category display on post listing
- **WHEN** a user views the home page listing
- **THEN** each post displays its categories as clickable labels

### Requirement: Standard markdown images
Images in posts SHALL use standard markdown image syntax (`![alt](path)`) with images stored in the same directory as the post's `index.qmd`. The Eleventy `{% image %}` shortcode SHALL NOT be used.

#### Scenario: Image rendering
- **WHEN** a post contains `![Screenshot](screenshot.png)` and `screenshot.png` exists in the post directory
- **THEN** the image renders correctly in the built site

#### Scenario: Post-local image storage
- **WHEN** a post has images
- **THEN** all images reside in the same directory as the post's `index.qmd`

### Requirement: YouTube video embeds
YouTube videos in posts SHALL use Quarto's native `{{< video >}}` shortcode or equivalent. The lite-youtube-embed custom element is acceptable as an alternative if used via raw HTML.

#### Scenario: Video embed renders
- **WHEN** a post contains a YouTube video embed
- **THEN** the video is playable on the rendered page

### Requirement: Code syntax highlighting
Code blocks in posts SHALL be syntax-highlighted using Quarto's native Pandoc-based highlighting. No external syntax highlighting plugins are needed.

#### Scenario: Code block highlighting
- **WHEN** a post contains a fenced code block with a language specifier
- **THEN** the rendered code block has syntax highlighting applied
