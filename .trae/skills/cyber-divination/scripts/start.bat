@echo off
REM Windows CMD 一键启动脚本
cd /d "%~dp0\..\..\.."

if not exist node_modules (
  echo [cyber-divination] 安装依赖...
  call pnpm install
)

echo [cyber-divination] 启动 dev server...
call pnpm dev