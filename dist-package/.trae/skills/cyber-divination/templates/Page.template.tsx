// Page 模板 - 复制后把 __NAME__/__KEBAB__/__TITLE__/__ROUTE__ 替换为真实值
import { useState } from 'react';
import { motion } from 'framer-motion';
import { calc__NAME__, type __NAME__Input, type __NAME__Result } from '@/utils/__KEBAB__Calculator';

export default function __NAME__Page() {
  const [input, setInput] = useState<__NAME__Input>({ question: '' });
  const [result, setResult] = useState<__NAME__Result | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResult(calc__NAME__(input));
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <motion.h1 className="text-3xl font-bold text-ancient-red">__TITLE__</motion.h1>
      <p className="mt-2 text-sm text-ancient-brown/70">模块简介</p>

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
        <button type="submit" className="rounded bg-ancient-red px-4 py-2 text-white hover:bg-ancient-red/90">
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