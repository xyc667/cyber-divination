import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Compass, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-ancient-gold/40 bg-white/60 px-4 py-1 text-sm dark:bg-zinc-900/60">
          <Sparkles className="h-4 w-4 text-ancient-red" />
          <span>赛博算卦 · 脚手架 v0.1</span>
        </div>
        <h1 className="text-5xl font-bold leading-tight ancient-title">
          一念问天机
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base text-ancient-brown/80 dark:text-stone-300">
          基于 React + TypeScript + Vite 的术数应用脚手架。
          已内置 <code className="rounded bg-ancient-gold/20 px-1">cyber-divination</code> skill，
          支持一键新增任意术数模块。
        </p>
      </motion.section>

      <section className="mt-12 grid gap-6 md:grid-cols-2">
        <Link
          to="/demo"
          className="ancient-card group flex items-start gap-4 hover:-translate-y-0.5"
        >
          <Compass className="h-8 w-8 shrink-0 text-ancient-red" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-ancient-red">示范·起卦</h2>
            <p className="mt-1 text-sm text-ancient-brown/70">
              用当前时间起一卦，看看效果
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-ancient-gold transition group-hover:translate-x-1" />
        </Link>

        <Link
          to="/history"
          className="ancient-card group flex items-start gap-4 hover:-translate-y-0.5"
        >
          <Sparkles className="h-8 w-8 shrink-0 text-ancient-orange" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-ancient-red">占卜历史</h2>
            <p className="mt-1 text-sm text-ancient-brown/70">
              查看保存在本地的占卜记录
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-ancient-gold transition group-hover:translate-x-1" />
        </Link>
      </section>

      <section className="mt-12 ancient-card">
        <h3 className="text-lg font-semibold text-ancient-red">如何新增一个术数模块？</h3>
        <pre className="mt-3 overflow-x-auto rounded bg-stone-900/90 p-4 text-xs text-stone-100">
{`pnpm add-module <kebab-name> "<中文标题>" <path-segment>

# 示例
pnpm add-module taiyi "太乙神数" /taiyi

# 这会自动：
#  1) 创建 src/utils/<kebab>Calculator.ts
#  2) 创建 src/pages/<Pascal>Page.tsx
#  3) 在 src/App.tsx 注册路由
#  4) 在首页 features 中追加卡片`}
        </pre>
      </section>
    </main>
  );
}