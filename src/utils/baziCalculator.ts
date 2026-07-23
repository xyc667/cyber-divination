// 天干信息
export const TIANGAN = [
  { name: '甲', pinyin: 'jiǎ', wuxing: '木', yinYang: '阳', position: 0 },
  { name: '乙', pinyin: 'yǐ', wuxing: '木', yinYang: '阴', position: 1 },
  { name: '丙', pinyin: 'bǐng', wuxing: '火', yinYang: '阳', position: 2 },
  { name: '丁', pinyin: 'dīng', wuxing: '火', yinYang: '阴', position: 3 },
  { name: '戊', pinyin: 'wù', wuxing: '土', yinYang: '阳', position: 4 },
  { name: '己', pinyin: 'jǐ', wuxing: '土', yinYang: '阴', position: 5 },
  { name: '庚', pinyin: 'gēng', wuxing: '金', yinYang: '阳', position: 6 },
  { name: '辛', pinyin: 'xīn', wuxing: '金', yinYang: '阴', position: 7 },
  { name: '壬', pinyin: 'rén', wuxing: '水', yinYang: '阳', position: 8 },
  { name: '癸', pinyin: 'guǐ', wuxing: '水', yinYang: '阴', position: 9 }
];

// 地支信息
export const DIZHI = [
  { name: '子', pinyin: 'zǐ', wuxing: '水', yinYang: '阳', position: 0, animal: '鼠' },
  { name: '丑', pinyin: 'chǒu', wuxing: '土', yinYang: '阴', position: 1, animal: '牛' },
  { name: '寅', pinyin: 'yín', wuxing: '木', yinYang: '阳', position: 2, animal: '虎' },
  { name: '卯', pinyin: 'mǎo', wuxing: '木', yinYang: '阴', position: 3, animal: '兔' },
  { name: '辰', pinyin: 'chén', wuxing: '土', yinYang: '阳', position: 4, animal: '龙' },
  { name: '巳', pinyin: 'sì', wuxing: '火', yinYang: '阴', position: 5, animal: '蛇' },
  { name: '午', pinyin: 'wǔ', wuxing: '火', yinYang: '阳', position: 6, animal: '马' },
  { name: '未', pinyin: 'wèi', wuxing: '土', yinYang: '阴', position: 7, animal: '羊' },
  { name: '申', pinyin: 'shēn', wuxing: '金', yinYang: '阳', position: 8, animal: '猴' },
  { name: '酉', pinyin: 'yǒu', wuxing: '金', yinYang: '阴', position: 9, animal: '鸡' },
  { name: '戌', pinyin: 'xū', wuxing: '土', yinYang: '阳', position: 10, animal: '狗' },
  { name: '亥', pinyin: 'hài', wuxing: '水', yinYang: '阴', position: 11, animal: '猪' }
];

// 五行生克关系
export const WUXING_RELATIONS = {
  '木': { '生': '火', '克': '土' },
  '火': { '生': '土', '克': '金' },
  '土': { '生': '金', '克': '水' },
  '金': { '生': '水', '克': '木' },
  '水': { '生': '木', '克': '火' }
};

// 天干五合
export const TIANGAN_HE = {
  '甲': '己', '己': '甲',
  '乙': '庚', '庚': '乙',
  '丙': '辛', '辛': '丙',
  '丁': '壬', '壬': '丁',
  '戊': '癸', '癸': '戊'
};

// 地支六冲
export const DIZHI_CHONG = {
  '子': '午', '午': '子',
  '丑': '未', '未': '丑',
  '寅': '申', '申': '寅',
  '卯': '酉', '酉': '卯',
  '辰': '戌', '戌': '辰',
  '巳': '亥', '亥': '巳'
};

// 地支三合
export const DIZHI_SANHE: Record<string, string[]> = {
  '申子辰': ['申', '子', '辰'],
  '巳酉丑': ['巳', '酉', '丑'],
  '寅午戌': ['寅', '午', '戌'],
  '亥卯未': ['亥', '卯', '未']
};

// 地支三会
export const DIZHI_SANHUI: Record<string, string[]> = {
  '寅卯辰': ['寅', '卯', '辰'],
  '巳午未': ['巳', '午', '未'],
  '申酉戌': ['申', '酉', '戌'],
  '亥子丑': ['亥', '子', '丑']
};

