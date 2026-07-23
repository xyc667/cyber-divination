import { create } from 'zustand';
import { QimenResult } from '../utils/qimenCalculator';
import { ZhouyiResult } from '../utils/zhouyiCalculator';
import { LiuyaoResult } from '../utils/liuyaoCalculator';

export interface DivinationRecord {
  id: string;
  type: 'qimen' | 'zhouyi' | 'liuyao';
  timestamp: number;
  qimenResult?: QimenResult;
  zhouyiResult?: ZhouyiResult;
  liuyaoResult?: LiuyaoResult;
}

interface DivinationStore {
  records: DivinationRecord[];
  addRecord: (record: Omit<DivinationRecord, 'id' | 'timestamp'>) => void;
  removeRecord: (id: string) => void;
  clearRecords: () => void;
}

export const useDivinationStore = create<DivinationStore>((set) => ({
  records: [],
  addRecord: (record) => set((state) => ({
    records: [{
      ...record,
      id: Date.now().toString(),
      timestamp: Date.now()
    }, ...state.records]
  })),
  removeRecord: (id) => set((state) => ({
    records: state.records.filter(r => r.id !== id)
  })),
  clearRecords: () => set({ records: [] })
}));
