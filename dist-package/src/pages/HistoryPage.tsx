import { Trash2 } from 'lucide-react';
import { useDivinationStore } from '@/store/divinationStore';

export default function HistoryPage() {
  const { history, clear } = useDivinationStore();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold ancient-title">占卜历史</h1>
        {history.length > 0 && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center gap-1 rounded border border-ancient-red/40 px-3 py-1 text-sm text-ancient-red hover:bg-ancient-red/10"
          >
            <Trash2 className="h-4 w-4" />
            清空
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="mt-6 text-sm text-ancient-brown/60">还没有占卜记录。</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {history.map((r) => (
            <li key={r.id} className="ancient-card">
              <div className="text-xs text-ancient-brown/60">
                {new Date(r.createdAt).toLocaleString('zh-CN')} · {r.module}
              </div>
              <div className="mt-1 text-sm text-ancient-brown">问：{r.question || '（无）'}</div>
              <div className="mt-1 text-sm">{r.summary}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}