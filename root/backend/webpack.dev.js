import path from "path";
import { fileURLToPath } from "url";
import webpackNodeExternals from "webpack-node-externals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: {
    main: "./src/api.js",
  },
  output: {
    path: path.join(__dirname, "dev-build"),
    publicPath: "/",
    filename: "[name].cjs",
    clean: true,
  },
  mode: "development",
  target: "node",
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
