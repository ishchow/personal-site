# Proposal: Migrate ishaat.ca from Eleventy to Quarto

## Why

ishaat.ca is a personal dev blog built with Eleventy v0.11, TailwindCSS v3, Gulp, and deployed to Netlify with the domain on Porkbun. The current setup has several pain points:

1. **Tooling overhead**: Too much time is spent fixing formatting, managing the build pipeline (Gulp + PostCSS + TailwindCSS), and dealing with Eleventy configuration rather than writing content.
2. **Ecosystem churn**: The Node.js ecosystem moves fast — Eleventy is on v0.11 (now multiple major versions behind), TailwindCSS has had breaking changes, and dependency maintenance is a constant burden.
3. **Consistency**: The sister site screechingintothevoid.com already runs on Quarto + Cloudflare Pages with a clean, proven setup. Aligning ishaat.ca with the same stack reduces cognitive overhead.
4. **Simplicity**: Quarto provides a single CLI for authoring and rendering, built-in syntax highlighting, RSS, sitemap, and theme support — replacing an entire toolchain of Eleventy + Gulp + PostCSS + TailwindCSS + plugins.

## What Changes

This change migrates the entire platform:

### Static Site Generator: Eleventy → Quarto
- Replace `.md` posts + Nunjucks templates with `.qmd` posts + Quarto configuration
- Replace TailwindCSS with Quarto's built-in flatly/darkly theme
- Replace Gulp CSS/JS pipeline with Quarto's native asset handling
- Replace custom Eleventy shortcodes (`{% image %}`, `{% youtubeLite %}`) with standard markdown images and Quarto video shortcodes
- Replace Nunjucks template variables with plain URLs
- Preserve giscus comments via Quarto's native giscus integration
- Map Eleventy tags to Quarto categories

### Hosting: Netlify → CloudFlare Pages
- Replace Netlify deployment with GitHub Actions + CloudFlare Pages
- Remove `netlify.toml` and Netlify CMS configuration
- Set up PR preview deploys on CloudFlare Pages

### DNS: Porkbun → CloudFlare
- Change nameservers at Porkbun to point to CloudFlare
- Recreate DNS records in CloudFlare

### URL Redirects
- Configure CloudFlare Bulk Redirects for old URLs (`posts/YYYY/MM/DD/slug/`) → new URLs (`posts/YYYY/NNN-slug/`)
- Redirect old feed URL (`/feed.xml`) → new feed URL (`/index.xml`)

## Capabilities

### New Specs
- **quarto-scaffold** — Quarto project config, theme, navbar, footer, about page, 404 page
- **content-structure** — Post directory layout, front matter schema, categories, image/video handling
- **comments-system** — Giscus integration via Quarto native config
- **deployment-pipeline** — GitHub Actions CI/CD to CloudFlare Pages
- **cloudflare-hosting** — CloudFlare Pages project and custom domain setup
- **domain-migration** — DNS migration from Porkbun to CloudFlare
- **url-redirects** — CloudFlare redirect rules for legacy URLs
- **rss-sitemap** — RSS feed and sitemap generation
- **post-authoring** — mise task for scaffolding new posts
- **copilot-instructions** — AI context documentation

## Non-goals

- **Custom Quarto extensions**: No custom Lua filters or shortcode extensions. Use only built-in Quarto features and standard markdown.
- **Analytics**: No analytics integration (can be added later as a separate change).
- **Search functionality**: Rely on Quarto's built-in search; no custom search implementation.
- **Domain transfer**: The domain stays registered at Porkbun. Only DNS management moves to CloudFlare.
- **Redesign**: The migration aims for functional parity with improved simplicity, not a visual redesign.
- **Automatic WebP generation**: Quarto does not auto-generate responsive image variants like Eleventy Image. Images will be served as-is. This is an acceptable trade-off for simplicity.

## Impact

- **Files removed**: All Eleventy/Node files (`.eleventy.js`, `gulpfile.js`, `package.json`, `package-lock.json`, `tailwind.config.js`, `postcss.config.js`, `.nvmrc`, `netlify.toml`, `src/` directory)
- **Files added**: `_quarto.yml`, `index.qmd`, `about.qmd`, `404.qmd`, `styles.css`, `mise.toml`, `posts/_metadata.yml`, 3 migrated post directories, `.github/workflows/publish.yml`, `.github/copilot-instructions.md`
- **Services affected**: Netlify (decommission), CloudFlare Pages (new), CloudFlare DNS (new), Porkbun (nameserver change)
- **External integrations**: Giscus (preserved, no changes needed)
