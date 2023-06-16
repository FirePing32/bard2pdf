const path = require("path");

module.exports = (env) => {
    return {
        mode: "development",
        entry: {
            "./chrome/bard2pdf": "./src/chrome/js/content-main.bard2pdf.js",
        },
        output: {
            path: __dirname + "/dist",
            filename: "[name].js",
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: [path.resolve(__dirname, "src/chrome/js")],
                    exclude: [path.resolve(__dirname, "node_modules")],
                    loader: "babel-loader",
                },
            ],
        },
    };
};
