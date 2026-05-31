# Overview

Source code for [ishaat.ca](https://www.ishaat.ca/).
Built with [soupault](https://soupault.net/).
Hosted on Cloudflare Pages.
Deployed using GitHub Actions.

# Setup

Install [mise](https://mise.jdx.dev/). Then run the following to setup dependencies.

```bash
mise install
```

# Dev Server

```bash
mise serve
```

# Build

```bash
mise build
```

Output is in `build/`.

# Resume

The resume is a plain Typst file (`site/resume.typ`) using the [`basic-resume`](https://typst.app/universe/package/basic-resume/) template. During site builds, soupault compiles it to PDF automatically via its typst asset processor.

To compile the resume standalone:

```bash
# Without phone number (same as deployed version)
mise run resume

# With phone number (local use)
mise run resume --phone=XXX-XXX-XXXX
```

The phone number is injected via Typst's `sys.inputs` — omitted by default, included when passed via `--phone`.

# Adding New Posts

`mise run new-post "Title"`

# CI/CD

See `.github/workflows/publish.yml` for the CI/CD configuration.
