# 从0搭建react 主页

- 项目初始化
    `npm init`

- 安装webpack
    `npm install webpack webpack-cli -D`
    webpack：静态模块打包工具。
    - 模式 mode
    - 入口 entry
    - 输出 output
    - loader
        - webpack默认只能处理JavaScript和JSON文件，需要通过loader扩展支持的文件，如css、sass、less等
        - loader有两个属性：
            - test：匹配要被转换的文件，正则表达式
            - use：要使用的loader
        - 定义loader应在module.rules中
        - css-loader: `css-loader`会对`@import`和`url()`进行处理，就像js解析`import/requrie()`一样。
            - 需要安装`css-loader`，并引用到`wepack`配置中
        - babel-loader：`babel-loader`会将ES5+代码转换成ES5 (仍需研究)
            - babel-loader：
            - @babel/core：核心模块，提供转换的API
            - @babel/preset-env：根据配置的目标浏览器或者运行环境，进行转换
            - @babel/preset-react：解析React中的JSX语法
        - sass/less/stylus：css预处理器
            - `sass-loader` `less-loader` `stylus-loader`
            - `postcss-loader` `autoprefix` 自动增加浏览器前缀
        - file-loader / url-loader：加载图片、文件
            - `file-loader` 处理图片文件
            - `url-loader` 封装了file-loader，如果文件大小小于limit参数，则会把图片转换成base64，否则使用file-loader
    - 插件 plugin
        - miniCssExtractPlugin：分离css文件，原本css会写在js文件中，可以减少js文件的体积。**这个插件和`style-loader`冲突，loader中要删掉style-loader**
        - cleanWebpackPlugin：删除上一次的打包结果
    - 抽离公共代码 SplitChunksPlugin
    - 添加resolve：方便开发（路径、省略文件后缀）
    - 浏览器兼容性
    - 环境 environment
    - 代码热更新 `webpack-dev-server` `html-webpack-plugin`
        - webpack-dev-server：热更新插件
        - html-webpack-plugin：每次动态的将打包后的js、css文件加入到index.html页面中

- 搭建项目目录
    - src 存放资源文件
        - components 组件
        - images 图片资源
        - pages 页面
        - routers 路由
        - app.js 入口文件
        - app.scss 全局样式表
        - store.js redux初始化文件
    - index.html 入口文件
    - webpack.config.js webpack的配置文件

- react全家桶配置
    - 集成react：`react` `react-dom`
    - 集成react-router-dom：
        - `react-router-dom 6`，`route`需要由`routes`包裹，替换了低版本的`switch`组件；此外`route`中的`component`属性改为`element`，且值变为传递组件。
        - `<Route path='/' element={<Home />} />`
    - 集成redux：JavaScript的应用状态容器
        - 应用的全局状态以对象树的方式存放在单个`store`中；
        - 改变状态树的唯一方式是创建`action`：action是一个描述发生了什么的对象，并将其dispatch给store；
        - 要指定状态树如何响应action，可以编写纯`reducer`函数，这些函数根据旧state和action来计算新state。

- 琐碎知识点速记
    - path.resolve()：可理解为从左到右cd操作。(https://blog.csdn.net/kikyou_csdn/article/details/83150538)
    - react-router-dom 高本版（6）和低版本的区别：https://blog.csdn.net/weixin_60463255/article/details/121581160
    - webpack-dev-server配置：`historyApiFallback` 不是很好地解释：https://www.jianshu.com/p/b5248d441d9e
