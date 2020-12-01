const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
require("dotenv").config();

module.exports = {
    entry: {
        common: path.resolve(__dirname, "src/main-layout/main-layout.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
        publicPath: "/",
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minSize: 0,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                        )[1];
                        return `npm.${packageName.replace("@", "")}`;
                    },
                },
                chunkIds: "deterministic",
            },
        },
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: [/node_modules/],
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: "css-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 150000,
                        },
                    },
                ],
            },
            {
                test: /\.pug$/,
                use: ["pug-loader"],
            },
        ],
    },
    plugins: [
        new webpack.HashedModuleIdsPlugin(),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ["dist"],
        }),
        new HtmlWebpackPlugin({
            filename: "ui-kit/colors/index.html",
            template: "./src/ui-kit/colors/colors.pug",
            chunks: ["common"],
        }),
        new HtmlWebpackPlugin({
            filename: "ui-kit/form-elements/index.html",
            template: "./src/ui-kit/form-elements/form-elements.pug",
            chunks: ["common"],
        }),
        new webpack.DefinePlugin({
            // plugin to define global constants
            API_KEY: JSON.stringify(process.env.API_KEY),
        }),
    ],
    devServer: {
        contentBase: "./src/public",
        port: 3000,
    },
};
