const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NODE_MODULES_PATH = path.join(__dirname, "../node_modules");

function resolve(pathname) {
    return path.join(__dirname, pathname)
  }
  
const webpackBaseConfig = {
  entry: {
    index: resolve("../src/index.ts"),
  },
  output: {
    filename: "resource/js/[name].[hash:4].js",
    chunkFilename: "resource/chunks/[name].[hash:4].js",
    path: resolve("../dist"), // 指定的输出路径
  },
  resolve: {
    alias: {
      "@": resolve("../src/"),
    },
    extensions: [".ts", ".js", ".json", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: [NODE_MODULES_PATH]
      },
      {
        test: /\.(js|jsx)$/,
        use: ["babel-loader?cacheDirectory"],
        exclude: [NODE_MODULES_PATH],
      },

      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
        include: [NODE_MODULES_PATH],
      },
      // 当图片大小小于限制时会自动转成 base64
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: "url-loader?limit=8192&images/[name].[hash:8].[ext]",
        exclude: [NODE_MODULES_PATH],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //这个是基于devserver中的contentBase目录
      template: resolve("../src/index.html"),
    }),
    new CleanWebpackPlugin(),
    new ProgressBarPlugin(),
  ],
};
module.exports = webpackBaseConfig;
