# 赛博算卦 · 脚手架

> 一个开箱即用的 React + TypeScript + Vite 模板。
> 内置 **cyber-divination Trae skill**，支持一行命令新增任意术数模块（奇门、周易、八字、梅花易数、六爻、射覆、紫微、太乙…）。
> **如果你只想要"跑起来"，看下面 §1 就够了。**

---

## §1. 30 秒上手

```bash
# 把这个文件夹解压到任意位置，然后进入目录
cd cyber-divination-scaffold

# 安装依赖（首次约 30 秒）
pnpm install            # 或 npm install / yarn install

# 启动开发服务器
pnpm dev
```

打开浏览器访问 **http://localhost:5173/**，你会看到一个首页。

### 启动后会看到什么？

- **首页**：介绍 + 两个入口卡片
- **示范·起卦** (`/demo`)：一个**真实可用的**起卦演示，输入问题 → 点击「起卦」→ 看到卦象 + 自动存入历史
- **占卜历史** (`/history`)：所有起卦记录都存在浏览器 localStorage 里

### 想打包发布？

```bash
pnpm build              # 产物在 dist/ 目录
pnpm preview            # 本地预览生产包
```

把 `dist/` 整个目录上传到任何静态网站托管（Vercel / Netlify / GitHub Pages / Nginx）即可。

> **需要 Node.js ≥ 18**。如果电脑里没有，去 https://nodejs.org 下载 LTS 版本。

---

## §2. 我想新增一个术数模块，怎么做？

只要一行命令：

```bash
pnpm add-module taiyi "太乙神数" /taiyi
pnpm add-module ziwei "紫微斗数" /ziwei
pnpm add-module meihua "梅花易数" /meihua
```

这条命令会自动做 4 件事：

| 步骤 | 文件 | 内容 |
|---|---|---|
| 1 | `src/utils/taiyiCalculator.ts` | 纯函数计算器骨架（你需要在这里写算法） |
| 2 | `src/pages/TaiyiPage.tsx` | 带表单 + 结果展示的页面（已能跑） |
| 3 | `src/App.tsx` | 注册新路由 `/taiyi` |
| 4 | `src/pages/HomePage.tsx` | 首页加一张入口卡片 |

跑完命令后，**最重要的一件事**：打开 `src/utils/taiyiCalculator.ts`，把里面的 `TODO` 换成你自己的算法。例如：

```ts
export function calcTaiyi(input: TaiyiInput): TaiyiResult {
  // TODO: 在此实现起盘 / 排盘 / 解卦逻辑
  // ↓ 改成你的真算法 ↓
  return {
    summary: `太乙排盘：${input.question || '（未填写）'}`,
    details: { /* ... */ },
  };
}
```

保存后浏览器会自动刷新（HMR），立即看到效果。

### 命令格式

```
pnpm add-module <kebab-name> "<中文标题>" <path-segment>

<kebab-name>      小写连字符英文名（用于文件名）
<中文标题>        显示在页面上的标题
<path-segment>    URL 路径，必须以 / 开头
```

示例对照：

| 命令 | 生成文件 | 路由 |
|---|---|---|
| `pnpm add-module taiyi "太乙神数" /taiyi` | `taiyiCalculator.ts` + `TaiyiPage.tsx` | `/taiyi` |
| `pnpm add-module qi-men "奇门遁甲" /qimen` | `qiMenCalculator.ts` + `QiMenPage.tsx` | `/qimen` |

---

## §3. 项目结构（每个文件是干嘛的）

```
.
├── README.md                       ← 你正在看的文件
├── package.json                    ← 依赖与脚本（含 pnpm add-module）
├── tsconfig.json / *.app / *.node  ← TypeScript 配置
├── vite.config.ts                  ← Vite 配置（端口 5173）
├── tailwind.config.js              ← 古风主题色
├── postcss.config.js
├── index.html                      ← HTML 入口
├── public/favicon.svg
├── src/
│   ├── App.tsx                     ← 路由表（每加一个页面要来这里注册）
│   ├── main.tsx                    ← React 入口
│   ├── index.css                   ← 全局样式（含 .ancient-card 等组件类）
│   ├── components/
│   │   └── layout/Header.tsx       ← 顶部导航 + 主题切换按钮
│   ├── pages/
│   │   ├── HomePage.tsx            ← 首页
│   │   ├── DemoPage.tsx            ← 示范·起卦（参考实现，新模块照着改）
│   │   └── HistoryPage.tsx         ← 历史记录
│   ├── utils/
│   │   └── demoCalculator.ts       ← 示范算法（参考实现）
│   ├── store/
│   │   └── divinationStore.ts      ← 全局状态（带 localStorage 持久化）
│   ├── hooks/useTheme.ts           ← 明暗主题切换
│   └── lib/utils.ts                ← cn() 工具、日期格式化
└── .trae/
    └── skills/cyber-divination/    ← ← ← Trae skill（详见 §5）
        ├── SKILL.md
        ├── tools/add-divination-module.mjs   ← pnpm add-module 调的就是这个
        ├── templates/              ← 新模块的模板
        └── scripts/                ← 一键启动脚本
```

