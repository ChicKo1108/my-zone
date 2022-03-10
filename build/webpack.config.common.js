const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV;
console.log('======', NODE_ENV, '========');

module.exports = {
  entry: path.resolve(__dirname, "../src/app.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js", // 打包后生成的文件
    clean: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({ // 实例化html模板模块
      template: path.resolve(__dirname, '../index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader?cacheDirectory=true"],
        include: path.resolve(__dirname, "../src"),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "../" },
          },
          "css-loader",
        ],
      },
      {
        test: /(\.scss|\.sass)$/,
        use: [
          "style-loader",
          "css-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     postcssOptions: {
          //       plugins: [require("autoprefix")],
          //     },
          //   },
          // },
          {
            loader: "postcss-sass-loader",
            options: {
              postcssOptions: {
                plugins: [require("autoprefix")],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp4|webm|ogg|mp3|wav)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: { //resolve核心配置
    extensions: [".js", ".jsx", ".json"],
    alias: {
      pages: path.join(__dirname, "../src/pages"),
      components: path.join(__dirname, "../src/components"),
      actions: path.join(__dirname, "../src/redux/actions"),
      reducers: path.join(__dirname, "../src/redux/reducers"),
      images: path.join(__dirname, "../src/images"),
      enums: path.join(__dirname, "../src/enums"),
      fonts: path.join(__dirname, "../src/fonts"),
    },
  },
};