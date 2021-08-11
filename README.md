# 基于create-react-app改造的多页面应用

这是一个基于create-react-app改造成的多页面应用。

## 启动一个项目

在start后添加参数，就可以启动`src/pages`中对应目录的项目，然后以`.tsx`格式的文件做为页面的入口文件。

```shell
$ npm run start demo
```

上面的命令可以启动`src/pages/demo`目录的项目，

[http://localhost:3000](http://localhost:3000)即可访问首页，其他页面按照文件名并添加上.html即可访问到。

[http://localhost:3000/share.html](http://localhost:3000/share.html)即访问share.tsx对应的页面。

## 构建一个项目

在构建项目时，我在这里对其进行了简化，按说是应该通过Git的接口获取到变动文件，并从变动文件中获取到改动的项目，然后进行构建。

不过我这里简化成了传入参数，然后进行构建。

```shell
$ npm run build demo
```

即构建`src/pages/demo`目录的项目，每个入口文件对应着一个构建后的.html文件。

我的博客地址：[https://www.xiabingbao.com](https://www.xiabingbao.com)。
