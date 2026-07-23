#!/usr/bin/env node
/**
 * add-divination-module.mjs
 * 一键新增一个术数模块（页面 + 计算器 + 路由 + 首页入口）
 *
 * 用法（在项目根目录执行）：
 *   node .trae/skills/cyber-divination/tools/add-divination-module.mjs <kebab-name> "<中文标题>" <path-segment>
 *
 * 示例：
 *   node .trae/skills/cyber-divination/tools/add-divination-module.mjs ziwei "紫微斗数" /ziwei
 *
 * 它会：
 *   1) 在 src/utils/<kebab>Calculator.ts 生成计算器骨架
 *   2) 在 src/pages/<Pascal>Page.tsx 生成页面骨架
 *   3) 在 src/App.tsx 追加 <Route> 与 import
 *   4) 在 src/pages/HomePage.tsx 的 features 数组追加卡片
 *   5) 在 README 的目录结构里追加说明（可选）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..', '..', '..'); // .trae/skills/... -> project root

const [, , kebab, title = '', routePath = `/${kebab}`] = process.argv;
if (!kebab) {
  console.error('用法: node add-divination-module.mjs <kebab-name> "<中文标题>" <path-segment>');
  process.exit(1);
}
const pascal = kebab.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());
const fileBase = path.join(ROOT, 'src');

const utilsDir = path.join(fileBase, 'utils');
const pagesDir = path.join(fileBase, 'pages');
fs.mkdirSync(utilsDir, { recursive: true });
fs.mkdirSync(pagesDir, { recursive: true });

const calculatorPath = path.join(utilsDir, `${kebab}Calculator.ts`);
const pagePath = path.join(pagesDir, `${pascal}Page.tsx`);

if (fs.existsSync(calculatorPath) || fs.existsSync(pagePath)) {
  console.error(`已存在: ${calculatorPath} 或 ${pagePath}，中止以避免覆盖。`);
  process.exit(2);
}

// ---- 写计算器 ----
const calculatorTpl = `// ${title || pascal} 计算器 - 纯函数，不依赖 React
// TODO: 在此实现起盘 / 排盘 / 解卦逻辑

export interface ${pascal}Input {
  // 根据需要定义入参，例如时间、问题等
  question?: string;
  datetime?: Date;
}

export interface ${pascal}Result {
  // 根据需要定义返回结构
  summary: string;
  details: Record<string, unknown>;
}

export function calc${pascal}(input: ${pascal}Input): ${pascal}Result {
  // 引用 input 避免 TS noUnusedParameters 报错；真正实现时移除此行
  void input;
  return {
    summary: '尚未实现',
    details: {},
  };
}
`;
fs.writeFileSync(calculatorPath, calculatorTpl, 'utf8');

// ---- 写页面 ----
const pageTpl = `import { useState } from 'react';
import { motion } from 'framer-motion';
import { calc${pascal}, type ${pascal}Input, type ${pascal}Result } from '@/utils/${kebab}Calculator';

export default function ${pascal}Page() {
  const [input, setInput] = useState<${pascal}Input>({ question: '' });
  const [result, setResult] = useState<${pascal}Result | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calc${pascal}(input));
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-ancient-red"
      >
        ${title || pascal}
      </motion.h1>
      <p className="mt-2 text-sm text-ancient-brown/70">在此填写简介与起盘条件。</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4 rounded-lg border border-ancient-gold/30 bg-white/60 p-6 backdrop-blur dark:bg-zinc-900/60">
        <label className="block">
          <span className="text-sm text-ancient-brown">您的问题</span>
          <textarea
            value={input.question ?? ''}
            onChange={(e) => setInput({ ...input, question: e.target.value })}
            className="mt-1 w-full rounded border border-ancient-gold/40 bg-transparent p-2 outline-none focus:border-ancient-red"
            rows={3}
          />
        </label>
        <button
          type="submit"
          className="rounded bg-ancient-red px-4 py-2 text-white hover:bg-ancient-red/90"
        >
          起盘
        </button>
      </form>

      {result && (
        <section className="mt-6 rounded-lg border border-ancient-gold/30 bg-white/60 p-6 dark:bg-zinc-900/60">
          <h2 className="text-xl font-semibold text-ancient-red">结果</h2>
          <p className="mt-2 whitespace-pre-wrap text-ancient-brown">{result.summary}</p>
        </section>
      )}
    </main>
  );
}
`;
fs.writeFileSync(pagePath, pageTpl, 'utf8');

// ---- 修改 App.tsx 追加路由 ----
const appPath = path.join(fileBase, 'App.tsx');
let appSrc = fs.readFileSync(appPath, 'utf8');
if (!appSrc.includes(`${pascal}Page`)) {
  // 探测项目使用的引号风格（单/双）
  const sample = appSrc.match(/import\s+\w+Page\s+from\s+(['"])@\/pages\/\w+Page\1;/);
  const q = sample ? sample[1] : "'";
  const newImport = `import ${pascal}Page from ${q}@/pages/${pascal}Page${q};`;
  appSrc = appSrc.replace(
    /(import\s+\w+Page\s+from\s+['"]@\/pages\/\w+Page['"];\s*\n)/,
    `$1${newImport}\n`
  );
  if (!appSrc.includes(`${pascal}Page`)) {
    // 没有 import 行匹配，直接在 routes 区上方插入
    appSrc = appSrc.replace(
      /(export default function App\(\) \{)/,
      `${newImport}\n\n$1`
    );
  }
  // 在 </Routes> 之前插入新的 Route 行
  appSrc = appSrc.replace(
    /([ \t]*)<\/Routes>/,
    `$1<Route path="${routePath}" element={<${pascal}Page />} />\n$1</Routes>`
  );
  fs.writeFileSync(appPath, appSrc, 'utf8');
}

// ---- 修改 HomePage.tsx 追加卡片 ----
const homePath = path.join(fileBase, 'pages', 'HomePage.tsx');
if (fs.existsSync(homePath)) {
  let homeSrc = fs.readFileSync(homePath, 'utf8');
  const card = `  {
    icon: Sparkles,
    title: '${title || pascal}',
    description: 'TODO: 填写简介',
    path: '${routePath}',
    color: 'from-ancient-red to-ancient-gold'
  },
`;
if (!homeSrc.includes(`path: '${routePath}'`)) {
  const before = homeSrc;
  // 模式 A: const features = [ { ... }, { ... } ] 数组风格
  homeSrc = homeSrc.replace(
    /(const features = \[\s*\n)/,
    `$1${card}`
  );
  // 模式 B: 网格 + Link 卡片风格 - 在 <section ... grid> 块末尾插入新 Link
  if (homeSrc === before) {
    const linkCard = `        <Link
          to="${routePath}"
          className="ancient-card group flex items-start gap-4 hover:-translate-y-0.5"
        >
          <Sparkles className="h-8 w-8 shrink-0 text-ancient-red" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-ancient-red">${title || pascal}</h2>
            <p className="mt-1 text-sm text-ancient-brown/70">TODO: 填写简介</p>
          </div>
          <ArrowRight className="h-5 w-5 text-ancient-gold transition group-hover:translate-x-1" />
        </Link>
`;
    homeSrc = homeSrc.replace(
      /(\s*<\/Link>\s*<\/section>)/,
      `\n${linkCard}$1`
    );
    if (homeSrc === before) {
      console.warn('  ! 未识别 HomePage 卡片结构，请手动在 src/pages/HomePage.tsx 添加卡片');
    }
  }
  fs.writeFileSync(homePath, homeSrc, 'utf8');
}
}

console.log(`✔ 已生成模块: ${pascal}`);
console.log(`  - ${path.relative(ROOT, calculatorPath)}`);
console.log(`  - ${path.relative(ROOT, pagePath)}`);
console.log(`  - 已注册路由 ${routePath}`);
console.log(`  - 已在首页 features 中追加卡片`);