const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "./src/app.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js", // 打包后生成的文件
    clean: true,
  },
  optimization: {
    splitChunks: {
      // 抽离公共代码的插件
      cacheGroups: {
        commons: {
          chunks: "initial", //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          name: "commons", //提取出来的文件命名
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new HtmlWebpackPlugin({ // 实例化html模板模块
      template: path.resolve(__dirname, './index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader?cacheDirectory=true"],
        include: path.resolve(__dirname, "./src"),
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: "./" },
          },
          "css-loader",
        ],
      },
      {
        test: /(\.scss$)|(\.sass$)/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
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
      pages: path.join(__dirname, "./src/pages"),
      components: path.join(__dirname, "./src/components"),
      actions: path.join(__dirname, "./src/redux/actions"),
      reducers: path.join(__dirname, "./src/redux/reducers"),
      images: path.join(__dirname, "./src/images"),
    },
  },
  devServer: {
    hot: true,
    open: true,
    host: '0.0.0.0',
    port: 3333,
    historyApiFallback: true  //缺少该配置，页面404
  }
};
