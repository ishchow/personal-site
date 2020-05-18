const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
    eleventyConfig.addLayoutAlias("about", "layouts/about.njk");

    eleventyConfig.addCollection("posts", function(collection) {
        return collection.getFilteredByGlob("src/posts/*.md");
    });

    eleventyConfig.setBrowserSyncConfig({
        files: ["dist/assets/css"],
    });

    eleventyConfig.addPlugin(syntaxHighlight);

    // enable everything
    var markdownit = require("markdown-it")({
        html: true,
        linkify: true,
        breaks: true,
        typographer: true,
    });

    eleventyConfig.setLibrary("md", markdownit);

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
