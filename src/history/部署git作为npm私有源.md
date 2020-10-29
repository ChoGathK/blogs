# 部署 git 作为 npm 私有源

> 使用 git ssh 或者 令牌校验，可以有效的保障依赖包的安全性

## 1 配置 package.json

* （必选）`npm init`
* （必选）在 `package.json` 中修改 `name` 为 `@<定义>/私有包名`，例如 @aliyun/cli
* （必选）在 `package.json` 中修改 `main` 为 `js` 依赖入口，例如 `dist/index.js`
* （非必选）在 `package.json` 中修改 `types` 为 `ts` 依赖入口，例如 `dist/index.d.ts`

## 2 将私有包上传到代码仓库

* （必选）有一个 gitlab / github / codeup / coding 仓库
* （必选）把刚刚注册号的私有包上传到代码仓库

## 3 安装私有源

> 只要你有项目的权限，或者本身仓库就是共有仓库，接下来你就可以愉快的使用啦

* 在需要安装依赖的项目中执行：yarn add （或者npm install）`git+ssh://GIT仓库的SSH地址`

## 使用示例

```js
const cli = require('@aliyun/cli');
// 或者
import * as cli from '@aliyun/cli';
```

## 在 Docker 中使用

> 有些小伙伴可能是我这样的 docker 重度使用者，安装的时候 docker 是没有 SSH 权限的，那怎么办？

1. 需要在 git 仓库中创建 token 令牌

2. 创建好后 dockerfile 中加入安装命令：

    ```shell
    yarn add（或者npm install）`git+https://oauth2:<你创建的token>@<仓库的https地址>`
    ```

3. dockerfile 中声明安装 git

    ```docker
    RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.3/main/" > /etc/apk/repositories && apk update && apk add git
    ```
