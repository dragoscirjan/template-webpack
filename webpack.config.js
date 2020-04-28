// const CleanPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const Jarvis = require('webpack-jarvis');

module.exports = ({mode = 'development'}) => {
  const config = {
    // context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    devServer: {
      compress: true, // enable gzip compression
      contentBase: path.join(__dirname, 'dist'), // boolean | string | array, static file location
      filename: 'index.html',
      hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
      https: false, // true for self-signed, object for cert authority
      noInfo: true, // only errors & warns on hot reload
      port: 9000,
    },
    devtool: 'source-map', // enum; enhance debugging by adding meta info for the browser devtools
    entry: './src', // string; points where to start the application bundling process
    // entry: { // object; one entry point per HTML page. SPA: one entry point, MPA: multiple entry points.
    //   home: './home.js',
    //   about: './about.js',
    //   contact: './contact.js'
    // },
    mode, // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    module: {
      // configuration regarding modules
      rules: [
        // rules for modules (configure loaders, parser options, etc.)
        {
          // load babel (jsx?) files
          exclude: /(node_modules|bower_components)/,
          test: /\.m?jsx?$/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          // load typescript (tsx?) filex
          exclude: /node_modules/,
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader'],
        },
        {
          // load simple css files
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          // load SCSS or SASS files
          test: /\.s(c|a)ss$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        },
        {
          // load static files
          test: /\.(if|jp(e*)g|png)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 20000, // Convert images < 8kb to base64 strings
                name: 'img/[hash]-[name].[ext]',
              },
            },
          ],
        },
        {
          // load fonts
          test: /\.(eot|ttf|woff)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[contenthash].[ext]',
          },
        },
      ],
    },
    output: {
      // options related to how webpack emits results
      // filename: '[name].[chunkhash].js', // string; the filename template for entry chunks
      filename: '[name].[hash].js', // string; the filename template for entry chunks
      chunkFilename: '[name].[chunkhash].js', // string; the filename template for entry chunks
      // publicPath: '/assets/', // string; the url to the output directory resolved relative to the HTML page
      // library: 'MyLibrary', // string; the name of the exported library
      libraryTarget: 'umd', // universal module definition, the type of the exported library
    },
    performance: {
      hints: 'warning', // enum
      maxAssetSize: 200000, // int (in bytes),
      maxEntrypointSize: 400000, // int (in bytes)
      assetFilter: function(assetFilename) {
        // Function predicate that provides asset filenames
        return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
      },
    },
    plugins: [].concat(
      // list of additional
      mode === 'production'
        ? [
            /*new CleanPlugin(), new uglifyJsPlugin()*/
          ]
        : [],
      mode === 'development' ? [new Jarvis({port: 1337})] : [],
      [
        new HTMLWebpackPlugin({
          template: path.resolve(__dirname, 'index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
      ],
    ),
    resolve: {
      // options for resolving module requests (does not apply to resolving to loaders)
      // modules: ['node_modules', path.resolve(__dirname, 'app')], // directories where to look for modules
      extensions: ['.js', '.json', '.jsx', '.css', '.sass', '.scss', '.ts', '.tsx'], // extensions that are used
    },
    target: 'web', // enum; the environment in which the bundle should run changes chunk loading behavior and available modules
    // externals: ['react', /^@angular/], // Don't follow/bundle these modules, but request them at runtime from the environment
    stats: 'errors-only', // lets you precisely control what bundle information gets displayed
  };

  // console.log(config);

  return config;
};
