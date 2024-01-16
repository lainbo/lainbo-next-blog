#!/bin/bash

while true; do
    if pgrep -x "yarn" > /dev/null; then
        echo "Yarn process is already running."
    else
        nohup yarn start >/dev/null 2>&1 &
        pid=$!
        echo "Yarn process started with PID: $pid"
    fi
    sleep 5
done
