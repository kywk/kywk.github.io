#!/usr/bin/env bash
#
# run-import-daemon.sh
# Flickr 相簿定時背景匯入排程管理腳本 (5 分鐘/篇)
#

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
PID_FILE="$ROOT_DIR/scripts/data/import.pid"
LOG_FILE="$ROOT_DIR/scripts/data/import.log"
PYTHON_SCRIPT="$ROOT_DIR/scripts/import-flickr-albums.py"

cd "$ROOT_DIR" || exit 1

is_running() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if kill -0 "$PID" 2>/dev/null; then
      return 0
    fi
  fi
  return 1
}

start_daemon() {
  if is_running; then
    PID=$(cat "$PID_FILE")
    echo "⚠️ 匯入排程已在執行中 (PID: $PID)"
    echo "  可使用 '$0 status' 查看進度，或 '$0 logs' 查看日誌。"
    return 0
  fi

  mkdir -p "$ROOT_DIR/scripts/data"
  echo "🚀 啟動 Flickr 相簿 5 分鐘匯入背景排程..."

  nohup python3 "$PYTHON_SCRIPT" --interval 300 --update-reciprocal --engine agy >> "$LOG_FILE" 2>&1 &
  PID=$!
  echo "$PID" > "$PID_FILE"

  echo "✅ 背景排程已成功啟動 (PID: $PID)"
  echo "  - 間隔速度：每 300 秒 (5 分鐘) 處理 1 本相簿"
  echo "  - 即時日誌：$LOG_FILE"
  echo "  - 查看狀態：$0 status"
  echo "  - 查看日誌：$0 logs"
  echo "  - 停止排程：$0 stop"
}

stop_daemon() {
  if ! is_running; then
    echo "ℹ️ 目前沒有正在執行的匯入排程。"
    rm -f "$PID_FILE"
    return 0
  fi

  PID=$(cat "$PID_FILE")
  echo "🛑 正在發送終止訊號至匯入排程 (PID: $PID)..."
  kill -TERM "$PID" 2>/dev/null

  # 等待安全退出
  for i in {1..15}; do
    if ! kill -0 "$PID" 2>/dev/null; then
      break
    fi
    sleep 1
  done

  if kill -0 "$PID" 2>/dev/null; then
    echo "⚠️ 排程未在時限內退出，強制終止..."
    kill -9 "$PID" 2>/dev/null
  fi

  rm -f "$PID_FILE"
  echo "✅ 匯入排程已安全停止。下次啟動將自動從斷點接續！"
}

status_daemon() {
  if is_running; then
    PID=$(cat "$PID_FILE")
    echo "🟢 背景排程狀態：【運行中】(PID: $PID)"
  else
    echo "⚪ 背景排程狀態：【未運行】"
  fi

  python3 "$PYTHON_SCRIPT" --status

  if [ -f "$LOG_FILE" ]; then
    echo "📋 最新執行日誌（最後 10 行）："
    echo "--------------------------------------------------"
    tail -n 10 "$LOG_FILE"
    echo "--------------------------------------------------"
  fi
}

show_logs() {
  if [ ! -f "$LOG_FILE" ]; then
    echo "⚠️ 尚未產生任何日誌檔 ($LOG_FILE)"
    return 1
  fi
  tail -n 40 -f "$LOG_FILE"
}

case "$1" in
  start)
    start_daemon
    ;;
  stop)
    stop_daemon
    ;;
  status)
    status_daemon
    ;;
  logs)
    show_logs
    ;;
  restart)
    stop_daemon
    sleep 2
    start_daemon
    ;;
  *)
    echo "使用方式: $0 {start|stop|status|logs|restart}"
    exit 1
    ;;
esac
