export interface ShefuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  hints: string[];
  features: string[];
}

export interface GuessResult {
  question: string;
  remainingItems: ShefuItem[];
  isFinalGuess: boolean;
  guess?: string;
}

export interface ShefuResult {
  item: ShefuItem;
  hexagram: string;
  interpretation: string;
  guessed: boolean;
}

const SHEFU_ITEMS: ShefuItem[] = [
  {
    id: '1',
    name: '铜钱',
    category: '器物',
    description: '圆形方孔，外圆内方',
    hints: ['外圆内方', '古代货币', '可串成串'],
    features: ['圆形', '金属', '古代', '货币', '小巧']
  },
  {
    id: '2',
    name: '毛笔',
    category: '文房',
    description: '书写工具，毛制笔头',
    hints: ['文房四宝', '书写绘画', '竹制笔杆'],
    features: ['书写', '竹子', '毛发', '细长', '文房']
  },
  {
    id: '3',
    name: '印章',
    category: '文房',
    description: '方形篆刻，朱红印记',
    hints: ['金石篆刻', '书画落款', '方形为主'],
    features: ['方形', '石头', '篆刻', '红色', '文房']
  },
  {
    id: '4',
    name: '玉佩',
    category: '饰品',
    description: '温润如玉，君子之器',
    hints: ['君子比德', '温润光泽', '挂于腰间'],
    features: ['玉石', '饰品', '温润', '挂件', '圆形']
  },
  {
    id: '5',
    name: '围棋',
    category: '游戏',
    description: '黑白分明，棋盘纵横',
    hints: ['黑白棋子', '纵横十九道', '策略游戏'],
    features: ['黑白', '棋子', '策略', '游戏', '圆形']
  },
  {
    id: '6',
    name: '古琴',
    category: '乐器',
    description: '七弦之音，高山流水',
    hints: ['七弦乐器', '文人雅器', '桐木制成'],
    features: ['乐器', '七弦', '木头', '弹奏', '长形']
  },
  {
    id: '7',
    name: '灯笼',
    category: '器物',
    description: '竹骨纸衣，光明使者',
    hints: ['照亮黑夜', '竹骨纸糊', '节日喜庆'],
    features: ['照明', '竹子', '纸', '喜庆', '悬挂']
  },
  {
    id: '8',
    name: '茶壶',
    category: '茶具',
    description: '紫砂为上，茶香四溢',
    hints: ['品茶雅器', '紫砂为佳', '有嘴有把'],
    features: ['茶具', '紫砂', '陶瓷', '有嘴', '有把']
  },
  {
    id: '9',
    name: '砚台',
    category: '文房',
    description: '墨海砚田，研磨墨汁',
    hints: ['文房四宝', '研磨墨汁', '石头制成'],
    features: ['石头', '文房', '研磨', '黑色', '方形']
  },
  {
    id: '10',
    name: '折扇',
    category: '器物',
    description: '开合自如，清风徐来',
    hints: ['文人雅士', '夏日必备', '扇面书画'],
    features: ['折叠', '竹子', '纸', '夏日', '书画']
  },
  {
    id: '11',
    name: '笛子',
    category: '乐器',
    description: '竹制管乐，悠扬动听',
    hints: ['竹制乐器', '横吹为笛', '七孔发音'],
    features: ['乐器', '竹子', '管乐', '七孔', '细长']
  },
  {
    id: '12',
    name: '香炉',
    category: '器物',
    description: '青烟袅袅，静心安神',
    hints: ['焚香祈福', '青铜铸造', '三足鼎立'],
    features: ['青铜', '焚香', '三足', '圆形', '祭祀']
  },
  {
    id: '13',
    name: '宝剑',
    category: '兵器',
    description: '百炼精钢，削铁如泥',
    hints: ['锋刃利器', '三尺青锋', '君子佩剑'],
    features: ['兵器', '金属', '锋利', '长形', '双刃']
  },
  {
    id: '14',
    name: '棋盘',
    category: '游戏',
    description: '楚河汉界，将帅对弈',
    hints: ['楚汉相争', '三十二子', '策略博弈'],
    features: ['方形', '木头', '游戏', '棋盘', '线条']
  },
  {
    id: '15',
    name: '书卷',
    category: '书籍',
    description: '线装典籍，传承智慧',
    hints: ['四书五经', '线装装订', '墨香纸韵'],
    features: ['纸', '书籍', '线装', '文字', '折叠']
  }
];

