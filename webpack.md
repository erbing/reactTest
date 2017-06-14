### webpack 2 系列

webpack 是一个强大的工具，学会通过工具来解决开发效率问题，是每一个 工程师都必备的技能之一。

那么我们来从零开始搭建一个 基于webpack 2 到 开发架子，来提升自己到开发速度、体验、代码编译、打包、压缩等等功能。

首先介绍一下国内 到 webpack 社区网站，[webpack国内社区](https://doc.webpack-china.org/guides/get-started/)

第一步、 我们要做什么？

	在开始搭建之前，我们得清晰到考虑到，我们搭建这个开发架子是用来做什么的，常见的，我们需要 起一个开发环境的服务以便于我们访问到我们开发到页面，然后我们需要打包压缩我们的静态文件，并且将压缩过的文件放到对应的位置。甚至可能会用到代理等等功能。

第二个、怎么做?

	首先我们 npm init  一个 package.json 的文件，然后引入 webpack。往往这个时候很多同学可能就不知道怎么办了，这个时候需要去上面提到的网站中寻找对应的钩子或者叫api。这里我简单介绍下，在webpack 2 中，常常会用到的api 包括  entry 、 output 、pluhins、devServer 等等。如下面代码所示

```javascript
module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bunlde.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: {}
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'bunlde',
            fliename: 'build-[hash].min.js'
        })
    ],
    devServer: {
        contnteBase: './src/',
        compress: true,
        hot: true,
        host: '127.0.0.1',
        port: '9000'
    }
}
```

	以上代码基本上最基本的webpack的配置文件的写法, 当然需要创建对应的文件夹目录结构

第三步、 启动服务

	这里我们一般会怎么做呢？ 当然，webpack 给我们提出这样的钩子api。
	我们需要做的就是详细的看官方文档中的介绍。在官方文档中，提出来我们需要一个第三方的中间件叫做webpack-dev-server，我们去下载下来。然后我们尝试着去使用他。
	如何使用 这个 webpack-dev-server 插件呢？

```node
Config options:
  --config  Path to the config file
                  [字符串] [默认值: webpack.config.js or webpackfile.js]
  --env     Environment passed to the config, when it is a function

Basic options:
  --context    The root directory for resolving entry point and stats
                                [字符串] [默认值: The current directory]
  --entry      The entry point                                  [字符串]
  --watch, -w  Watch the filesystem for changes                   [布尔]
  --debug      Switch loaders to debug mode                       [布尔]
  --devtool    Enable devtool for better debugging experience (Example:
               --devtool eval-cheap-module-source-map)          [字符串]
  -d           shortcut for --debug --devtool
               eval-cheap-module-source-map --output-pathinfo     [布尔]
  -p           shortcut for --optimize-minimize --define
               process.env.NODE_ENV="production"                  [布尔]
  --progress   Print compilation progress in percentage           [布尔]

Module options:
  --module-bind       Bind an extension to a loader             [字符串]
  --module-bind-post                                            [字符串]
  --module-bind-pre                                             [字符串]

Output options:
  --output-path                 The output path for compilation assets
                                [字符串] [默认值: The current directory]
  --output-filename             The output filename of the bundle
                                            [字符串] [默认值: [name].js]
  --output-chunk-filename       The output filename for additional
                                chunks
          [字符串] [默认值: filename with [id] instead of [name] or [id]
                                                               prefixed]
  --output-source-map-filename  The output filename for the SourceMap
                                                                [字符串]
  --output-public-path          The public path for the assets  [字符串]
  --output-jsonp-function       The name of the jsonp function used for
                                chunk loading                   [字符串]
  --output-pathinfo             Include a comment with the request for
                                every dependency (require, import, etc.)
                                                                  [布尔]
  --output-library              Expose the exports of the entry point as
                                library                         [字符串]
  --output-library-target       The type for exposing the exports of the
                                entry point as library          [字符串]

Advanced options:
  --records-input-path       Path to the records file (reading) [字符串]
  --records-output-path      Path to the records file (writing) [字符串]
  --records-path             Path to the records file           [字符串]
  --define                   Define any free var in the bundle  [字符串]
  --target                   The targeted execution environment [字符串]
  --cache                    Enable in memory caching
                  [布尔] [默认值: It's enabled by default when watching]
  --watch-stdin, --stdin     close when stdin ends                [布尔]
  --watch-aggregate-timeout  Timeout for gathering changes while
                             watching
  --watch-poll               The polling interval for watching (also
                             enable polling)                      [布尔]
  --hot                      Enables Hot Module Replacement       [布尔]
  --prefetch                 Prefetch this request (Example: --prefetch
                             ./file.js)                         [字符串]
  --provide                  Provide these modules as free vars in all
                             modules (Example: --provide jQuery=jquery)
                                                                [字符串]
  --labeled-modules          Enables labeled modules              [布尔]
  --plugin                   Load this plugin                   [字符串]
  --bail                     Abort the compilation on first error [布尔]
  --profile                  Profile the compilation and include
                             information in stats                 [布尔]
  --hot-only                 Do not refresh page if HMR fails     [布尔]

Resolving options:
  --resolve-alias         Setup a module alias for resolving (Example:
                          jquery-plugin=jquery.plugin)          [字符串]
  --resolve-extensions    Setup extensions that should be used to
                          resolve modules (Example: --resolve-extensions
                          .es6 .js)                               [数组]
  --resolve-loader-alias  Setup a loader alias for resolving    [字符串]

Optimizing options:
  --optimize-max-chunks      Try to keep the chunk count below a limit
  --optimize-min-chunk-size  Try to keep the chunk size above a limit
  --optimize-minimize        Minimize javascript and switches loaders to
                             minimizing                           [布尔]

Stats options:
  --color, --colors   Enables/Disables colors on the console
                                       [布尔] [默认值: (supports-color)]
  --info              Info                         [布尔] [默认值: true]
  --quiet             Quiet                                       [布尔]
  --client-log-level  Log level in the browser (info, warning, error or
                      none)                    [字符串] [默认值: "info"]

SSL options:
  --https           HTTPS                                         [布尔]
  --key             Path to a SSL key.                          [字符串]
  --cert            Path to a SSL certificate.                  [字符串]
  --cacert          Path to a SSL CA certificate.               [字符串]
  --pfx             Path to a SSL pfx file.                     [字符串]
  --pfx-passphrase  Passphrase for pfx file.                    [字符串]

Response options:
  --content-base          A directory or URL to serve HTML content from.
                                                                [字符串]
  --watch-content-base    Enable live-reloading of the content-base.
                                                                  [布尔]
  --history-api-fallback  Fallback to /index.html for Single Page
                          Applications.                           [布尔]
  --compress              Enable gzip compression                 [布尔]

Connection options:
  --port    The port
  --socket  Socket to listen
  --public  The public hostname/ip address of the server        [字符串]
  --host    The hostname/ip address the server will bind to
                                          [字符串] [默认值: "localhost"]

选项：
  --help, -h     显示帮助信息                                     [布尔]
  --version, -v  显示版本号                                       [布尔]
  --lazy         Lazy                                             [布尔]
  --inline       Inline mode (set to false to disable including client
                 scripts like livereload)          [布尔] [默认值: true]
  --open         Open default browser                             [布尔]


```

好了，这些都是  webpack-dev-server 的 配置参数， 各种对应的 属性和 作用都是可以 通过实验来看到效果。

最后 我们在 package.json  的 scripts 对象中  设置好对应的 启动标签。

最后一步 在 cmd 中  npm start 。 跑起来了！！！

虽然在这次 的 构建 中并没有过多的介绍 各种loader ，因为时间有限，所以大家在实际的 开发过程中遇到什么问题，或者 需要什么样的 loader 的时候可以去 官方文档上去查看，当然也可以在文章下面留言，我们一起来探讨 webpack 的 奥秘。