Personal website created using [Eleventy](https://www.11ty.dev/) and [TailwindCSS](https://tailwindcss.com/).

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

Compile and minify assets using Laravel Mix and then build the pages using Eleventy. Site is contained in _/dist._

```
npm run build
```
