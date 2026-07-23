---
name: "cyber-divination"
description: "Scaffolds, runs, and extends a 赛博算卦 (Cyber Divination) web app — a React + TypeScript + Vite platform for Qimen, Zhouyi, Bazi, Meihua, Liuyao, Shefu, and RAG chat. Invoke when the user wants to start, build, debug, or add a new divination module to such a project."
---

# Cyber Divination Skill

A reusable skill that lets any developer (or Trae AI) bootstrap, run, build, and extend a **赛博算卦** style application based on the reference project at `d:\dai_ma\赛博算卦`.

## When to invoke

Trigger this skill when the user says or implies any of:

- "启动赛博算卦 / start cyber-divination / run the divination app"
- "新增一个术数模块（奇门 / 周易 / 八字 / 梅花 / 六爻 / 射覆 / 紫微 / 太乙 ...）"
- "把这个项目打包 / build the divination project"
- "在赛博算卦项目里加一个页面 / route"
- "Fix / debug / 解释赛博算卦的 xxx 模块"
- "把这段代码移植到赛博算卦项目里"

## What it provides

1. **One-line project bootstrap** — `pnpm create @cyber-divination/scaffold my-app`
2. **Standard scripts** — `pnpm dev | build | preview | check | lint`
3. **Module template** — a `tools/add-divination-module.mjs` script that auto-wires a new page + calculator + route + nav entry
4. **Reference architecture** — documented directory layout and conventions
5. **Cross-platform runners** — `.bat` / `.sh` wrappers for Windows / macOS / Linux users

## Reference project structure

```
cyber-divination/
├── public/                       # static assets (favicon, icons)
├── src/
│   ├── assets/                   # images, logos
│   ├── components/
│   │   ├── layout/Header.tsx     # top nav, theme toggle
│   │   └── Empty.tsx
│   ├── data/                     # built-in datasets (hexagrams, knowledge base)
│   ├── hooks/useTheme.ts         # dark/light theme
│   ├── lib/utils.ts              # cn(), formatters
│   ├── pages/                    # one file per divination module
│   │   ├── HomePage.tsx
│   │   ├── QimenPage.tsx
│   │   ├── ZhouyiPage.tsx
│   │   ├── BaziPage.tsx
│   │   ├── MeihuaPage.tsx
│   │   ├── LiuyaoPage.tsx
│   │   ├── ShefuPage.tsx
│   │   ├── KnowledgePage.tsx
│   │   ├── KnowledgeGraphPage.tsx
│   │   ├── RAGChatPage.tsx
│   │   └── ProfilePage.tsx
│   ├── services/                 # external integrations (LLM, calendar)
│   ├── store/divinationStore.ts  # zustand global state
│   ├── utils/                    # pure calculation engines
│   │   ├── qimenCalculator.ts
│   │   ├── zhouyiCalculator.ts
│   │   ├── baziCalculator.ts
│   │   ├── meihuaCalculator.ts
│   │   ├── liuyaoCalculator.ts
│   │   ├── shefuCalculator.ts
│   │   ├── ragEngine.ts
│   │   └── storage.ts
│   ├── App.tsx                   # router + layout
│   ├── main.tsx
│   └── index.css                 # tailwind + 复古/古风 theme tokens
├── .trae/skills/cyber-divination # this skill
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── tsconfig.json
```

## Conventions

- **Path alias**: `@/` → `src/`
- **Routing**: every new module needs a `<Route path="/xxx" element={<XxxPage />} />` in `App.tsx` and a card in `HomePage.tsx`'s `features` array.
- **Calculator** lives in `src/utils/<name>Calculator.ts` — pure functions, no React.
- **State** lives in `src/store/divinationStore.ts` (zustand) for cross-page persistence; use local `useState` for page-only state.
- **Styling**: Tailwind + 古风主题色（`ancient-red/orange/gold/brown`）。Don't introduce a new CSS framework.
- **No backend**: everything runs in-browser. LLM/RAG calls go through `services/` adapters.

## Common tasks the agent should perform

### 1) Start the dev server

```bash
pnpm install
pnpm dev          # opens http://localhost:5173
```

If `node_modules` is corrupted:

```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

Or on Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
pnpm install
pnpm dev
```

### 2) Build for production

```bash
pnpm build        # outputs to dist/
pnpm preview      # serve dist locally
```

### 3) Add a new divination module

Run the helper (see `tools/add-divination-module.mjs` in this skill folder) or follow these manual steps:

1. Create `src/utils/<name>Calculator.ts` with pure calc functions.
2. Create `src/pages/<Name>Page.tsx` — uses the calculator, renders form + result panel.
3. Register the route in `src/App.tsx`.
4. Add a card to `HomePage.tsx`'s `features` array (icon, title, description, path, gradient).
5. If the module needs cross-page state, extend `src/store/divinationStore.ts`.

### 4) Update dependencies

```bash
pnpm add <pkg>            # runtime
pnpm add -D <pkg>         # dev
pnpm update               # upgrade all within semver
```

## How other developers install this skill

Option A — copy into the project's local skills folder:

```bash
mkdir -p .trae/skills
cp -r cyber-divination .trae/skills/
```

Option B — keep it as a standalone package and reference it from any project.

## Files in this skill

- `SKILL.md` — this file
- `tools/add-divination-module.mjs` — scaffold a new module
- `scripts/start.sh` / `scripts/start.bat` / `scripts/start.ps1` — cross-platform starters
- `templates/Page.template.tsx` — page skeleton
- `templates/Calculator.template.ts` — calculator skeleton
- `README.md` — user-facing quick start