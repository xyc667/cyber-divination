# Cyber Divination Skill

一个可在任意项目里复用的 Trae skill：把「赛博算卦」项目（React + TypeScript + Vite）的能力封装成可启动、可扩展、可分发的工具集。

## 包含什么

```
cyber-divination/
├── SKILL.md                       # Trae AI 的触发指令
├── README.md                      # 本文件
├── tools/
│   └── add-divination-module.mjs  # 一键新增术数模块（页面+计算器+路由+首页入口）
├── templates/
│   ├── Page.template.tsx
│   └── Calculator.template.ts
└── scripts/
    ├── start.sh                   # Linux / macOS
    ├── start.bat                  # Windows CMD
    └── start.ps1                  # Windows PowerShell
```

## 三种使用方式

### 1. 作为 Trae skill 使用（推荐）

把整个目录放进目标项目的 `.trae/skills/cyber-divination/`。然后在 Trae 里说：

- 「启动赛博算卦」
- 「加一个紫微斗数模块」
- 「把项目打包成静态站点」
- 「解释下八字排盘逻辑」

Trae 会自动调用本 skill。

### 2. 作为脚本直接运行

```bash
# Linux / macOS
./scripts/start.sh

# Windows PowerShell
.\scripts\start.ps1

# Windows CMD
.\scripts\start.bat
```

### 3. 把工具集成到 CI / 其他项目

```bash
# 在任意项目根目录中执行，把 skill 当作 npm 脚本工具：
node .trae/skills/cyber-divination/tools/add-divination-module.mjs taiyi "太乙神数" /taiyi
```

## 快速开始

```bash
# 1) 确保项目已就绪（package.json 存在）
pnpm install

# 2) 启动
pnpm dev          # → http://localhost:5173

# 3) 新增一个术数模块
node .trae/skills/cyber-divination/tools/add-divination-module.mjs taiyi "太乙神数" /taiyi

# 4) 打包
pnpm build        # → dist/
```

## 兼容与要求

- Node.js ≥ 18
- 包管理器：pnpm（推荐）/ npm / yarn 均可
- 浏览器：现代浏览器（Chrome / Edge / Firefox / Safari 近 2 年版本）

## 许可

MIT — 随便用。