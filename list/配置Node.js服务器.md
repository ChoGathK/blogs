# 配置

## 免密登录

* 登录到云服务器 `ssh-keygen -t rsa`

* 本地 ssh 同步到云服务器做 ssh 免密登录 `ssh-copy-id username@remote-server`

## 安装 node.js

### 云服务器上执行安装并设置软链，设置淘宝镜像源

* node.js
* npm
* cnpm
* yarn
* pm2

```shell
cd /usr/local

mkdir node

cd node

wget https://nodejs.org/dist/v12.16.0/node-v12.16.0-linux-x64.tar.xz

xz -d node-v12.16.0-linux-x64.tar.xz

tar xvf node-v12.16.0-linux-x64.tar

mv node-v12.16.0-linux-x64 node-v12.16.0

ln -s /usr/local/node/node-v12.16.0/bin/node /usr/local/bin/node

ln -s /usr/local/node/node-v12.16.0/bin/npm /usr/local/bin/npm

npm install -g cnpm --registry=https://registry.npm.taobao.org

npm install -g yarn --registry=https://registry.npm.taobao.org

npm install -g pm2 --registry=https://registry.npm.taobao.org

ln -s /usr/local/node/node-v12.16.0/bin/cnpm /usr/local/bin/cnpm

ln -s /usr/local/node/node-v12.16.0/bin/yarn /usr/local/bin/yarn

ln -s /usr/local/node/node-v12.16.0/bin/pm2 /usr/local/bin/pm2

npm config set registry https://registry.npm.taobao.org

yarn config set registry https://registry.npm.taobao.org

```

### 配置环境变量

```shell

vi /etc/profile

# 命令，按 i 进入编辑模式，进入文件末尾添加以下脚本
export NODE_HOME=/usr/local/node/node-v11.12.0/bin
export PATH=$NODE_HOME:$PATH

```
