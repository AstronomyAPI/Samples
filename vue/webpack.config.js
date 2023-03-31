var path = require("path");
var root = path.join.bind(path, path.resolve(__dirname));
var CopyWebpackPlugin = require("copy-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

module.exports = {
  entry: {
    app: "./js/app.js",
  },
  output: {
    path: root("dist"),
    publicPath: "/",
    filename: "[name].[hash].js",
    chunkFilename: "[id].[hash].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  plugins: [
    new CleanWebpackPlugin(["dist/**/*.*"], {
      root: __dirname,
      verbose: true,
      dry: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      {
        from: "index.html",
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: "images/**/*",
      },
    ]),
    new HtmlWebpackPlugin({
      template: "index.html",
      chunksSortMode: "dependency",
      inject: "body",
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false,
      },
    }),
  ],
};
