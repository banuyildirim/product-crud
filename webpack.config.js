const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');


const MODE = process.env.WEBPACK_ENV;
const ENTRY_FILE = path.resolve(__dirname, "src", "index.js");
const OUTPUT_DIR = path.join(__dirname, "dist");

const config = {
    mode: MODE,
    entry: {
        app: ["@babel/polyfill", ENTRY_FILE],
        style: path.resolve(__dirname, "public", "css", "main.css"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html",
            // favicon: 'public/favicon.ico'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new webpack.ProvidePlugin({
            "React": "react",
         }),
    ],
    output: {
        path: OUTPUT_DIR,
        filename: "bundle.[hash].js",
    },
    devServer: {
        host: "localhost",
        port: 4000,
        open: true
    },
};

module.exports = config;