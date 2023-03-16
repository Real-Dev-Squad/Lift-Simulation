const path = require("path");
module.exports = {
  mode: process.env.DEPLOY_TO ?? "development",
  entry: {
    index: "/index.ts",
    simulator: "/simulator.ts",
  },
  context: path.resolve(__dirname, "src"),
  module: {
    rules: [{ test: /.ts?$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  resolve: { extensions: [".ts", ".js"] },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "static", "bundle"),
  },
};
