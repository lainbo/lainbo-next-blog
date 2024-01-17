#!/bin/bash

echo "请选择要执行的操作："
echo "1) 重新构建并启动 lainbo-blog"
echo "2) 拉取代码，构建并启动 lainbo-blog"
echo "3) 停止并删除 lainbo-blog"
read -p "输入选择（1/2/3）: " choice

cd /home/lainbo-next-blog

case $choice in
  1)
    echo "正在重新构建并启动 lainbo-blog..."
    yarn build
    pm2 restart lainbo-blog || pm2 start yarn --name "lainbo-blog" -- start
    ;;
  2)
    echo "正在拉取代码，构建并启动 lainbo-blog..."
    git pull
    yarn build
    pm2 restart lainbo-blog || pm2 start yarn --name "lainbo-blog" -- start
    ;;
  3)
    echo "正在停止并删除 lainbo-blog..."
    pm2 stop lainbo-blog
    pm2 delete lainbo-blog
    ;;
  *)
    echo "无效的选择。"
    ;;
esac
