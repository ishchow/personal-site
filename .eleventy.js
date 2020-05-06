module.exports = function (eleventyConfig) {
    // Add a filter using the Config API
    eleventyConfig.addFilter("myFilter", function () {});

    // You can return your Config object (optional).
    return {
        dir: {
            input: "src",
            includes: "includes",
            data: "data",
            output: "dist",
            markdownTemplateEngine: "njk",
            htmlTemplateEngine: "njk",
        },
    };
};
