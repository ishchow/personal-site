# personal-site

Personal dev blog at [ishaat.ca](https://www.ishaat.ca), built with [Quarto](https://quarto.org/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## License

Contents of this site (blog posts etc.) are licensed under [CC BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/?ref=ccchooser).
Source code used to render and display content is licensed under the [MIT](https://github.com/ishchow/personal-site/blob/master/LICENSE.md).

## Setup

Install [Quarto](https://quarto.org/docs/get-started/) and [mise](https://mise.jdx.dev/), then run the setup script:

```bash
bash scripts/setup.sh
```

This installs mise-managed tools (Python, uv) and project dependencies.

## Dev Server

```bash
quarto preview
```

## Build

```bash
quarto render
```

Output is in `_site/`.

## Resume

The resume is a plain Typst file (`resume.typ`) using the [`basic-resume`](https://typst.app/universe/package/basic-resume/) template. It is compiled to PDF via Quarto's bundled Typst CLI in a `pre-render` step and served as a static file on the site.

```bash
# Compile for deployment (no phone number)
quarto typst compile resume.typ

# Compile locally with phone number
quarto typst compile resume.typ --input phone=XXX-XXX-XXXX
```

The phone number is injected via `sys.inputs` — omitted by default (deployed version), included when passed via `--input` (local version).

## Create a New Post

```bash
mise run new-post "My Post Title"
```

This scaffolds a new post directory with `index.qmd` under `posts/{year}/{NNN}-{slug}/`. Posts are drafts by default.

## Sort BibTeX References

```bash
mise run sort-bib path/to/refs.bib
```

Sorts entries alphabetically by citation key (in-place).
