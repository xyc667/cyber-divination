export interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  content: string;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  items: KnowledgeItem[];
}

export const knowledgeBase: KnowledgeCategory[] = [
  {
    id: 'qimen',
    name: '奇门遁甲',
    icon: 'Compass',
    description: '古代高层次预测学的核心知识',
    items: [
      {
        id: 'qimen-1',
        category: '奇门遁甲',
        title: '什么是奇门遁甲',
        content: '奇门遁甲是中国古代的一种高层次预测学，属于术数体系的重要组成部分。它结合了天文学、历法、阴阳五行等理论，通过特定的排盘方法来预测事物的发展趋势。奇门遁甲起源于军事，后逐渐应用于日常生活的各个方面。'
      },
      {
        id: 'qimen-2',
        category: '奇门遁甲',
        title: '九星详解',
        content: '九星是奇门遁甲中的重要元素，包括：天蓬、天任、天冲、天辅、天英、天芮、天柱、天心、天禽。每颗星都有其独特的性质和象征意义，在排盘中代表不同的事物和方位。'
      },
      {
        id: 'qimen-3',
        category: '奇门遁甲',
        title: '八门含义',
        content: '八门指休门、生门、伤门、杜门、景门、死门、惊门、开门。其中休门、生门、开门为吉门，其余为凶门或平门。八门代表不同的人事活动和状态。'
      },
      {
        id: 'qimen-4',
        category: '奇门遁甲',
        title: '八卦方位',
        content: '奇门遁甲的九宫格对应八卦：坎一宫、坤二宫、震三宫、巽四宫、中五宫、乾六宫、兑七宫、艮八宫、离九宫。每个宫位都有其特定的方位和象征意义。'
      }
    ]
  },
  {
    id: 'zhouyi',
    name: '周易占卜',
    icon: 'BookOpen',
    description: '易经六十四卦的智慧解读',
    items: [
      {
        id: 'zhouyi-1',
        category: '周易占卜',
        title: '周易简介',
        content: '《周易》又称《易经》，是中国古代最重要的哲学经典之一。它以八卦和六十四卦为基础，通过卦象变化来揭示宇宙万物的变化规律，被誉为"群经之首"。'
      },
      {
        id: 'zhouyi-2',
        category: '周易占卜',
        title: '八卦的含义',
        content: '八卦分别是：乾(天)、坤(地)、震(雷)、巽(风)、坎(水)、离(火)、艮(山)、兑(泽)。每卦代表一种自然现象和相应的象征意义，如乾代表刚健、坤代表柔顺。'
      },
      {
        id: 'zhouyi-3',
        category: '周易占卜',
        title: '六十四卦的构成',
        content: '六十四卦由两个八卦相叠而成，上卦称为"上卦"或"外卦"，下卦称为"下卦"或"内卦"。每一卦都有卦名、卦辞和爻辞，用于解释卦象的含义。'
      },
      {
        id: 'zhouyi-4',
        category: '周易占卜',
        title: '变爻的意义',
        content: '在占卜中，某些爻可能会发生变化，称为"变爻"。变爻意味着事物正在发生变化，需要特别关注。变爻的爻辞往往揭示了变化的趋势和应对之道。'
      }
    ]
  },
  {
    id: 'liuyao',
    name: '六爻预测',
    icon: 'Coins',
    description: '传统六爻占卜的方法与技巧',
    items: [
      {
        id: 'liuyao-1',
        category: '六爻预测',
        title: '六爻简介',
        content: '六爻预测是一种基于《周易》的占卜方法，通过投掷三枚铜钱六次得到六个爻，组成一个卦象。六爻预测注重细节，常用于具体事项的预测。'
      },
      {
        id: 'liuyao-2',
        category: '六爻预测',
        title: '铜钱投掷方法',
        content: '传统六爻使用三枚铜钱，投掷六次。每次投掷的结果决定一个爻：三个正面为老阳(变爻)，三个背面为老阴(变爻)，两正一背为少阳，两背一正为少阴。'
      },
      {
        id: 'liuyao-3',
        category: '六爻预测',
        title: '六亲与用神',
        content: '在六爻中，将卦中的地支与五行结合，产生六亲关系：父母、官鬼、妻财、兄弟、子孙。根据所问之事选择对应的用神，用神的旺衰决定事情的成败。'
      },
      {
        id: 'liuyao-4',
        category: '六爻预测',
        title: '卦变的解读',
        content: '当卦中有变爻时，会产生一个"之卦"。解读时需要同时参考本卦和之卦，变爻的爻辞尤为重要，它揭示了事物发展的转折点。'
      }
    ]
  },
  {
    id: 'shefu',
    name: '射覆游戏',
    icon: 'Eye',
    description: '古代智慧游戏的规则与技巧',
    items: [
      {
        id: 'shefu-1',
        category: '射覆游戏',
        title: '射覆的起源',
        content: '射覆起源于汉代，是一种古老的猜物游戏。"射"是猜测的意思，"覆"是覆盖隐藏。东方朔、管辂等历史名人都以擅长射覆而闻名。'
      },
      {
        id: 'shefu-2',
        category: '射覆游戏',
        title: '射覆的方法',
        content: '射覆通常结合占卜进行，通过起卦来推断隐藏物品的性质、形状、颜色等特征。考验占卜者对卦象的理解和灵活运用能力。'
      },
      {
        id: 'shefu-3',
        category: '射覆游戏',
        title: '射覆的技巧',
        content: '射覆需要综合运用卦象、五行、方位等知识。观察卦象的整体特征，结合生活常识进行推理，往往能提高猜中的几率。'
      },
      {
        id: 'shefu-4',
        category: '射覆游戏',
        title: '射覆的意义',
        content: '射覆不仅是一种游戏，更是一种锻炼思维和占卜技巧的方式。通过射覆，可以加深对易经和占卜理论的理解，培养直觉和洞察力。'
      }
    ]
  },
  {
    id: 'culture',
    name: '文化背景',
    icon: 'Sparkles',
    description: '占卜文化的历史与传承',
    items: [
      {
        id: 'culture-1',
        category: '文化背景',
        title: '占卜的历史',
        content: '占卜在中国有着悠久的历史，可以追溯到新石器时代。从甲骨卜辞到周易八卦，占卜文化贯穿了中国五千年的文明史，是中华文化的重要组成部分。'
      },
      {
        id: 'culture-2',
        category: '文化背景',
        title: '阴阳五行学说',
        content: '阴阳五行学说是中国古代哲学的核心，也是占卜的理论基础。阴阳代表对立统一，五行(金木水火土)代表物质的五种基本形态及其相互关系。'
      },
      {
        id: 'culture-3',
        category: '文化背景',
        title: '天干地支',
        content: '天干(甲乙丙丁戊己庚辛壬癸)和地支(子丑寅卯辰巳午未申酉戌亥)是中国古代的纪年和纪时系统，广泛应用于历法、占卜、风水等领域。'
      },
      {
        id: 'culture-4',
        category: '文化背景',
        title: '占卜与哲学',
        content: '占卜不仅仅是预测未来，更是一种哲学思考方式。它引导人们观察自然、思考人生，在变化中寻找规律，在不确定性中把握方向。'
      }
    ]
  }
];

export function getCategoryById(id: string): KnowledgeCategory | undefined {
  return knowledgeBase.find(cat => cat.id === id);
}

export function getAllCategories(): KnowledgeCategory[] {
  return knowledgeBase;
}

export function getKnowledgeItemById(id: string): KnowledgeItem | undefined {
  for (const category of knowledgeBase) {
    const item = category.items.find(item => item.id === id);
    if (item) return item;
  }
  return undefined;
}
