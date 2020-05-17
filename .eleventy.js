module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/img");
    eleventyConfig.addLayoutAlias("base", "layouts/base.njk");
    eleventyConfig.addLayoutAlias("about", "layouts/about.njk");

    eleventyConfig.setBrowserSyncConfig({
        files: ["dist/assets/css"],
    });

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
