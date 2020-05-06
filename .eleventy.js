module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/img");

    return {
        dir: {
            input: "src",
            includes: "includes",
            data: "data",
            output: "dist",
            markdownTemplateEngine: "njk",
            htmlTemplateEngine: "njk",
        },
        passthroughFileCopy: true,
    };
};
