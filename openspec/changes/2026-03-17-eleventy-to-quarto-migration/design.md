# Design: Migrate ishaat.ca from Eleventy to Quarto

## Context

ishaat.ca is an existing blog with 3 published posts, deployed on Netlify, using Eleventy v0.11 + TailwindCSS v3 + Gulp. The site has giscus comments, responsive images via Eleventy Image, lite-youtube-embed for video, and Netlify CMS for content management. The sister site screechingintothevoid.com has already been built on Quarto + CloudFlare Pages and serves as the reference architecture.

### Existing Content Inventory

| Post | Date | Shortcodes Used | Images | Videos |
|------|------|----------------|--------|--------|
| Eleventy + TailwindCSS = New Site | 2020-05-20 | None | 0 | 0 |
| Introducing nvim-deardiary | 2021-02-07 | None | 0 | 0 |
| My Ultimate Windows 10 Window Management Setup | 2023-02-12 | `{% image %}` ×20, `{% youtubeLite %}` ×5 | 28 files (PNG, GIF) | 5 YouTube |

### Current URL Structure
- Posts: `posts/YYYY/MM/DD/slug/` (e.g., `posts/2020/05/20/eleventy-tailwindcss-new-site/`)
- Feed: `/feed.xml` (Atom)
- Tags: `/tags/`

## Goals

1. Migrate all 3 posts to Quarto `.qmd` format with no content loss
2. Preserve giscus comments (mapped by title, same repository)
3. Establish `posts/{year}/{NNN}-{slug}/` URL structure consistent with screechingintothevoid.com
4. Deploy via GitHub Actions to CloudFlare Pages
5. Redirect all old URLs to their new equivalents
6. Remove all Node.js/Eleventy/TailwindCSS/Gulp tooling

## Non-goals

1. Visual redesign — use Quarto's flatly/darkly theme as-is
2. Custom Quarto extensions or Lua filters
3. Analytics integration
4. Automatic responsive image generation (acceptable loss for simplicity)
5. Netlify CMS replacement — author directly in `.qmd` files

## Decisions

### 1. URL Structure: `posts/{year}/{NNN}-{slug}/`

**Decision**: Match screechingintothevoid.com's convention with year directories and 3-digit zero-padded sequence numbers.

**Rationale**: Consistency across sites. Sequence numbers reset per year (each year starts at 001).

**Alternatives considered**:
- `posts/{slug}/` — simpler but loses temporal organization
- `posts/{year}/{month}/{slug}/` — closer to old structure but inconsistent with sister site

**URL mapping** (old → new):

| Old URL | New URL |
|---------|---------|
| `posts/2020/05/20/eleventy-tailwindcss-new-site/` | `posts/2020/001-eleventy-tailwindcss-new-site/` |
| `posts/2021/02/07/introducing-nvim-deardiary/` | `posts/2021/001-introducing-nvim-deardiary/` |
| `posts/2023/02/12/my-ultimate-windows-10-window-management-setup/` | `posts/2023/001-my-ultimate-windows-10-window-management-setup/` |

### 2. Image Handling: Standard Markdown Images

**Decision**: Replace `{% image "path", "alt" %}` shortcode with standard markdown `![alt](filename)` syntax. Move images from `src/assets/media/` into each post's directory.

**Rationale**: Quarto renders standard markdown images natively. Storing images alongside the post simplifies the content structure — no global media directory.

**Trade-off**: Lose automatic WebP generation and responsive srcset that Eleventy Image provided. Given the site's traffic and purpose, this is acceptable. Images can be manually optimized if needed.

**Migration steps for Post 3**:
1. Copy 28 image files from `src/assets/media/win10wmsetup-*.{png,gif}` into `posts/2023/001-my-ultimate-windows-10-window-management-setup/`
2. Replace `{% image "./src/assets/media/filename.png", "alt text" %}` with `![alt text](filename.png)`

### 3. YouTube Embeds: Quarto Video Shortcode

**Decision**: Replace `{% youtubeLite "url", "title" %}` with Quarto's native `{{< video url >}}` shortcode.

**Rationale**: Quarto has built-in video embed support. Using the native shortcode avoids custom JS/CSS dependencies (lite-youtube-embed).

**Trade-off**: Lose the lazy-loading behavior of lite-youtube-embed. The Quarto video shortcode uses standard iframes. This is acceptable for 5 video embeds.

**Alternatives considered**:
- Raw HTML `<lite-youtube>` elements — would require bundling JS/CSS manually
- Raw HTML `<iframe>` — works but Quarto shortcode is cleaner

### 4. Giscus: Quarto Native Integration

**Decision**: Configure giscus in `_quarto.yml` using Quarto's built-in `comments` config.

