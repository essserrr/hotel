const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
require("dotenv").config();

module.exports = {
    entry: {
        mainLayout: path.resolve(
            __dirname,
            "src/components/main-layout/main-layout.js"
        ),
        demoLayout: path.resolve(
            __dirname,
            "src/components/ui-kit-demostartion-layout/ui-kit-demostartion-layout.js"
        ),
        colorsPage: path.resolve(
            __dirname,
            "src/pages/colors-page/colors-page.js"
        ),
        formsPage: path.resolve(
            __dirname,
            "src/pages/form-elements-page/form-elements-page.js"
        ),
        cardsPage: path.resolve(
            __dirname,
            "src/pages/cards-page/cards-page.js"
        ),
        searchPage: path.resolve(
            __dirname,
            "src/pages/search-page/search-page.js"
        ),
        headerFooterPage: path.resolve(
            __dirname,
            "src/pages/header-footer-page/header-footer-page.js"
        ),
        landingPage: path.resolve(
            __dirname,
            "src/pages/landing-page/landing-page.js"
        ),
        authPage: path.resolve(__dirname, "src/pages/login-page/login-page.js"),
        roomPage: path.resolve(__dirname, "src/pages/room-page/room-page.js"),
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
            filename: "pages/colors/index.html",
            template: "./src/pages/colors-page/colors-page.pug",
            chunks: ["mainLayout", "demoLayout", "colorsPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "pages/form/index.html",
            template: "./src/pages/form-elements-page/form-elements-page.pug",
            chunks: ["mainLayout", "demoLayout", "formsPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "pages/cards/index.html",
            template: "./src/pages/cards-page/cards-page.pug",
            chunks: ["mainLayout", "demoLayout", "cardsPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "pages/header-footer/index.html",
            template: "./src/pages/header-footer-page/header-footer-page.pug",
            chunks: ["mainLayout", "demoLayout", "headerFooterPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/pages/landing-page/landing-page.pug",
            chunks: ["mainLayout", "landingPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "search/index.html",
            template: "./src/pages/search-page/search-page.pug",
            chunks: ["mainLayout", "searchPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "room/index.html",
            template: "./src/pages/room-page/room-page.pug",
            chunks: ["mainLayout", "roomPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "login/index.html",
            template: "./src/pages/login-page/login-page.pug",
            chunks: ["mainLayout", "authPage"],
        }),
        new HtmlWebpackPlugin({
            filename: "reg/index.html",
            template: "./src/pages/reg-page/reg-page.pug",
            chunks: ["mainLayout", "authPage"],
        }),
    ],
    devServer: {
        contentBase: "./src/public",
        port: 3000,
    },
};
