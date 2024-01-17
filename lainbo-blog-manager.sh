#!/bin/bash

function rebuild_and_start {
    echo "正在重新构建并启动 lainbo-blog..."
    yarn build
    pm2 start yarn --name "lainbo-blog" -- start
}

function stop_and_delete {
    pm2 stop lainbo-blog
    pm2 delete lainbo-blog
}

echo "请选择要执行的操作："
echo "1) 重新构建并启动 lainbo-blog"
echo "2) 拉取代码，构建并启动 lainbo-blog"
echo "3) 停止并删除 lainbo-blog"
read -p "输入选择（1/2/3）: " choice

cd /home/lainbo-next-blog

# 检查 lainbo-blog 是否在运行
pm2 describe lainbo-blog > /dev/null
RUNNING=$?

case $choice in
  1)
    [ $RUNNING -eq 0 ] && stop_and_delete
    rebuild_and_start
    ;;
  2)
    echo "正在拉取代码..."
    git pull
    [ $RUNNING -eq 0 ] && stop_and_delete
    rebuild_and_start
    ;;
  3)
    [ $RUNNING -eq 0 ] && stop_and_delete || echo "lainbo-blog 不在运行。"
    ;;
  *)
    echo "无效的选择。"
    ;;
esac
