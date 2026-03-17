## Purpose

Define the post authoring workflow for ishaat.ca including the mise scaffolding task, shared metadata, and branch naming conventions.

## Requirements

### Requirement: mise new-post task
The project SHALL include a mise task named `new-post` that scaffolds a new blog post directory with boilerplate files. The task SHALL be defined in `mise.toml` at the project root.

#### Scenario: Scaffold a new post
- **WHEN** a user runs `mise run new-post "My Post Title"`
- **THEN** a new directory is created at `posts/{current_year}/{next_seq}-{slugified_title}/` containing `index.qmd` and an empty `refs.bib`

### Requirement: Auto-detect year and sequence number
The task SHALL automatically determine the current year and the next available 3-digit zero-padded sequence number within that year's directory.

#### Scenario: First post of the year
- **WHEN** no posts exist for the current year
- **THEN** the sequence number is `001`

#### Scenario: Subsequent posts
- **WHEN** posts `001-first` and `002-second` exist for the current year
- **THEN** the next sequence number is `003`

### Requirement: Title slugification
The task SHALL convert the provided title to a URL-friendly slug: lowercase, spaces replaced with hyphens, non-alphanumeric characters (except hyphens) removed.

#### Scenario: Title with special characters
- **WHEN** the user runs `mise run new-post "The Old Man & the Sea: A Review"`
- **THEN** the slug is a reasonable URL-friendly string with special characters removed

### Requirement: Generated index.qmd front matter
The generated `index.qmd` SHALL contain YAML front matter with: `title` (from input), `date` (today's date in YYYY-MM-DD format), `description` (empty string), and `draft: true`. The template SHALL NOT include `author` field — author is inherited from `posts/_metadata.yml`.

#### Scenario: Front matter content
- **WHEN** a post is scaffolded with title "My Post"
- **THEN** the `index.qmd` contains front matter with the title set to "My Post", today's date, an empty description, and draft set to `true`

#### Scenario: No author in scaffolded post
- **WHEN** a new post is scaffolded
- **THEN** the generated `index.qmd` front matter does not contain an `author` line

### Requirement: Output confirmation
The task SHALL print the path of the created post directory after successful scaffolding.

#### Scenario: Success message
- **WHEN** a post is successfully scaffolded
- **THEN** the task prints the path to the created `index.qmd` file

### Requirement: No external runtime dependencies
The task SHALL be implemented in pure bash with no dependency on Python, Node.js, or other runtimes beyond standard POSIX utilities and bash.

#### Scenario: Runs without Python or Node
- **WHEN** the task is executed on a system without Python or Node.js installed
- **THEN** the task completes successfully using only bash and standard POSIX utilities

### Requirement: Author centralized in shared metadata
The `posts/_metadata.yml` file SHALL include `author: "Ishaat Chowdhury"` so all posts inherit the author automatically.

#### Scenario: Author inherited by posts
- **WHEN** a post does not specify an `author` in its front matter
- **THEN** the rendered post displays "Ishaat Chowdhury" as the author

### Requirement: Branch naming convention
New post branches SHALL be named `{year}-{seq}` (e.g., `2026-002`), always created from `main`.

#### Scenario: Branch created from main
- **WHEN** starting work on a new post
- **THEN** a branch named `{year}-{NNN}` is created from `main`