const YES_NO_QUESTIONS = [
  {
    question: '此物是否为圆形？',
    feature: '圆形'
  },
  {
    question: '此物是否为方形？',
    feature: '方形'
  },
  {
    question: '此物是否为金属制成？',
    feature: '金属'
  },
  {
    question: '此物是否为木头制成？',
    feature: '木头'
  },
  {
    question: '此物是否为竹子制成？',
    feature: '竹子'
  },
  {
    question: '此物是否为石头制成？',
    feature: '石头'
  },
  {
    question: '此物是否为陶瓷制成？',
    feature: '陶瓷'
  },
  {
    question: '此物是否为纸制成？',
    feature: '纸'
  },
  {
    question: '此物是否为乐器？',
    feature: '乐器'
  },
  {
    question: '此物是否为文房用品？',
    feature: '文房'
  },
  {
    question: '此物是否为饰品？',
    feature: '饰品'
  },
  {
    question: '此物是否为兵器？',
    feature: '兵器'
  },
  {
    question: '此物是否为茶具？',
    feature: '茶具'
  },
  {
    question: '此物是否用于游戏？',
    feature: '游戏'
  },
  {
    question: '此物是否为古代货币？',
    feature: '货币'
  },
  {
    question: '此物是否可以书写？',
    feature: '书写'
  },
  {
    question: '此物是否细长？',
    feature: '细长'
  },
  {
    question: '此物是否小巧？',
    feature: '小巧'
  }
];

const HEXAGRAM_INTERPRETATIONS: Record<string, (item: ShefuItem) => string> = {
  '乾': (item) => `乾为天，刚健中正。此物${item.category === '器物' ? '坚固耐用' : item.category === '文房' ? '文雅高贵' : '具有阳刚之气'}，形态端正。`,
  '坤': (item) => `坤为地，厚德载物。此物${item.category === '饰品' ? '温润如玉' : item.category === '器物' ? '包容实用' : '蕴含柔顺之美'}。`,
  '震': (item) => `震为雷，动而有声。此物${item.category === '乐器' ? '声如雷震' : '或有震动之象'}，能发出声响。`,
  '巽': (item) => `巽为风，轻盈灵动。此物${item.category === '器物' ? '轻巧便携' : '形态飘逸'}，易于携带。`,
  '坎': (item) => `坎为水，润泽万物。此物${item.category === '茶具' ? '与水相关' : '或有流动之性'}。`,
  '离': (item) => `离为火，光明照耀。此物${item.category === '器物' ? '或与火相关' : '光彩夺目'}，明亮温暖。`,
  '艮': (item) => `艮为山，静止安稳。此物${item.category === '文房' ? '沉稳厚重' : '坚固不动'}，形态稳重。`,
  '兑': (item) => `兑为泽，喜悦和悦。此物${item.category === '饰品' ? '赏心悦目' : '令人愉悦'}，带来欢乐。`
};

function getRandomItem(): ShefuItem {
  const index = Math.floor(Math.random() * SHEFU_ITEMS.length);
  return SHEFU_ITEMS[index];
}

function getRandomHexagram(): string {
  const hexagrams = ['乾', '坤', '震', '巽', '坎', '离', '艮', '兑'];
  return hexagrams[Math.floor(Math.random() * hexagrams.length)];
}

function generateInterpretation(item: ShefuItem, hexagram: string): string {
  const baseInterpretation = HEXAGRAM_INTERPRETATIONS[hexagram] || ((item) => `此卦为${hexagram}卦。`);
  return baseInterpretation(item);
}

export function startShefu(): { item: ShefuItem; hexagram: string; interpretation: string } {
  const item = getRandomItem();
  const hexagram = getRandomHexagram();
  const interpretation = generateInterpretation(item, hexagram);
  
  return { item, hexagram, interpretation };
}

export function checkGuess(guess: string, answer: string): boolean {
  return guess.trim() === answer;
}

export function getAllItems(): ShefuItem[] {
  return SHEFU_ITEMS;
}

export function getInitialQuestion(): { question: string; feature: string } {
  return YES_NO_QUESTIONS[0];
}

export function filterItemsByAnswer(
  items: ShefuItem[],
  questionIndex: number,
  answer: boolean
): ShefuItem[] {
  const question = YES_NO_QUESTIONS[questionIndex];
  if (answer) {
    return items.filter(item => item.features.includes(question.feature));
  } else {
    return items.filter(item => !item.features.includes(question.feature));
  }
}

export function getNextQuestion(questionIndex: number): { question: string; feature: string } | null {
  if (questionIndex < YES_NO_QUESTIONS.length - 1) {
    return YES_NO_QUESTIONS[questionIndex + 1];
  }
  return null;
}

export function makeFinalGuess(items: ShefuItem[]): string {
  if (items.length === 0) return '无法确定';
  if (items.length === 1) return items[0].name;
  return items[Math.floor(Math.random() * items.length)].name;
}
