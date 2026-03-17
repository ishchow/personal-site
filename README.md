# personal-site

Personal dev blog at [ishaat.ca](https://www.ishaat.ca), built with [Quarto](https://quarto.org/) and deployed to [Cloudflare Pages](https://pages.cloudflare.com/).

## License

Contents of this site (blog posts etc.) are licensed under [CC BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/?ref=ccchooser).
Source code used to render and display content is licensed under the [MIT](https://github.com/ishchow/personal-site/blob/master/LICENSE.md).

## Setup

Install [Quarto](https://quarto.org/docs/get-started/) and [mise](https://mise.jdx.dev/).

## Dev Server

```bash
quarto preview
```

## Build

```bash
quarto render
```

Output is in `_site/`.

## Create a New Post

```bash
mise run new-post "My Post Title"
```

This scaffolds a new post directory with `index.qmd` under `posts/{year}/{NNN}-{slug}/`. Posts are drafts by default.
