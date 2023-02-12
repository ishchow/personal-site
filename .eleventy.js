const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require("html-minifier");
const luxon = require("luxon");
const fs = require("fs");
const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "(min-width: 30em) 50vw, 100vw") {
    let metadata = await Image(src, {
      widths: [300, 600, 900, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./dist/img",
      sharpOptions: {
        animated: true
      }
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    // You bet we throw an error on missing alt in `imageAttributes` (alt="" works okay)
    return Image.generateHTML(metadata, imageAttributes, {
        whitespaceMode: "inline"
      });
  }

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/favicon");
    eleventyConfig.addPassthroughCopy("src/manifest.json");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/admin/config.yml");

    eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
    eleventyConfig.addLayoutAlias("content", "layouts/content.njk");
    eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

    eleventyConfig.addCollection("posts", function (collection) {
        return collection.getFilteredByGlob("src/posts/*.md");
    });

    eleventyConfig.addPlugin(syntaxHighlight);
    eleventyConfig.addPlugin(pluginRss);

    // enable everything
    var markdownit = require("markdown-it")({
        html: true,
        linkify: true,
        typographer: true,
    });

    eleventyConfig.setLibrary("md", markdownit);

    eleventyConfig.addFilter("dateFormat", function (date, format) {
        return luxon.DateTime.fromJSDate(date).setLocale("en").toFormat(format);
    });

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (
            outputPath.endsWith(".html") &&
            process.env.NODE_ENV == "production"
        ) {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified;
        }

        return content;
    });

    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function (err, bs) {
                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync("dist/404.html");
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    // Add 404 http status code in request header.
                    // res.writeHead(404, { "Content-Type": "text/html" });
                    res.writeHead(404);
                    res.end();
                });
            },
        },
    });

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
    eleventyConfig.addNunjucksShortcode("youtube", (videoURL, title) => {
        const url = new URL(videoURL);
        const videoId = url.searchParams.get("v");
        return `
    <iframe class="yt-shortcode" src="https://www.youtube-nocookie.com/embed/${videoId}" title="YouTube video player${
          title ? ` for ${title}` : ""
        }" frameborder="0" allowfullscreen></iframe>
    `;
      });
    eleventyConfig.addNunjucksShortcode("youtubeLite", (videoURL, title = "") => {
        const url = new URL(videoURL);
        const videoId = url.searchParams.get("v");
        return `<lite-youtube videoid="${videoId}" style="background-image: url('https://i.ytimg.com/vi/${videoId}/hqdefault.jpg');" params="autoplay=0"><button type="button" class="lty-playbtn"><span class="lyt-visually-hidden">${title}</span></button></lite-youtube>`;
      });

    return {
        dir: {
            input: "src",
            output: "dist",
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        passthroughFileCopy: true,
    };
};
