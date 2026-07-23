// 八卦信息
export const BA_GUA = [
  { name: '乾', pinyin: 'qián', wuxing: '金', symbol: '☰', position: 1, natural: '天', family: '父', direction: '西北' },
  { name: '兑', pinyin: 'duì', wuxing: '金', symbol: '☱', position: 2, natural: '泽', family: '少女', direction: '西' },
  { name: '离', pinyin: 'lí', wuxing: '火', symbol: '☲', position: 3, natural: '火', family: '中女', direction: '南' },
  { name: '震', pinyin: 'zhèn', wuxing: '木', symbol: '☳', position: 4, natural: '雷', family: '长男', direction: '东' },
  { name: '巽', pinyin: 'xùn', wuxing: '木', symbol: '☴', position: 5, natural: '风', family: '长女', direction: '东南' },
  { name: '坎', pinyin: 'kǎn', wuxing: '水', symbol: '☵', position: 6, natural: '水', family: '中男', direction: '北' },
  { name: '艮', pinyin: 'gèn', wuxing: '土', symbol: '☶', position: 7, natural: '山', family: '少男', direction: '东北' },
  { name: '坤', pinyin: 'kūn', wuxing: '土', symbol: '☷', position: 8, natural: '地', family: '母', direction: '西南' }
];

// 五行生克关系
export const WUXING_RELATIONS = {
  '木': { '生': '火', '克': '土', '被生': '水', '被克': '金' },
  '火': { '生': '土', '克': '金', '被生': '木', '被克': '水' },
  '土': { '生': '金', '克': '水', '被生': '火', '被克': '木' },
  '金': { '生': '水', '克': '木', '被生': '土', '被克': '火' },
  '水': { '生': '木', '克': '火', '被生': '金', '被克': '土' }
};

// 获取八卦
export function getGua(index: number) {
  return BA_GUA[(index - 1 + 8) % 8];
}

// 通过数字起卦（上卦）
export function getUpperGua(num: number): number {
  return (num % 8 === 0) ? 8 : (num % 8);
}

// 通过数字起卦（下卦）
export function getLowerGua(num: number): number {
  return (num % 8 === 0) ? 8 : (num % 8);
}

// 计算动爻
export function getMovingLine(num: number): number {
  const remainder = num % 6;
  return remainder === 0 ? 6 : remainder;
}

// 从时间起卦
export function getGuaFromTime(year: number, month: number, day: number, hour: number): {
  upperGua: number;
  lowerGua: number;
  movingLine: number;
} {
  const total = year + month + day;
  const upperGua = getUpperGua(total);
  const totalWithHour = total + hour;
  const lowerGua = getLowerGua(totalWithHour);
  const movingLine = getMovingLine(totalWithHour);
  
  return { upperGua, lowerGua, movingLine };
}

// 从两个数字起卦
export function getGuaFromNumbers(num1: number, num2: number): {
  upperGua: number;
  lowerGua: number;
  movingLine: number;
} {
  const upperGua = getUpperGua(num1);
  const lowerGua = getLowerGua(num2);
  const total = num1 + num2;
  const movingLine = getMovingLine(total);
  
  return { upperGua, lowerGua, movingLine };
}

// 从文字起卦（笔画数）
export function getGuaFromText(text: string): {
  upperGua: number;
  lowerGua: number;
  movingLine: number;
} {
  let totalStrokes = 0;
  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    // 简化的笔画计算（实际应使用字典）
    totalStrokes += charCode % 26 + 1;
  }
  
  const upperGua = getUpperGua(totalStrokes);
  const lowerGua = getLowerGua(totalStrokes);
  const movingLine = getMovingLine(totalStrokes);
  
  return { upperGua, lowerGua, movingLine };
}

// 获取互卦
export function getHuGua(upperGua: number, lowerGua: number): {
  upperHu: number;
  lowerHu: number;
} {
  // 互卦：取本卦2、3、4爻为下互，3、4、5爻为上互
  // 简化处理：使用数字计算
  const upperHu = ((upperGua + lowerGua) % 8) || 8;
  const lowerHu = ((upperGua * 2 + lowerGua) % 8) || 8;
  
  return { upperHu, lowerHu };
}