// 地支相刑
export const DIZHI_XING: Record<string, string[]> = {
  '寅': ['巳', '申'],
  '巳': ['寅', '申'],
  '申': ['寅', '巳'],
  '丑': ['戌', '未'],
  '戌': ['丑', '未'],
  '未': ['丑', '戌'],
  '子': ['卯'],
  '卯': ['子'],
  '辰': ['辰'],
  '午': ['午'],
  '酉': ['酉'],
  '亥': ['亥']
};

// 天干地支相合信息
export interface GanZhi {
  gan: string;
  zhi: string;
  ganIndex: number;
  zhiIndex: number;
}

// 获取天干索引（0-9）
export function getTianGanIndex(year: number): number {
  return (year - 4) % 10;
}

// 获取地支索引（0-11）
export function getDiZhiIndex(year: number): number {
  return (year - 4) % 12;
}

// 计算年柱
export function getYearZhu(year: number): GanZhi {
  const ganIndex = (year - 4) % 10;
  const zhiIndex = (year - 4) % 12;
  return {
    gan: TIANGAN[ganIndex >= 0 ? ganIndex : ganIndex + 10].name,
    zhi: DIZHI[zhiIndex >= 0 ? zhiIndex : zhiIndex + 12].name,
    ganIndex: ganIndex >= 0 ? ganIndex : ganIndex + 10,
    zhiIndex: zhiIndex >= 0 ? zhiIndex : zhiIndex + 12
  };
}

// 节气月份对应表（节气交接时间）
export const JIEQI_MONTHS: Record<string, number> = {
  '立春': 2, '雨水': 2, '惊蛰': 3, '春分': 3,
  '清明': 4, '谷雨': 4, '立夏': 5, '小满': 5,
  '芒种': 6, '夏至': 6, '小暑': 7, '大暑': 7,
  '立秋': 8, '处暑': 8, '白露': 9, '秋分': 9,
  '寒露': 10, '霜降': 10, '立冬': 11, '小雪': 11,
  '大雪': 12, '冬至': 12, '小寒': 1, '大寒': 1
};

// 节气日期（简化版，按平均时间计算）
export const JIEQI_DAYS: Record<string, number> = {
  '小寒': 5, '大寒': 20,
  '立春': 4, '雨水': 19,
  '惊蛰': 6, '春分': 21,
  '清明': 5, '谷雨': 20,
  '立夏': 6, '小满': 21,
  '芒种': 6, '夏至': 21,
  '小暑': 7, '大暑': 23,
  '立秋': 8, '处暑': 23,
  '白露': 8, '秋分': 23,
  '寒露': 8, '霜降': 23,
  '立冬': 7, '小雪': 22,
  '大雪': 7, '冬至': 22
};

// 获取最近节气日期
export function getRecentJieQi(year: number, month: number, day: number): string {
  const jieqiList = Object.keys(JIEQI_MONTHS);
  
  for (let i = 0; i < jieqiList.length; i++) {
    const jieqi = jieqiList[i];
    const jieqiMonth = JIEQI_MONTHS[jieqi];
    const jieqiDay = JIEQI_DAYS[jieqi];
    
    if (month < jieqiMonth || (month === jieqiMonth && day < jieqiDay)) {
      if (i === 0) {
        const prevYear = year - 1;
        const prevJieqi = jieqiList[jieqiList.length - 1];
        return prevJieqi;
      }
      return jieqiList[i - 1];
    }
  }
  
  return jieqiList[jieqiList.length - 1];
}

// 计算月柱（节气分隔）
export function getMonthZhu(year: number, month: number, day: number): GanZhi {
  const jieqi = getRecentJieQi(year, month, day);
  const jieqiMonth = JIEQI_MONTHS[jieqi];
  
  // 月令地支：正月为寅，二月为卯...腊月为丑
  const monthZhiIndex = (jieqiMonth - 2 + 12) % 12;
  
  // 年干决定月干
  const yearGanIndex = (year - 4) % 10;
  const monthGanBase = (yearGanIndex * 2) % 10;
  const monthGanIndex = (monthGanBase + month - 1) % 10;
  
  return {
    gan: TIANGAN[monthGanIndex].name,
    zhi: DIZHI[monthZhiIndex].name,
    ganIndex: monthGanIndex,
    zhiIndex: monthZhiIndex
  };
}

