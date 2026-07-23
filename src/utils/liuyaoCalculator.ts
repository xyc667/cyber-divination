export interface LiuyaoLine {
  position: number;
  yang: boolean;
  changing: boolean;
}

export interface LiuyaoResult {
  lines: LiuyaoLine[];
  hexagram: string;
  interpretation: string;
  summary: string;
}

const YIN_SYMBOL = '⚋';
const YANG_SYMBOL = '⚊';
const YIN_CHANGING = '⚏';
const YANG_CHANGING = '⚎';

const INTERPRETATIONS = {
  start: {
    yang: '初爻阳动：潜龙勿用，时机未到',
    yin: '初爻阴静：根基未稳，宜守不宜进'
  },
  second: {
    yang: '二爻阳动：见龙在田，利见大人',
    yin: '二爻阴静：积蓄力量，静待时机'
  },
  third: {
    yang: '三爻阳动：终日乾乾，夕惕若厉',
    yin: '三爻阴静：进退有度，谨慎行事'
  },
  fourth: {
    yang: '四爻阳动：或跃在渊，无咎',
    yin: '四爻阴静：居安思危，守正不阿'
  },
  fifth: {
    yang: '五爻阳动：飞龙在天，利见大人',
    yin: '五爻阴静：位高权重，戒骄戒躁'
  },
  top: {
    yang: '上爻阳动：亢龙有悔，物极必反',
    yin: '上爻阴静：穷则变，变则通'
  }
};

function tossCoin(): number {
  return Math.floor(Math.random() * 3) + 1;
}

function generateLine(tossResult: number): { yang: boolean; changing: boolean } {
  if (tossResult === 3) {
    return { yang: false, changing: true };
  } else if (tossResult === 4) {
    return { yang: true, changing: true };
  } else if (tossResult === 2) {
    return { yang: false, changing: false };
  } else {
    return { yang: true, changing: false };
  }
}

function getLineSymbol(line: LiuyaoLine): string {
  if (line.changing) {
    return line.yang ? YANG_CHANGING : YIN_CHANGING;
  }
  return line.yang ? YANG_SYMBOL : YIN_SYMBOL;
}

function generateHexagram(lines: LiuyaoLine[]): string {
  return lines.map(getLineSymbol).join('');
}

function generateInterpretation(lines: LiuyaoLine[]): string {
  const interpretations: string[] = [];
  const positions = ['start', 'second', 'third', 'fourth', 'fifth', 'top'] as const;
  
  lines.forEach((line, index) => {
    const position = positions[index];
    const key = line.yang ? 'yang' : 'yin';
    interpretations.push(INTERPRETATIONS[position][key]);
  });
  
  return interpretations.join('\n');
}

function generateSummary(lines: LiuyaoLine[]): string {
  const yangCount = lines.filter(l => l.yang).length;
  const changingCount = lines.filter(l => l.changing).length;
  
  if (changingCount > 3) {
    return '变爻较多，事物变化剧烈，需灵活应对';
  } else if (yangCount > 4) {
    return '阳爻居多，气势旺盛，宜积极进取';
  } else if (yangCount < 2) {
    return '阴爻居多，需守静待机，不宜冒进';
  } else {
    return '阴阳平衡，形势稳定，吉中带祥';
  }
}

export function calculateLiuyao(): LiuyaoResult {
  const lines: LiuyaoLine[] = [];
  
  for (let i = 0; i < 6; i++) {
    const toss = tossCoin();
    const line = generateLine(toss);
    lines.push({
      position: i + 1,
      yang: line.yang,
      changing: line.changing
    });
  }
  
  const hexagram = generateHexagram(lines);
  const interpretation = generateInterpretation(lines);
  const summary = generateSummary(lines);
  
  return {
    lines,
    hexagram,
    interpretation,
    summary
  };
}

export function simulateCoinToss(): number {
  return tossCoin();
}
