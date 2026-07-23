// 示范计算器 - 一个最简单的「时间起卦」实现
// 你可以把它替换成周易 / 八字 / 梅花易数 等真正的术数算法

export interface DemoInput {
  question: string;
  datetime?: Date;
}

export interface DemoResult {
  upper: number; // 上卦 0-7
  lower: number; // 下卦 0-7
  changing: number; // 动爻 1-6
  summary: string;
  hexagramName: string;
}

const TRIGRAMS = ['坤', '震', '坎', '兑', '艮', '离', '巽', '乾'] as const;

function mod8(n: number) {
  return ((n % 8) + 8) % 8;
}

export function calcDemo(input: DemoInput): DemoResult {
  const dt = input.datetime ?? new Date();
  // 简单起卦：用年+月+日+时之和作种子
  const seed = dt.getFullYear() + (dt.getMonth() + 1) + dt.getDate() + dt.getHours();
  const upper = mod8(seed);
  const lower = mod8(seed * 3 + 7);
  const changing = ((seed * 5) % 6) + 1;

  const hexagramName = `${TRIGRAMS[upper]}${TRIGRAMS[lower]}`;
  const summary = input.question
    ? `所问「${input.question}」以 ${hexagramName} 示之，动爻在第 ${changing} 爻。`
    : `此时得 ${hexagramName}，动爻在第 ${changing} 爻。`;

  return { upper, lower, changing, summary, hexagramName };
}