// 获取变卦
export function getBianGua(upperGua: number, lowerGua: number, movingLine: number): {
  newUpperGua: number;
  newLowerGua: number;
} {
  // 如果动爻在上卦（1-3爻），则上卦变；否则下卦变
  if (movingLine <= 3) {
    // 上卦变
    const newUpper = (upperGua > 4) ? (upperGua - 4) : (upperGua + 4);
    return { newUpperGua: newUpper, newLowerGua: lowerGua };
  } else {
    // 下卦变
    const newLower = (lowerGua > 4) ? (lowerGua - 4) : (lowerGua + 4);
    return { newUpperGua: upperGua, newLowerGua: newLower };
  }
}

// 判断体用关系
export function getTiYongRelation(movingLine: number, upperGua: number, lowerGua: number): {
  tiGua: number;
  yongGua: number;
  tiInfo: any;
  yongInfo: any;
  relation: string;
  description: string;
} {
  const isUpperMoving = movingLine <= 3;
  const tiGua = isUpperMoving ? lowerGua : upperGua;
  const yongGua = isUpperMoving ? upperGua : lowerGua;
  
  const tiInfo = getGua(tiGua);
  const yongInfo = getGua(yongGua);
  
  const tiWuxing = tiInfo.wuxing;
  const yongWuxing = yongInfo.wuxing;
  
  let relation = '';
  let description = '';
  
  if (tiWuxing === yongWuxing) {
    relation = '比和';
    description = '体用比和，吉，事易成。';
  } else if (WUXING_RELATIONS[tiWuxing]?.生 === yongWuxing) {
    relation = '生克';
    description = `${tiInfo.name}生${yongInfo.name}，体生用，虽吉但费力，需付出。`;
  } else if (WUXING_RELATIONS[yongWuxing]?.生 === tiWuxing) {
    relation = '被生';
    description = `${yongInfo.name}生${tiInfo.name}，用生体，大吉，有贵人相助。`;
  } else if (WUXING_RELATIONS[tiWuxing]?.克 === yongWuxing) {
    relation = '克制';
    description = `${tiInfo.name}克${yongInfo.name}，体克用，吉，事可成。`;
  } else if (WUXING_RELATIONS[yongWuxing]?.克 === tiWuxing) {
    relation = '被克';
    description = `${yongInfo.name}克${tiInfo.name}，用克体，凶，事难成，需谨慎。`;
  }
  
  return { tiGua, yongGua, tiInfo, yongInfo, relation, description };
}

