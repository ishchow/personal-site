const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const htmlmin = require("html-minifier");
const luxon = require("luxon");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
    eleventyConfig.addLayoutAlias("about", "layouts/about.njk");
    eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("src/posts/*.md");
    });

    eleventyConfig.setBrowserSyncConfig({
        files: ["dist/assets/css"],
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

    eleventyConfig.addFilter("dateFormat", function(date, format) {
        return luxon.DateTime.fromJSDate(date)
            .setLocale("en")
            .toFormat(format);
    });

    eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
        if (outputPath.endsWith(".html") && process.env.NODE_ENV == "production") {
            let minified = htmlmin.minify(content, {
                useShortDoctype: true,
                removeComments: true,
                collapseWhitespace: true,
            });
            return minified;
        }

        return content;
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
