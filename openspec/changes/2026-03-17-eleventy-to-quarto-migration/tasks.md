# Tasks: Migrate ishaat.ca from Eleventy to Quarto

## Quarto Project Setup

- [ ] Create `_quarto.yml` with website config (title: "Ishaat Chowdhury", site-url, flatly/darkly theme, navbar with About/Tags/RSS/search, footer with copyright + social links, open-graph, twitter-card, giscus comments config, styles.css reference)
- [ ] Create `styles.css` (empty or minimal custom overrides)
- [ ] Create `index.qmd` as listing page (type: default, contents: `posts/**/index.qmd`, sort by date descending, categories enabled, feed generation enabled at `index.xml`)
- [ ] Create `about.qmd` with bio, tech stack description, and license info (CC BY-NC-4.0 for content, MIT for source)
- [ ] Create `404.qmd` with user-friendly not-found message and navigation links
- [ ] Create `posts/_metadata.yml` with shared config (`author: "Ishaat Chowdhury"`, `freeze: true`)
- [ ] Create `.gitignore` for Quarto artifacts (`_site/`, `_freeze/`, `.quarto/`)

## Content Migration — Post 1: Eleventy + TailwindCSS = New Site

- [ ] Create `posts/2020/001-eleventy-tailwindcss-new-site/index.qmd`
- [ ] Convert front matter: set `title`, `date: 2020-05-20`, `description`, `categories: [ssg, eleventy, tailwindcss]`
- [ ] Replace Nunjucks template variable `{{ site.eleventy.url }}` with `https://www.11ty.dev/`
- [ ] Replace Nunjucks template variable `{{ site.tailwindcss.url }}` with `https://tailwindcss.com/`
- [ ] Verify no other Nunjucks syntax remains

## Content Migration — Post 2: Introducing nvim-deardiary

- [ ] Create `posts/2021/001-introducing-nvim-deardiary/index.qmd`
- [ ] Convert front matter: set `title`, `date: 2021-02-07`, `description` (add one — original had none), `categories: [neovim, lua, nvim-deardiary]`
- [ ] Verify markdown content renders correctly (no shortcodes in this post)

## Content Migration — Post 3: My Ultimate Windows 10 Window Management Setup

- [ ] Create `posts/2023/001-my-ultimate-windows-10-window-management-setup/` directory
- [ ] Copy 28 image files from `src/assets/media/win10wmsetup-*` into the post directory
- [ ] Create `index.qmd` with front matter: `title`, `date: 2023-02-12`, `description`, `categories: [Windows, FancyWM, Kanata]`
- [ ] Replace all 20 `{% image "./src/assets/media/filename", "alt" %}` shortcodes with `![alt](filename)`
- [ ] Replace all 5 `{% youtubeLite "url", "title" %}` shortcodes with Quarto `{{< video url >}}` shortcodes
- [ ] Remove commented-out markdown image lines (e.g., `<!-- ![](filename) -->`)
- [ ] Verify all images render correctly
- [ ] Verify all YouTube embeds render correctly

## Post Authoring Tooling

- [ ] Create `mise.toml` with `new-post` task (bash script matching screechingintothevoid.com pattern: auto-detect year, sequence number, slugify title, scaffold `index.qmd` + empty `refs.bib`)
- [ ] Test `mise run new-post "Test Post"` creates correct directory and files

## Deployment Pipeline

- [ ] Create `.github/workflows/publish.yml` (trigger on push to main + pull_request, install Quarto, render, deploy to CloudFlare Pages)
- [ ] Configure GitHub repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- [ ] Create CloudFlare Pages project for ishaat.ca

## Copilot Instructions

- [ ] Create `.github/copilot-instructions.md` documenting tech stack, directory structure, deployment pipeline, post creation workflow, conventions, and migration context

## CloudFlare Hosting Setup

- [ ] Create CloudFlare Pages project (direct upload via GitHub Actions)
- [ ] Add custom domain `www.ishaat.ca` to CloudFlare Pages project
- [ ] Configure apex domain redirect (`ishaat.ca` → `www.ishaat.ca`)
- [ ] Verify site is accessible at CloudFlare Pages default URL

## DNS Migration (Porkbun → CloudFlare)

- [ ] Add `ishaat.ca` zone to CloudFlare account
- [ ] Export existing DNS records from Porkbun
- [ ] Import/recreate DNS records in CloudFlare (A/AAAA/CNAME for website, MX/TXT for email if applicable)
- [ ] Verify CloudFlare DNS records match Porkbun records
- [ ] Change nameservers at Porkbun to CloudFlare's assigned nameservers
- [ ] Wait for DNS propagation (up to 48 hours)
- [ ] Verify domain resolves via CloudFlare

## URL Redirects

- [ ] Create CloudFlare Bulk Redirect list for ishaat.ca
- [ ] Add redirect: `/posts/2020/05/20/eleventy-tailwindcss-new-site/` → `/posts/2020/001-eleventy-tailwindcss-new-site/` (301)
- [ ] Add redirect: `/posts/2021/02/07/introducing-nvim-deardiary/` → `/posts/2021/001-introducing-nvim-deardiary/` (301)
- [ ] Add redirect: `/posts/2023/02/12/my-ultimate-windows-10-window-management-setup/` → `/posts/2023/001-my-ultimate-windows-10-window-management-setup/` (301)
- [ ] Add redirect: `/feed.xml` → `/index.xml` (301)
- [ ] Create Bulk Redirect Rule linked to the redirect list
- [ ] Verify all redirects work correctly

## Cleanup

- [ ] Remove `.eleventy.js`
- [ ] Remove `gulpfile.js`
- [ ] Remove `package.json` and `package-lock.json`
- [ ] Remove `tailwind.config.js` and `postcss.config.js`
- [ ] Remove `.nvmrc`
- [ ] Remove `.eleventyignore`
- [ ] Remove `netlify.toml`
- [ ] Remove `src/` directory entirely (all content migrated to root-level Quarto structure)
- [ ] Remove `scripts/` directory (replaced by mise task)
- [ ] Update `README.md` to reflect new Quarto-based project
- [ ] Update `.gitignore` for Quarto instead of Eleventy/Node

## Verification

- [ ] Run `quarto render` locally and verify all pages render without errors
- [ ] Verify home page lists all 3 posts with correct titles, dates, and categories
- [ ] Verify each post renders correctly (text, images, videos, code blocks)
- [ ] Verify giscus comments load on post pages
- [ ] Verify about page renders correctly
- [ ] Verify 404 page renders correctly
- [ ] Verify RSS feed at `/index.xml` contains all 3 posts
- [ ] Verify sitemap at `/sitemap.xml` contains all pages
- [ ] Verify theme toggle works (light/dark)
- [ ] Push to GitHub and verify GitHub Actions workflow deploys successfully
- [ ] Verify site is accessible at `https://www.ishaat.ca`
- [ ] Verify all 3 old post URLs redirect correctly (301)
- [ ] Verify `/feed.xml` redirects to `/index.xml`
- [ ] Verify giscus comments appear on migrated posts (same discussions as before)