// 获取断语
export function getDuanyu(upperGua: number, lowerGua: number, movingLine: number): string {
  const upper = getGua(upperGua);
  const lower = getGua(lowerGua);
  
  const duanyuMap: Record<string, string> = {
    '乾乾': '天行健，君子以自强不息。吉，刚健有力，事业有成。',
    '坤坤': '地势坤，君子以厚德载物。吉，柔顺包容，得众人助。',
    '乾坤': '天地交泰，阴阳和谐。吉，诸事顺遂，万物亨通。',
    '坤乾': '否极泰来，先难后易。先凶后吉，守正待机。',
    '震震': '震惊百里，不丧匕鬯。动而不乱，虽惊无险。',
    '巽巽': '随风巽，君子以申命行事。谦逊顺从，行事顺畅。',
    '坎坎': '习坎，有孚维心亨。险中求胜，诚信可通。',
    '离离': '明两作，离，大人以继明照于四方。光明普照，事业光明。',
    '艮艮': '艮其背，不获其身。止而不动，守静为宜。',
    '兑兑': '丽泽兑，君子以朋友讲习。朋友相助，喜悦和合。',
    '乾震': '天雷无妄，元亨利贞。无妄之灾，谨慎行事。',
    '震乾': '雷天大壮，大者正也。壮大之时，守正不阿。',
    '乾巽': '天风姤，女壮，勿用取女。相遇之时，审慎抉择。',
    '巽乾': '风天小畜，密云不雨。小有蓄积，待时而动。',
    '乾坎': '天水讼，有孚窒惕。争讼之事，慎之又慎。',
    '坎乾': '水天需，有孚光亨。需待之时，诚信待之。',
    '乾离': '天火同人，同人于野。与人同心，事业可成。',
    '离乾': '火天大有，元亨。大有之时，亨通顺利。',
    '乾艮': '天山遁，遁而亨。适时退避，守道保身。',
    '艮乾': '山天大畜，刚健笃实。大畜之时，积蓄力量。',
    '乾兑': '天泽履，履道坦坦。行走正道，前途平坦。',
    '兑乾': '泽天夬，扬于王庭。决断之时，果断行事。',
    '坤震': '地雷复，其见天地之心乎。复归之时，返本归元。',
    '震坤': '雷地豫，利建侯行师。安乐之时，顺势而动。',
    '坤巽': '地风升，君子以顺德。上升之时，顺势而为。',
    '巽坤': '风地观，盥而不荐。观察之时，静观其变。',
    '坤坎': '地水师，贞，丈人吉。师旅之事，得人者吉。',
    '坎坤': '水地比，比，吉。亲比之时，得人相助。',
    '坤离': '地火明夷，利艰贞。光明受损，守正克难。',
    '离坤': '火地晋，康侯用锡马蕃庶。晋升之时，顺势而上。',
    '坤艮': '地山谦，君子以裒多益寡。谦逊待人，受益无穷。',
    '艮坤': '山地剥，不利有攸往。剥落之时，不宜妄动。',
    '坤兑': '地泽临，元亨利贞。莅临之时，施德于民。',
    '兑坤': '泽地萃，王假有庙。聚集之时，得人拥戴。',
    '震巽': '雷风恒，亨无咎。恒久之道，持之以恒。',
    '巽震': '风雷益，利有攸往。受益之时，顺势而行。',
    '震坎': '雷水解，险以说。解除困难，险中得吉。',
    '坎震': '水雷屯，元亨利贞。始生之时，艰难创业。',
    '震离': '雷火丰，亨，王假之。丰盛之时，事业有成。',
    '离震': '火雷噬嗑，利用狱。咬合之事，明断是非。',
    '震艮': '雷山小过，亨，利贞。小有过度，守正为宜。',
    '艮震': '山雷颐，贞吉。颐养之道，守正得吉。',
    '震兑': '雷泽归妹，征凶。归妹之时，不宜远征。',
    '兑震': '泽雷随，元亨利贞。随从之时，顺势而为。',
    '巽坎': '风水涣，亨，王假有庙。涣散之时，聚而合之。',
    '坎巽': '水风井，改邑不改井。井养之道，持之以恒。',
    '巽离': '风火家人，利女贞。家人之道，女子贞吉。',
    '离巽': '火风鼎，元吉，亨。鼎新之时，吉祥亨通。',
    '巽艮': '风山渐，女归吉。渐进之时，女子得吉。',
    '艮巽': '山风蛊，元亨。蛊坏之时，整治革新。',
    '巽兑': '风泽中孚，豚鱼吉。诚信之道，感动万物。',
    '兑巽': '泽风大过，栋桡。太过之时，谨慎行事。',
    '坎离': '水火既济，亨。既济之时，万事就绪。',
    '离坎': '火水未济，亨。未济之时，待时而动。',
    '坎艮': '水山蹇，利西南。蹇难之时，往西南吉。',
    '艮坎': '山水蒙，亨。蒙昧之时，启蒙教育。',
    '坎兑': '水泽节，亨。节制之道，亨通顺利。',
    '兑坎': '泽水困，亨。困厄之时，守正得亨。',
    '离艮': '火山旅，小亨。行旅之时，小有亨通。',
    '艮离': '山火贲，亨。修饰之道，文饰得当。',
    '离兑': '火泽睽，小事吉。乖离之时，小事可成。',
    '兑离': '泽火革，己日乃孚。变革之时，诚信待之。',
    '艮兑': '山泽损，有孚元吉。减损之道，诚信得吉。',
    '兑艮': '泽山咸，亨利贞。感应之道，男女相感。'
  };
  
  const key = upper.name + lower.name;
  return duanyuMap[key] || `《${upper.name}》上《${lower.name}》下，${upper.natural}与${lower.natural}相交，${upper.wuxing}${lower.wuxing}相济。`;
}

