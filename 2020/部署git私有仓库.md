# 使用 Git 作为 NPM 私有源并支持 docker 构建

 > 使用 git ssh 或者 令牌校验，可以有效的保障依赖包的安全性

<!-- more -->

要使用 git 私有包，总共分三步。

## 第一步，把冰箱门打开

* （必选）`npm init`

* （必选）在 `package.json` 中修改 `name` 为 `@<定义>/私有包名`，例如 @aliyun/cli

* （必选）在 `package.json` 中修改 `main` 为 `js` 依赖入口，例如 `dist/index.js`

* （非必选）在 `package.json` 中修改 `types` 为 `ts` 依赖入口，例如 `dist/index.d.ts`

## 第二步，把大象装里面

* （必选）有一个 gitlab / github / gitee 仓库
* （必选）把刚刚注册号的私有包上传到 git 仓库

## 第三步，把冰箱门关上

* 在需要安装依赖的项目中执行：yarn add （或者npm install）`git+ssh://GIT仓库的SSH地址`

只要你有项目的权限，或者本身仓库就是共有仓库，接下来你就可以愉快的使用啦

```js
const cli = require('@aliyun/cli');

// 或者
import * as cli from '@aliyun/cli';
```

## 补充说明

有些小伙伴可能是我这样的 docker 重度使用者，安装的时候 docker 是没有 SSH 权限的，那怎么办？

首先你需要在 git 仓库中创建 token 令牌

> 懒的查的就点一下吧

* [👉  github 懒的查的就点一下吧](https://cn.bing.com/search?q=%E5%A6%82%E4%BD%95+%E5%88%9B%E5%BB%BA+github+token&amp;qs=n&amp;form=QBRE&amp;sp=-1&amp;pq=%E5%A6%82%E4%BD%95+%E5%88%9B%E5%BB%BA+github+token&amp;sc=0-18&amp;sk=&amp;cvid=90C3AA7D3E0B4E978EB06302CE41B51D)
* [👉  gitlab 懒的查的就点一下吧](https://cn.bing.com/search?q=%E5%A6%82%E4%BD%95+%E5%88%9B%E5%BB%BA+gitlab+token&amp;qs=n&amp;form=QBRE&amp;sp=-1&amp;pq=%E5%A6%82%E4%BD%95+%E5%88%9B%E5%BB%BA+gitlab+token&amp;sc=0-18&amp;sk=&amp;cvid=2B785895669F4C1FBB4F0363D52A0A96)

### show time ⬇️

1.创建好后 dockerfile 中加入安装命令：
    * yarn add （或者npm install）`git+https://oauth2:<你创建的token>@<仓库的https地址>`

2.dockerfile 中安装 git

<!-- more -->

* RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.3/main/" > /etc/apk/repositories && apk update && apk add git

### 然后就可以愉快的使用啦 ~

> 如果有问题，欢迎邮件留言: [chogath@163.com](mailto:chogath@163.com)
