#!/usr/bin/env bash
# Linux / macOS 一键启动脚本
set -euo pipefail

cd "$(dirname "$0")/../../.."

if [ ! -d node_modules ]; then
  echo "[cyber-divination] 安装依赖..."
  pnpm install
fi

echo "[cyber-divination] 启动 dev server..."
exec pnpm dev