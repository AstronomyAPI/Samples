const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = {
  mode: "development", // or "production"

  entry: {
    app: "./js/app.js",
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue$: "vue/dist/vue.esm-bundler.js",
    },
    fallback: {
      stream: require.resolve("stream-browserify"),
      path: require.resolve("path-browserify"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      process: require.resolve("process/browser"),
      url: require.resolve("url/"),
      querystring: require.resolve("querystring-es3"),
      http: require.resolve("stream-http"),           // ✅ added
      https: require.resolve("https-browserify"),     // ✅ added
      fs: false,                                      // ✅ no browser equivalent
    },
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: "body",
    }),
    new VueLoaderPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser",
    }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9080,
    hot: true,
    historyApiFallback: true,
  },

  stats: "minimal",
};