**Rationale**: Quarto has first-class giscus support. The configuration maps directly from the existing script tag attributes.

**Configuration**:
```yaml
comments:
  giscus:
    repo: ishchow/personal-site
    repo-id: MDEwOlJlcG9zaXRvcnkyNjE2NTU2ODI=
    category: "Post Comments"
    category-id: DIC_kwDOD5iMgs4CAmWd
    mapping: title
    reactions-enabled: false
    theme: dark_high_contrast
```

**Comment preservation**: Since giscus maps by post title and the repository is unchanged, existing GitHub Discussions (comments) will automatically appear on the migrated posts as long as titles remain the same.

### 5. Tags → Quarto Categories

**Decision**: Map Eleventy `tags` to Quarto `categories` in post front matter.

**Rationale**: Quarto uses `categories` for post classification with built-in listing and filtering support.

**Example**:
```yaml
# Old (Eleventy)
tags:
  - neovim
  - lua
  - nvim-deardiary

# New (Quarto)
categories:
  - neovim
  - lua
  - nvim-deardiary
```

### 6. Nunjucks Template Variables → Plain Text

**Decision**: Replace all Nunjucks template variables (`{{ site.eleventy.url }}`, etc.) with plain URLs or text.

**Rationale**: Quarto uses Pandoc markdown, not Nunjucks. Template variables must be inlined.

**Affected content** (Post 1 only):
- `{{ site.eleventy.url }}` → `https://www.11ty.dev/`
- `{{ site.tailwindcss.url }}` → `https://tailwindcss.com/`

### 7. Deployment: GitHub Actions + CloudFlare Pages

**Decision**: Use the same deployment pattern as screechingintothevoid.com — GitHub Actions workflow with `quarto-dev/quarto-actions/setup` and `cloudflare/pages-action`.

**Rationale**: Proven pattern, already working on the sister site. GitHub Actions provides full control over the build (unlike CloudFlare's built-in build which has limited Quarto support).

### 8. DNS: Nameserver Change Only

**Decision**: Change nameservers at Porkbun to point to CloudFlare. Do NOT transfer the domain registration.

**Rationale**: CloudFlare DNS provides the redirect rules and CDN features needed. Domain transfer is unnecessary and adds risk.

### 9. CloudFlare Bulk Redirects for Legacy URLs

**Decision**: Use CloudFlare Bulk Redirects to handle old → new URL mapping. Create a redirect list with all 3 post redirects plus feed/tags redirects.

**Rationale**: Infrastructure-level redirects are faster and don't require application code. CloudFlare Bulk Redirects support up to 20,000 rules in the free tier.

**Redirect list**:
| Source URL | Target URL | Status |
|------------|------------|--------|
| `/posts/2020/05/20/eleventy-tailwindcss-new-site/` | `/posts/2020/001-eleventy-tailwindcss-new-site/` | 301 |
| `/posts/2021/02/07/introducing-nvim-deardiary/` | `/posts/2021/001-introducing-nvim-deardiary/` | 301 |
| `/posts/2023/02/12/my-ultimate-windows-10-window-management-setup/` | `/posts/2023/001-my-ultimate-windows-10-window-management-setup/` | 301 |
| `/feed.xml` | `/index.xml` | 301 |

### 10. Drop Netlify CMS

**Decision**: Remove the `src/admin/` directory and Netlify CMS configuration entirely.

**Rationale**: Moving away from Netlify and the Node ecosystem. Author posts directly as `.qmd` files using `mise run new-post`.

## Risks

### 1. Giscus theme mismatch
The current giscus config uses `dark_high_contrast` theme. The new Quarto site has light/dark mode toggle. Giscus may look odd in light mode. Quarto's giscus integration supports `preferred_color_scheme` or `light`/`dark` theme options that auto-switch.

**Mitigation**: Test giscus theme options during implementation. Use `preferred_color_scheme` if available, or accept a fixed dark theme.

### 2. Image quality degradation
Losing Eleventy Image's automatic WebP generation and responsive srcsets means larger image payloads, especially for Post 3's 28 images.

**Mitigation**: Manually optimize large PNGs/GIFs before migration if needed. The site's traffic is low enough that this is unlikely to be an issue.

### 3. DNS propagation delay
Changing nameservers at Porkbun takes up to 48 hours to propagate globally.

**Mitigation**: Configure CloudFlare DNS records before changing nameservers. Run both Netlify and CloudFlare deployments in parallel during the transition period.

### 4. Broken external links
External sites or search engines linking to old URLs will receive 301 redirects, which is correct. However, some crawlers may take time to update their indexes.

**Mitigation**: 301 redirects are the industry standard for URL changes. Search engines will eventually update.
