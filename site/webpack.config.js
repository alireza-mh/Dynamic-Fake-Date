const path = require("path");

module.exports = () => ({
  entry: {
    main: path.resolve(__dirname, "../", "src/index.ts")
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
  plugins: []
});
