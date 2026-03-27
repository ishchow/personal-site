# Ishaat Chowdhury — Personal Dev Blog

A personal dev blog at [ishaat.ca](https://www.ishaat.ca), built for writing about tools, workflows, and projects.

## Tech Stack

- **Quarto** — Static site generator (`.qmd` files → HTML)
- **Typst** — Resume typesetting (bundled with Quarto, no separate install)
- **GitHub Actions** — CI/CD (`.github/workflows/publish.yml`)
- **CloudFlare Pages** — Hosting and CDN

## Directory Structure

```
posts/
├── _metadata.yml          # Shared metadata (author, freeze)
└── {year}/
    └── {NNN}-{slug}/
        ├── index.qmd      # Post content
        └── *.png/gif       # Co-located images (if any)
```

- `{year}` — Four-digit year (e.g., `2023`)
- `{NNN}` — Three-digit zero-padded sequence number (e.g., `001`)
- `{slug}` — Slugified title (e.g., `my-post-title`)
- URLs follow the filesystem path: `/posts/2023/001-my-post-title/`

## Deployment Pipeline

1. Push to `main` or open a PR triggers `.github/workflows/publish.yml`
2. GitHub Actions installs Quarto, renders the site, deploys `_site/` to CloudFlare Pages
3. PRs get preview deploys; pushes to `main` deploy to production

## Creating a New Post

Use the mise task runner:

```bash
mise run new-post "My Post Title"
```

This scaffolds `posts/{year}/{NNN}-{slug}/index.qmd`. Posts are created as **drafts by default** — set `draft: false` in the front matter when ready to publish.

### Branch Naming Convention

New post branches are named `{year}-{NNN}` (e.g., `2026-002`), always created from `main`.

## Key Conventions

- **Author**: Set globally in `posts/_metadata.yml`. Do not add `author` to individual post front matter unless overriding.
- **Categories**: Use the `categories` field in front matter for tagging posts.
- **Homepage listing**: Default format showing date, title, description, and categories.
- **Description field**: Every post should have a `description` in its front matter — this powers Open Graph and RSS previews.
- **Freeze**: Enabled in `posts/_metadata.yml`. Quarto caches rendered output to avoid re-executing computational content.
- **Images**: Co-locate images in the post directory and reference with `![alt](filename)`.
- **Videos**: Use Quarto's built-in video shortcode: `{{< video https://youtube.com/watch?v=ID >}}`.
- **Comments**: Giscus is configured globally in `_quarto.yml` (mapped by post title).

## Migration Context

This site was migrated from Eleventy + TailwindCSS + Netlify to Quarto + CloudFlare Pages in March 2026.
Old URLs (`/posts/YYYY/MM/DD/slug/`) are redirected to new URLs (`/posts/YYYY/NNN-slug/`) via CloudFlare Bulk Redirect rules.

## Resume

The resume lives at `resume.typ` (project root) — a plain Typst file using the [`basic-resume`](https://typst.app/universe/package/basic-resume/) template (pinned to `0.2.3` for Typst 0.11 compatibility with Quarto 1.6.x).

### How it integrates with the site

- **Pre-render**: `quarto typst compile resume.typ` runs before `quarto render` (configured in `_quarto.yml` under `project.pre-render`)
- **Resources**: `resume.pdf` is listed in `project.resources` so it copies into `_site/`
- **Navbar**: Links directly to `resume.pdf` (no HTML resume page)
- **CI/CD**: No extra workflow steps — Quarto bundles Typst, and `pre-render` runs automatically
- **`.gitignore`**: `resume.pdf` is a build artifact and is gitignored

### Phone number handling

The phone number is conditionally included via Typst's `sys.inputs`:

```bash
# Deployed version (no phone)
quarto typst compile resume.typ

# Local version (with phone)
quarto typst compile resume.typ --input phone=XXX-XXX-XXXX
```

The `pre-render` step in `_quarto.yml` compiles without the flag, so the deployed PDF omits the phone number.
