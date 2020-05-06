module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/assets/img");

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