// 计算日柱（按1900年为基准计算）
export function getDayZhu(year: number, month: number, day: number): GanZhi {
  const baseDate = new Date(1900, 0, 1); // 1900年1月1日
  const targetDate = new Date(year, month - 1, day);
  const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const ganIndex = (daysDiff + 6) % 10;
  const zhiIndex = (daysDiff + 8) % 12;
  
  return {
    gan: TIANGAN[ganIndex >= 0 ? ganIndex : ganIndex + 10].name,
    zhi: DIZHI[zhiIndex >= 0 ? zhiIndex : zhiIndex + 12].name,
    ganIndex: ganIndex >= 0 ? ganIndex : ganIndex + 10,
    zhiIndex: zhiIndex >= 0 ? zhiIndex : zhiIndex + 12
  };
}

// 计算时柱
export function getTimeZhu(hour: number): GanZhi {
  // 时支：23-1点为子时，1-3点为丑时...
  const timeZhiIndex = Math.floor((hour + 1) / 2) % 12;
  
  // 时干需要日干，这里返回基础信息
  return {
    gan: '', // 稍后计算
    zhi: DIZHI[timeZhiIndex].name,
    ganIndex: -1,
    zhiIndex: timeZhiIndex
  };
}

// 计算完整时柱（需要日干）
export function calculateTimeGan(dayGanIndex: number, hour: number): number {
  const timeZhiIndex = Math.floor((hour + 1) / 2) % 12;
  const timeGanBase = (dayGanIndex * 2) % 10;
  return (timeGanBase + timeZhiIndex) % 10;
}

// 获取天干地支信息
export function getGanZhiInfo(gan: string, zhi: string) {
  const ganInfo = TIANGAN.find(g => g.name === gan);
  const zhiInfo = DIZHI.find(d => d.name === zhi);
  return { gan: ganInfo, zhi: zhiInfo };
}

// 计算十神
export function calculateShiShen(dayGan: string, targetGan: string): string {
  const dayGanInfo = TIANGAN.find(g => g.name === dayGan);
  const targetGanInfo = TIANGAN.find(g => g.name === targetGan);
  
  if (!dayGanInfo || !targetGanInfo) return '';
  
  const dayWuxing = dayGanInfo.wuxing;
  const targetWuxing = targetGanInfo.wuxing;
  
  // 同我者为比肩、劫财
  if (dayWuxing === targetWuxing) {
    return targetGanInfo.yinYang === dayGanInfo.yinYang ? '比肩' : '劫财';
  }
  
  // 我生者为食神、伤官
  if (WUXING_RELATIONS[dayWuxing]?.生 === targetWuxing) {
    return targetGanInfo.yinYang === dayGanInfo.yinYang ? '食神' : '伤官';
  }
  
  // 我克者为正财、偏财
  if (WUXING_RELATIONS[dayWuxing]?.克 === targetWuxing) {
    return targetGanInfo.yinYang === dayGanInfo.yinYang ? '正财' : '偏财';
  }
  
  // 克我者为正官、七杀
  if (WUXING_RELATIONS[targetWuxing]?.克 === dayWuxing) {
    return targetGanInfo.yinYang === dayGanInfo.yinYang ? '正官' : '七杀';
  }
  
  // 生我者为正印、偏印
  if (WUXING_RELATIONS[targetWuxing]?.生 === dayWuxing) {
    return targetGanInfo.yinYang === dayGanInfo.yinYang ? '正印' : '偏印';
  }
  
  return '';
}

