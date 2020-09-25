# Easy-Monitor 3.0 Docker + K8s 部署指南

## 一、背景

> [Easy-Monitor 3.0](https://github.com/hyj1991/easy-monitor) - Node.js 应用性能监控与线上故障定位解决方案

由于我个人的业务是基于 Docker + K8S 部署，作者推荐的主机部署方式无法满足需求，所以诞生了这篇指南，希望自己的踩过的一些坑可以为大家做一点微小的贡献 👓

## 二、写在部署前

### 1 依赖

* 代码仓库: 阿里云云效 [CodeUp](https://codeup.aliyun.com)

* CI和自动部署: 阿里云云效 [Flow](https://flow.aliyun.com)

* 镜像仓库: 阿里云容器镜像服务 [容器镜像服务](https://cr.console.aliyun.com)

* K8S: 阿里云容器服务 [容器服务](https://cs.console.aliyun.com)

### 2 目标

1. 使用 CodeUp 存放 Easy-Monitor 的服务代码

2. 当代码审核通过并推送到指定线上分支时（release 分支）自动触发 Flow CI 部署

3. Flow CI 自动构建镜像，并推送到阿里云北京镜像仓库中

4. Flow CI 自动进行 Kubectl 镜像升级，对 k8s 集群中运行的 Easy-Monitor Pod 进行滚动更新

5. 在 K8S 集群中配置 Easy-Monitor 的三个服务后可以正常访问控制台并查看对应服务应用的性能监控指标

## 三、部署监控服务端

### 1 本地部署测试，数据库准备工作

* MySQL 和 Redis 使用的是阿里云的服务

* 这里请参考作者的[部署文档](https://www.yuque.com/hyj1991/easy-monitor/deployment)并在本地验证通过后，再进行下一步嗷

### 2 为服务编写 Dockerfile

``` Dockerfile
### BASE - NODE.JS 14.4 这里使用的阿里云北京镜像源是我个人的公共镜像，如有特殊需要，请私有部署即可 ~
FROM registry.cn-beijing.aliyuncs.com/common-node/alpine:14.4 AS base

LABEL maintainer "chogath <chogath@163.com>"

WORKDIR /app

COPY . ./

### DEPENDENCIES
FROM base AS dependencies

RUN yarn

RUN cp -R node_modules /tmp/node_modules

COPY . .

### RELEASE
FROM base AS release

COPY --from=dependencies /tmp/node_modules ./node_modules

# 这里也要注意，为不同的服务暴露指定的端口，这里示例的是 xtransit-server
# xtransit-server: 9090 (项目内默认是这个哦，有需要自己改 config 即可)
# xtransit-manager: 8543
# xprofiler-console: 8443

EXPOSE 9090

CMD ["yarn", "start"]
```

### 3 部署

#### 3.1 部署在服务器上

> 把相关命令写在 package.json 中

```json
  "docker:build": "bash template/docker.build.sh",
  "docker:clear": "bash template/docker.clear.sh",
```

> 执行构建镜像脚本

```shell
#!/bin/bash

# 捕捉执行异常
function error_exit {
  echo "$1" 1>&2
  exit 1
}

docker build -t 你要构建的镜像名 -f Dockerfile . || error_exit "DOCKER BUILD FAIL"

docker stop 你要构建的镜像名 1>&2 && docker rm 你要构建的镜像名 1>&2

docker run --name 你要构建的镜像名 -p 3000:3000 -d 你要构建的镜像名 || error_exit "DOCKER RUN FAIL"
```

> 清理镜像和容器

```shell
#!/bin/bash

docker stop $(docker ps -a | grep "Exited" | awk '{print $1 }')

docker rm $(docker ps -a | grep "Exited" | awk '{print $1 }')

docker rmi $(docker images | grep "none" | awk '{print $3}')
```

#### 3.2 部署到 K8S

> 配置域名请根据业务需要，使用 IP + 端口也可以，但是要正确做好 K8S 集群默认 DNS 的 local 流量分配

1. 推送代码到 Code Up 代码仓库

2. 代码准备完毕，合并到指定分支触发 FLOW

3. FLOW 自动部署镜像 + Kubectl 镜像升级，生成第一个版本的 Pod

4. 为三个服务配置域名，并在 DNS 服务商处做好域名解析（阿里云）

5. 查看 Pod 对应日志，确认无问题后访问控制台 ☺️

> FLOW CI 的配置截图

![flow](../images/flow.png)

## 四、应用接入（Docker 部署）

### 1.1 配置文件和插件工具

> 在我们的 Node.js 架构中，配置文件是以 npm 私有包的形式存在

### 1.2 编辑 xtransit 启动配置

```ts
  // 此处省略一万个字......
  monitor: {
    demo: {
      docker: true,
      libMode: true,
      appId: 这里填写你的 appId,
      appSecret: 这里填写你的 appSecret,
      server: 'ws:// 这里填写 xtransit-server 的域名，或者配置好的 IP + 端口',
    },
    // 此处省略一万个字......
  },
  // 此处省略一万个字......
```

### 1.3 编写 xtransit 启动插件

```ts
// index.ts
import * as xprofiler from 'xprofiler';

import { resolve } from 'path';
import { fork } from 'child_process';
import { Monitor } from '@chogath/types'; // 这里是我的私有包（类型中心）☺️

/**
 * @description: < 启动监视器 >
 * @param options `Monitor` 监视器配置
 */

export const startMonitor = (options: Monitor) => {

  // 启动分析
  xprofiler.start();

  // 创建子进程启动日志采集
  const newWorker = fork(resolve(__dirname, './fork'));

  // 传递启动配置
  newWorker.send(options);

};


// ./fork

import * as xtransit from 'xtransit';
import { Monitor } from '@chogath/types'; // 这里是我的私有包（类型中心）☺️

process.on(
  'message',
  (options: Monitor) => xtransit.start(options),
);

```

### 1.4 在 Node.js 应用中使用采集器插件

```ts
// 这里是应用启动目录

import { configs } from '@chogath/configs'; // 这里是我的私有包（配置中心）☺️
import { startMonitor } from '@chogath/tools'; // 这里是我的私有包（插件中心）☺️


if (configs.env === 'prod') {
  startMonitor(configs.monitor.demo);
}

```

### 1.5 部署到 K8S 中

1. 推送到指定分支，触发 Flow CI 自动部署

2. 过一分钟后到监控控制台验证进程运行情况即可

> 部署成功预览

![monitor](../images/monitor.png)

## 五，注意事项

[常见问题](https://www.yuque.com/hyj1991/easy-monitor/question)

### 1.1 保证 Easy-Monitor docker 环境和 Node.js 应用 docker 环境时区一致

有需要的同学可以像这样指定时区

``` Dockerfile
# Dockerfile localtime
RUN echo "http://mirrors.ustc.edu.cn/alpine/v3.3/main/" > /etc/apk/repositories && apk update && apk add tzdata
RUN cp -r -f /usr/share/zoneinfo/Asia/Chongqing /etc/localtime
```

### 1.2 重启了 xtransit-server 和 xtransit-manager 后出现异常

* 部署和重启 xtransit-server 和 xtransit-manager 后 Node.js 应用需要重连（websocket），这段时间可能看不到应用监控数据
* 尽可能保证 xtransit-server 和 xtransit-manager 的高可用，不要频繁重启

## 写在最后

> 如果有问题，欢迎邮件留言: [chogath@163.com](mailto:chogath@163.com)

* 感谢您阅读我的部署指南，如有不妥处请指出，我一定会尽快修改 ~

* 欢迎加入钉钉群 35149528 一起讨论哦