---

## §4. 常用任务速查

| 我想… | 命令 |
|---|---|
| 启动开发服务器 | `pnpm dev` |
| 打包生产版本 | `pnpm build` |
| 预览生产包 | `pnpm preview` |
| 新增一个术数模块 | `pnpm add-module <kebab> "<标题>" /<path>` |
| 类型检查 | `pnpm check` |
| 安装新依赖 | `pnpm add <pkg>` |
| 安装开发依赖 | `pnpm add -D <pkg>` |

---

## §5. 用 Trae AI 加速开发

本项目内置 `.trae/skills/cyber-divination/`，所以 Trae IDE 会自动识别这个项目。

在 Trae 里直接说：

- **"启动赛博算卦"** → AI 会运行 `pnpm dev`
- **"加一个紫微斗数模块"** → AI 会调用脚手架工具
- **"把项目打包"** → AI 会运行 `pnpm build`
- **"解释一下 demoCalculator 里的算法"** → AI 会讲解代码

### 没装 Trae？

没关系。本项目**不依赖**任何 Trae 专有功能 —— 你用 **VSCode / Cursor / WebStorm / 记事本** 都一样开发。skill 只是放在 `.trae/` 目录里的文件，普通项目根本不会读它。

---

## §6. 故障排查

### 启动报 "Cannot find package 'xxx'"

依赖没装好。删掉重新装：

```bash
# Windows PowerShell
Remove-Item -Recurse -Force node_modules
pnpm install

# Linux / macOS
rm -rf node_modules
pnpm install
```

### 启动报 "Port 5173 is already in use"

5173 端口被占用。要么关掉占用的程序，要么改端口 — 编辑 `vite.config.ts`：

```ts
server: { port: 5174 }   // 改成任意空闲端口
```

### `pnpm add-module` 报错 "已存在"

说明同名模块已经生成过。换一个名字，或者手动删除已有的 `src/utils/<kebab>Calculator.ts` 和 `src/pages/<Pascal>Page.tsx`。

### `pnpm check` 报 TypeScript 错误

最常见原因是 `pnpm add-module` 生成的 `calc<Kebab>` 函数里的 `input` 参数没用，触发了 `noUnusedParameters`。**这不影响运行**（Vite 编译只看 tsc 错误时 build 才会失败）。修复办法：

- 如果你**不打算用**这个入参：在参数前加下划线，例如 `function calcX(_input: XInput)`
- 如果你**要用**：删掉模板里那行 `void input;`

### 浏览器打开是空白页

按 F12 打开控制台，看红字报错。最常见：

- **端口不对** — 看终端实际输出的是哪个端口
- **依赖没装完** — 重新跑 `pnpm install`
- **TS 错误阻断构建** — 跑 `pnpm check` 看哪里报错

---

## §7. 古风主题

`tailwind.config.js` 里定义了 4 个古风色：

| 类名 | 色值 | 用途 |
|---|---|---|
| `ancient-red` | `#8B0000` | 主色调：朱砂红（按钮、强调） |
| `ancient-orange` | `#D2691E` | 赭石（次要强调） |
| `ancient-gold` | `#DAA520` | 金（边框、图标） |
| `ancient-brown` | `#5D4037` | 深褐（正文文字） |

两个开箱即用的组件类（在 `src/index.css` 里定义）：

```jsx
<div className="ancient-card">      {/* 古风卡片样式 */}
<h1 className="ancient-title">     {/* 古风渐变标题 */}
```

---

## §8. 给开发者的话

### 约定（避免破坏 skill 自动识别）

1. **路径别名**：`@/` 指向 `src/`
2. **页面放 `src/pages/<Pascal>Page.tsx`**：必须以 `Page.tsx` 结尾，skill 会按这个命名扫描
3. **计算器放 `src/utils/<kebab>Calculator.ts`**：必须是纯函数，不引用 React
4. **跨页面状态放 `src/store/divinationStore.ts`**：页面内状态用 `useState` 即可

### 修改首页

首页 (`src/pages/HomePage.tsx`) 的入口卡片用了 `Link` 组件，手动加也支持 —— skill 的脚手架工具会自动适配两种首页结构（数组风格 / Link 风格）。

---

## §9. 许可

MIT — 随便用。