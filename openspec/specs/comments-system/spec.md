## Purpose

Define giscus (GitHub Discussions-based) comment integration for blog posts on ishaat.ca, configured via Quarto's native comments support.

## Requirements

### Requirement: Giscus comment system
The site SHALL use Giscus (GitHub Discussions-based comments) on blog post pages. Comments SHALL be configured via Quarto's native `comments` configuration in `_quarto.yml`.

#### Scenario: Comments appear on posts
- **WHEN** a user views a published blog post
- **THEN** a Giscus comment widget is displayed below the post content

#### Scenario: Comments do not appear on non-post pages
- **WHEN** a user views the about page, home page, or tags page
- **THEN** no Giscus comment widget is displayed

### Requirement: Giscus configuration
Giscus SHALL be configured with the following settings:
- Repository: `ishchow/personal-site`
- Category: "Post Comments"
- Mapping: `title` (comments are mapped to posts by their title)
- Reactions: disabled
- Theme: `dark_high_contrast`

#### Scenario: Comments mapped by title
- **WHEN** a user leaves a comment on a post titled "My Post"
- **THEN** the comment is stored in a GitHub Discussion titled "My Post" in the "Post Comments" category

#### Scenario: Comment theme
- **WHEN** the Giscus widget loads
- **THEN** it uses the `dark_high_contrast` theme (or a theme that respects the site's light/dark mode)

### Requirement: Preserve existing discussions
The migration SHALL preserve existing Giscus discussions from the Eleventy site. Since Giscus maps by post title and the repository remains the same, existing comments SHALL continue to appear on migrated posts.

#### Scenario: Existing comments visible after migration
- **WHEN** a post that had comments on the old site is viewed on the new Quarto site
- **THEN** the existing Giscus comments are visible (assuming the post title is unchanged)
