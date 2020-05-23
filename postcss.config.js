const config =  {
    plugins: [require("tailwindcss"), require("autoprefixer")],
};

if (process.env.NODE_ENV === "production") {
    config.plugins.push(require("cssnano"))
}

module.exports = config;
