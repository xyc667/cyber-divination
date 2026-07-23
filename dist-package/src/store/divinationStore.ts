import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DivinationRecord {
  id: string;
  module: string;
  question: string;
  summary: string;
  createdAt: string;
}

interface DivinationState {
  history: DivinationRecord[];
  addRecord: (r: Omit<DivinationRecord, 'id' | 'createdAt'>) => void;
  clear: () => void;
}

export const useDivinationStore = create<DivinationState>()(
  persist(
    (set) => ({
      history: [],
      addRecord: (r) =>
        set((s) => ({
          history: [
            {
              ...r,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
            },
            ...s.history,
          ].slice(0, 50),
        })),
      clear: () => set({ history: [] }),
    }),
    { name: 'cyber-divination-history' },
  ),
);