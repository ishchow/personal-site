const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require("html-minifier");
const luxon = require("luxon");
const pluginPWA = require("eleventy-plugin-pwa");
const fs = require("fs");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/img");
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
    eleventyConfig.addPlugin(pluginPWA, {
        clientsClaim: true,
        skipWaiting: true,
    });

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
