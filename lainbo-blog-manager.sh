#!/bin/bash

PROJECT_PATH="/home/lainbo-next-blog"
PROJECT_NAME="lainbo-blog"

function rebuild_and_start {
    echo "正在重新构建并启动 $PROJECT_NAME..."
    yarn build
    pm2 start yarn --name "$PROJECT_NAME" -- start --log-date-format 'YYYY-MM-DD HH:mm:ss'
}

function stop_and_delete {
    echo "正在停止并删除PM2中的 $PROJECT_NAME..."
    pm2 stop "$PROJECT_NAME"
    pm2 delete "$PROJECT_NAME"
}

cd "$PROJECT_PATH"

echo "请选择要执行的操作："
echo "1) 重新构建并启动Blog"
echo "2) 先拉代码, 再执行1"
echo "3) 停止并删除PM2的 $PROJECT_NAME 进程"
echo "0) 退出脚本"
read -p "输入选择 (1/2/3/0) : " choice

# 检查 $PROJECT_NAME 是否在运行
pm2 describe "$PROJECT_NAME" > /dev/null
RUNNING=$?

case $choice in
  0)
    echo "正在退出脚本..."
    exit 0
    ;;
  1)
    ;;
  2)
    echo "正在拉取代码..."
    if git pull; then
        echo "代码拉取成功."
    else
        echo "代码拉取失败, 脚本终止."
        exit 1
    fi
    ;;
  3)
    if [ $RUNNING -eq 0 ]; then
        stop_and_delete
    else
        echo "$PROJECT_NAME 没有在运行"
        exit 0
    fi
    ;;
  *)
    echo "无效的选择"
    exit 1
    ;;
esac

# 共通的停止和删除操作
[ $RUNNING -eq 0 ] && stop_and_delete

# 共通的重建和启动操作
if [[ $choice == 1 || $choice == 2 ]]; then
    rebuild_and_start
fi
