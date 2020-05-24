[![Netlify Status](https://api.netlify.com/api/v1/badges/bee5f1ec-679a-4295-a2e7-393917a5b839/deploy-status)](https://app.netlify.com/sites/goofy-engelbart-408c80/deploys)

Personal website created using [Eleventy](https://www.11ty.dev/) and [TailwindCSS](https://tailwindcss.com/). Hosted on [Netlify](https://www.netlify.com).

# License

Contents of this site (blog posts etc.) are licensed under [CC BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/?ref=ccchooser).
Source code used to render and display content is licensed under the [MIT](https://github.com/ishchow/personal-site/blob/master/LICENSE.md).

# Setup Dependencies

Install the latest LTS release of [NodeJS](https://nodejs.org/en/). Then install the required node packages:

```
npm install
```

# Start Dev Server

Compile assets using Laravel Mix then build and serve the static website using Eleventy. The local site can be found in [localhost:8080](localhost:8080). Site is contained in _/dist_. 

```
npm run dev
```

# Run production builds

Compile and minify assets using gulp and then build the pages using Eleventy. Site is contained in _/dist._

```
npm run build
```

# Clean site folder

Remove _/dist_ folder containing site. This is done automatically before production builds.

```
npm run clean
```

# Create a new post

Create a new Markdown file for new post based on a given title and current date. Filename is automatically formatted based on current date and slugified title. Front matter variables are automatically generated.

```
npm run newpost -- --title="Post Title"
```

# Run lighthouse

Run [lighthouse](https://www.npmjs.com/package/lighthouse) and view the report in your browser. Useful for checking performance, accessibility, seo compliance, and PWA compliance.

```
npx run lighthouse https://www.ishaat.ca --view
```
