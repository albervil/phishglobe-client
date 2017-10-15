module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output
    devtool: "eval",

    entry: [
       'index.tsx'
    ],
    
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions
        extensions: [".ts", ".tsx", ".js", ".json", ".png"],

        // add 'src' to the modules, so that when you import files you can do so with 'src' as the relative route
        modules: ['src', 'node_modules'],
    },

    // configure the dev server to run
    devServer: {
        port: 3000,
        historyApiFallback: true,
        inline: true
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.(png|jpg|gif)$/, loader: "file-loader"},

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just 
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our 
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};