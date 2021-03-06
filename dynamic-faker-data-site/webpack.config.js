const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require("webpack-node-externals");
module.exports = () => ({
  entry: {
    main: path.resolve(__dirname, "./index.js")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname)
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  },
  target: 'web',
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html'
    })
  ]
});