// 获取动爻断语
export function getMovingLineDuanyu(movingLine: number, upperGua: number, lowerGua: number): string {
  const upper = getGua(upperGua);
  const lower = getGua(lowerGua);
  
  const lineDescriptions: Record<number, string> = {
    1: `初爻动：${lower.name}卦之初爻，事物初始阶段，宜谨慎起步。`,
    2: `二爻动：${lower.name}卦之中爻，事物发展阶段，需稳步推进。`,
    3: `三爻动：${lower.name}卦之上爻，下卦终变，将入上卦，转折之时。`,
    4: `四爻动：${upper.name}卦之下爻，上卦初始，新的阶段开始。`,
    5: `五爻动：${upper.name}卦之中爻，事物鼎盛阶段，需戒骄戒躁。`,
    6: `六爻动：${upper.name}卦之上爻，事物终结阶段，需知进退。`
  };
  
  return lineDescriptions[movingLine] || '';
}

// 完整起卦
export interface MeihuaResult {
  upperGua: number;
  lowerGua: number;
  movingLine: number;
  upperGuaInfo: any;
  lowerGuaInfo: any;
  bianGua: { newUpperGua: number; newLowerGua: number; newUpperInfo: any; newLowerInfo: any };
  huGua: { upperHu: number; lowerHu: number; upperHuInfo: any; lowerHuInfo: any };
  tiYong: {
    tiGua: number;
    yongGua: number;
    tiInfo: any;
    yongInfo: any;
    relation: string;
    description: string;
  };
  duanyu: string;
  lineDuanyu: string;
  summary: string;
}

export function calculateMeihua(method: 'time' | 'numbers' | 'text', ...args: any[]): MeihuaResult {
  let upperGua: number, lowerGua: number, movingLine: number;
  
  if (method === 'time') {
    const [year, month, day, hour] = args;
    const result = getGuaFromTime(year, month, day, hour);
    upperGua = result.upperGua;
    lowerGua = result.lowerGua;
    movingLine = result.movingLine;
  } else if (method === 'numbers') {
    const [num1, num2] = args;
    const result = getGuaFromNumbers(num1, num2);
    upperGua = result.upperGua;
    lowerGua = result.lowerGua;
    movingLine = result.movingLine;
  } else {
    const [text] = args;
    const result = getGuaFromText(text);
    upperGua = result.upperGua;
    lowerGua = result.lowerGua;
    movingLine = result.movingLine;
  }
  
  const upperGuaInfo = getGua(upperGua);
  const lowerGuaInfo = getGua(lowerGua);
  
  // 变卦
  const bianResult = getBianGua(upperGua, lowerGua, movingLine);
  const bianGua = {
    ...bianResult,
    newUpperInfo: getGua(bianResult.newUpperGua),
    newLowerInfo: getGua(bianResult.newLowerGua)
  };
  
  // 互卦
  const huResult = getHuGua(upperGua, lowerGua);
  const huGua = {
    ...huResult,
    upperHuInfo: getGua(huResult.upperHu),
    lowerHuInfo: getGua(huResult.lowerHu)
  };
  
  // 体用
  const tiYong = getTiYongRelation(movingLine, upperGua, lowerGua);
  
  // 断语
  const duanyu = getDuanyu(upperGua, lowerGua, movingLine);
  const lineDuanyu = getMovingLineDuanyu(movingLine, upperGua, lowerGua);
  
  // 总结
  const summary = `${upperGuaInfo.name}${lowerGuaInfo.name}卦，${tiYong.relation}关系。${duanyu}`;
  
  return {
    upperGua,
    lowerGua,
    movingLine,
    upperGuaInfo,
    lowerGuaInfo,
    bianGua,
    huGua,
    tiYong,
    duanyu,
    lineDuanyu,
    summary
  };
}
