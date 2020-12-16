#!/bin/bash

# 捕捉执行异常
echo "-----本次推送内容的标题是: ${1}-----"

function error_exit {
  echo "$1" 1>&2
  exit 1
}

echo "-----开始同步代码至远程-----"

git add . || error_exit "git add"

git commit -m "${1}" || error_exit "git commit"

git push || error_exit "git push"

echo "-----已同步代码至远程-----"