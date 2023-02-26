const path = require("path");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const PugPlugin = require("pug-plugin");

module.exports = {
    entry: {
        // define Pug files here
        index: "./src/index.pug", // => dist/index.html
        searchrooms: "./src/searchrooms.pug", // => dist/searchrooms.html
        rooms: "./src/rooms.pug", // => dist/rooms.html
        uikit: "./src/uikit.pug", // => dist/uikit.html
    },
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "",
    },
    plugins: [
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ["dist"],
                },
            },
        }),
        new PugPlugin({
            pretty: true, // formatting HTML, useful for development mode
            js: {
                // output filename of extracted JS file from source script
                filename: "assets/js/[name].[contenthash:8].js",
            },
            css: {
                // output filename of extracted CSS file from source style
                filename: "assets/css/[name].[contenthash:8].css",
            },
            filename: "[name].[contenthash:8].html",
        }),
    ],

    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader, // Pug loader
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ["css-loader", "sass-loader"],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/fonts/[name].[contenthash:8][ext][query]",
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "assets/images/[name].[contenthash:8][ext][query]",
                },
            },
        ],
    },

    devServer: {
        watchFiles: path.join(__dirname, "src"),
        port: 9000,
    },
};