// 计算地支藏干
export function getZhiCangGan(zhi: string): string[] {
  const zhiInfo = DIZHI.find(d => d.name === zhi);
  if (!zhiInfo) return [];
  
  // 地支藏干表（本气、中气、余气）
  const zhiCangGanMap: Record<string, { ben: string; zhong: string; yu: string }> = {
    '子': { ben: '癸', zhong: '', yu: '' },
    '丑': { ben: '己', zhong: '癸', yu: '辛' },
    '寅': { ben: '甲', zhong: '丙', yu: '戊' },
    '卯': { ben: '乙', zhong: '', yu: '' },
    '辰': { ben: '戊', zhong: '乙', yu: '癸' },
    '巳': { ben: '丙', zhong: '庚', yu: '戊' },
    '午': { ben: '丁', zhong: '己', yu: '' },
    '未': { ben: '己', zhong: '丁', yu: '乙' },
    '申': { ben: '庚', zhong: '壬', yu: '戊' },
    '酉': { ben: '辛', zhong: '', yu: '' },
    '戌': { ben: '戊', zhong: '辛', yu: '丁' },
    '亥': { ben: '壬', zhong: '甲', yu: '' }
  };
  
  const cang = zhiCangGanMap[zhi];
  if (!cang) return [];
  
  return [cang.ben, cang.zhong, cang.yu].filter(g => g !== '');
}

// 纳音五行
export function getNaYin(yearGan: string, yearZhi: string): string {
  const ganIndex = TIANGAN.findIndex(g => g.name === yearGan);
  const zhiIndex = DIZHI.findIndex(d => d.name === yearZhi);
  const sum = (ganIndex + zhiIndex) % 60;
  
  const naYinNames = [
    '海中金', '炉中火', '大林木', '路旁土', '峰头火', '涧下水',
    '墙上土', '城头火', '钶钉火', '屋上土', '灶下火', '门前木',
    '壁上土', '瓦下木', '池下火', '砂中石', '海边火', '屋上土',
    '山头火', '蜂巢木', '大驿土', '钗钏金', '海边火', '砂中金',
    '天河水', '天火', '路边火', '山头火', '砂中土', '砂中金',
    '天河水', '山下火', '砂中木', '壁上土', '明侵火', '砂中金',
    '涧下水', '城头土', '马前火', '山头火', '墙下土', '墙下金',
    '池下水', '岩头火', '山下火', '山头土', '砂中金', '山下金',
    '海中火', '林下山', '城头土', '铁匠火', '山下土', '钗钏金',
    '涧下水', '墙壁火', '屋上土', '瓦下火', '砂中金', '峰下土'
  ];
  
  return naYinNames[sum % 60];
}

// 五行计数
export function countWuxing(pillars: { gan: string; zhi: string }[]): Record<string, number> {
  const counts: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  
  pillars.forEach(pillar => {
    const ganInfo = TIANGAN.find(g => g.name === pillar.gan);
    const zhiInfo = DIZHI.find(d => d.name === pillar.zhi);
    
    if (ganInfo) counts[ganInfo.wuxing]++;
    if (zhiInfo) counts[zhiInfo.wuxing]++;
    
    // 加上地支藏干
    const cangGan = getZhiCangGan(pillar.zhi);
    cangGan.forEach(gan => {
      const info = TIANGAN.find(g => g.name === gan);
      if (info) counts[info.wuxing]++;
    });
  });
  
  return counts;
}

// 判断日主强弱
export function judgeDayMasterStrength(counts: Record<string, number>, dayGan: string): {
  strength: '强' | '弱' | '中和';
  description: string;
} {
  const dayGanInfo = TIANGAN.find(g => g.name === dayGan);
  if (!dayGanInfo) return { strength: '中和', description: '日主中和' };
  
  const dayWuxing = dayGanInfo.wuxing;
  const selfCount = counts[dayWuxing];
  
  if (selfCount >= 8) {
    return { 
      strength: '强', 
      description: `${dayWuxing}气旺盛，日主偏强` 
    };
  } else if (selfCount < 6) {
    return { 
      strength: '弱', 
      description: `${dayWuxing}气较弱，日主偏弱` 
    };
  } else {
    return { 
      strength: '中和', 
      description: `${dayWuxing}气中和，日主平衡` 
    };
  }
}

// 起大运（简化版）
export function calculateDaYun(year: number, month: number, day: number, gender: '男' | '女'): {
  startAge: number;
  direction: '顺' | '逆';
} {
  return {
    startAge: 3,
    direction: gender === '男' ? '顺' : '逆'
  };
}
