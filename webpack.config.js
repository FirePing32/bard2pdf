const webpack = require("webpack")
const path = require("path");

module.exports = (env) => {
    return {
        mode: "none",
        output: {
            publicPath: "",
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
        plugins: [
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            }),
        ],
    };
};
