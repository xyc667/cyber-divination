# PowerShell 一键启动脚本
$ErrorActionPreference = 'Stop'
Set-Location -Path (Join-Path $PSScriptRoot '..\..\..')

if (-not (Test-Path node_modules)) {
  Write-Host '[cyber-divination] 安装依赖...' -ForegroundColor Cyan
  pnpm install
}

Write-Host '[cyber-divination] 启动 dev server...' -ForegroundColor Cyan
pnpm dev