import { useState } from 'react';
import { motion } from 'framer-motion';
import { calcDemo, type DemoInput, type DemoResult } from '@/utils/demoCalculator';
import { useDivinationStore } from '@/store/divinationStore';
import { formatDate } from '@/lib/utils';

export default function DemoPage() {
  const [input, setInput] = useState<DemoInput>({ question: '' });
  const [result, setResult] = useState<DemoResult | null>(null);
  const addRecord = useDivinationStore((s) => s.addRecord);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = calcDemo(input);
    setResult(r);
    addRecord({ module: 'demo', question: input.question, summary: r.summary });
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold ancient-title"
      >
        示范·起卦
      </motion.h1>
      <p className="mt-2 text-sm text-ancient-brown/70">
        这是脚手架内置的最小演示，用当前时间起一卦。生产模块请用 <code>pnpm add-module</code> 生成。
      </p>

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-4 ancient-card"
      >
        <label className="block">
          <span className="text-sm text-ancient-brown">您的问题</span>
          <textarea
            value={input.question}
            onChange={(e) => setInput({ ...input, question: e.target.value })}
            className="mt-1 w-full rounded border border-ancient-gold/40 bg-transparent p-2 outline-none focus:border-ancient-red"
            rows={3}
            placeholder="比如：近期事业如何？"
          />
        </label>
        <div className="text-xs text-ancient-brown/60">起卦时间：{formatDate()}</div>
        <button
          type="submit"
          className="rounded bg-ancient-red px-5 py-2 text-white transition hover:bg-ancient-red/90"
        >
          起卦
        </button>
      </form>

      {result && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 ancient-card"
        >
          <h2 className="text-xl font-semibold text-ancient-red">卦象</h2>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center">
            <Stat label="上卦" value={result.hexagramName.slice(0, 1)} />
            <Stat label="下卦" value={result.hexagramName.slice(1, 2)} />
            <Stat label="动爻" value={`第 ${result.changing} 爻`} />
          </div>
          <p className="mt-4 whitespace-pre-wrap text-ancient-brown">{result.summary}</p>
        </motion.section>
      )}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-ancient-gold/30 bg-ancient-gold/5 p-3">
      <div className="text-xs text-ancient-brown/60">{label}</div>
      <div className="mt-1 text-2xl font-bold text-ancient-red">{value}</div>
    </div>
  );
}