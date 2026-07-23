import {
  getYearZhu,
  getMonthZhu,
  getDayZhu,
  calculateTimeGan,
  getNaYin,
  countWuxing,
  judgeDayMasterStrength,
  calculateShiShen,
  getZhiCangGan,
  getGanZhiInfo,
  calculateDaYun,
  GanZhi,
  TIANGAN,
  DIZHI
} from '../utils/baziCalculator';

export interface BaZiInput {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: '男' | '女';
  name?: string;
}

export interface Pillar {
  name: string;
  gan: string;
  zhi: string;
  ganIndex: number;
  zhiIndex: number;
  ganInfo: any;
  zhiInfo: any;
  naYin?: string;
  shiShen?: string;
  cangGan?: { gan: string; shiShen: string }[];
}

export interface BaZiResult {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  timePillar: Pillar;
  dayMaster: string;
  dayMasterWuxing: string;
  dayMasterYinYang: string;
  naYin: string;
  wuxingCounts: Record<string, number>;
  dayMasterStrength: {
    strength: '强' | '弱' | '中和';
    description: string;
  };
  daYun: {
    startAge: number;
    direction: '顺' | '逆';
  };
  shensha: {
    name: string;
    description: string;
  }[];
}

export function calculateBaZi(input: BaZiInput): BaZiResult {
  // 计算四柱
  const yearZhu = getYearZhu(input.year);
  const monthZhu = getMonthZhu(input.year, input.month, input.day);
  const dayZhu = getDayZhu(input.year, input.month, input.day);
  
  // 计算时柱
  const timeZhiIndex = Math.floor((input.hour + 1) / 2) % 12;
  const timeGanIndex = calculateTimeGan(dayZhu.ganIndex, input.hour);
  const timeZhu: GanZhi = {
    gan: TIANGAN[timeGanIndex].name,
    zhi: DIZHI[timeZhiIndex].name,
    ganIndex: timeGanIndex,
    zhiIndex: timeZhiIndex
  };
  
  // 日干（日主）
  const dayMaster = dayZhu.gan;
  const dayMasterInfo = TIANGAN.find(t => t.name === dayMaster)!;
  const dayMasterWuxing = dayMasterInfo.wuxing;
  const dayMasterYinYang = dayMasterInfo.yinYang;
  
  // 纳音五行（年柱）
  const naYin = getNaYin(yearZhu.gan, yearZhu.zhi);
  
  // 计算十神
  const pillars = [yearZhu, monthZhu, dayZhu, timeZhu];
  const pillarsWithShiShen = pillars.map((pillar, index) => {
    const shiShen = calculateShiShen(dayMaster, pillar.gan);
    const ganInfo = getGanZhiInfo(pillar.gan, pillar.zhi);
    
    // 地支藏干及其十神
    const cangGan = getZhiCangGan(pillar.zhi);
    const cangGanWithShiShen = cangGan.map(gan => ({
      gan,
      shiShen: calculateShiShen(dayMaster, gan)
    }));
    
    return {
      name: ['年柱', '月柱', '日柱', '时柱'][index],
      gan: pillar.gan,
      zhi: pillar.zhi,
      ganIndex: pillar.ganIndex,
      zhiIndex: pillar.zhiIndex,
      ganInfo,
      zhiInfo: DIZHI.find(d => d.name === pillar.zhi),
      shiShen,
      cangGan: cangGanWithShiShen
    };
  });
  
  // 五行计数
  const wuxingCounts = countWuxing(pillars);
  
  // 日主强弱
  const dayMasterStrength = judgeDayMasterStrength(wuxingCounts, dayMaster);
  
  // 大运
  const daYun = calculateDaYun(input.year, input.month, input.day, input.gender);
  
  // 神煞（简化版）
  const shensha = calculateShenSha(yearZhu, monthZhu, dayZhu, timeZhu, dayMaster);
  
  return {
    yearPillar: pillarsWithShiShen[0],
    monthPillar: pillarsWithShiShen[1],
    dayPillar: pillarsWithShiShen[2],
    timePillar: pillarsWithShiShen[3],
    dayMaster,
    dayMasterWuxing,
    dayMasterYinYang,
    naYin,
    wuxingCounts,
    dayMasterStrength,
    daYun,
    shensha
  };
}

// 计算神煞（简化版）
function calculateShenSha(
  yearZhu: GanZhi,
  monthZhu: GanZhi,
  dayZhu: GanZhi,
  timeZhu: GanZhi,
  dayMaster: string
): { name: string; description: string }[] {
  const shensha: { name: string; description: string }[] = [];
  
  // 驿马（根据年支）
  const yimaZhi: Record<string, string> = {
    '子': '寅', '丑': '亥', '寅': '申', '卯': '巳',
    '辰': '寅', '巳': '亥', '午': '申', '未': '巳',
    '申': '寅', '酉': '亥', '戌': '申', '亥': '巳'
  };
  if (yimaZhi[yearZhu.zhi]) {
    shensha.push({
      name: '驿马',
      description: '奔波、变动、远行之象'
    });
  }
  
  // 桃花（根据年支或日支）
  const taohuaZhi: Record<string, string> = {
    '子': '卯', '丑': '午', '寅': '子', '卯': '酉',
    '辰': '卯', '巳': '午', '午': '子', '未': '酉',
    '申': '子', '酉': '午', '戌': '卯', '亥': '酉'
  };
  if (taohuaZhi[yearZhu.zhi]) {
    shensha.push({
      name: '桃花',
      description: '姻缘、感情、人际之象'
    });
  }
  
  // 天乙贵人（简化判断）
  const tianyiGans = ['甲', '丙', '戊', '庚', '壬'];
  if (tianyiGans.includes(dayZhu.gan)) {
    shensha.push({
      name: '天乙贵人',
      description: '得贵人扶持，逢凶化吉'
    });
  }
  
  // 文昌（根据日干）
  const wenchangZhi: Record<string, string> = {
    '甲': '巳', '乙': '午', '丙': '申', '丁': '酉',
    '戊': '申', '己': '酉', '庚': '亥', '辛': '子',
    '壬': '寅', '癸': '卯'
  };
  if (wenchangZhi[dayMaster]) {
    shensha.push({
      name: '文昌',
      description: '学业、功名、智慧之象'
    });
  }
  
  // 将星（根据日支）
  const jiangxingZhi: Record<string, string> = {
    '子': '子', '丑': '酉', '寅': '午', '卯': '子',
    '辰': '酉', '巳': '午', '午': '子', '未': '酉',
    '申': '午', '酉': '子', '戌': '酉', '亥': '午'
  };
  if (jiangxingZhi[dayZhu.zhi]) {
    shensha.push({
      name: '将星',
      description: '领导能力、权力之象'
    });
  }
  
  return shensha;
}

// 生成八字解读
export function generateBaZiInterpretation(result: BaZiResult): string {
  const interpretations: string[] = [];
  
  // 基本信息
  interpretations.push(`【命局总评】`);
  interpretations.push(`${result.dayMasterWuxing}命${result.dayMasterYinYang === '阳' ? '人' : '性'}，${result.naYin}`);
  interpretations.push(`日主${result.dayMasterStrength.strength === '强' ? '偏强' : result.dayMasterStrength.strength === '弱' ? '偏弱' : '中和'}，${result.dayMasterStrength.description}`);
  
  // 五行分析
  interpretations.push(`\n【五行分析】`);
  const sortedWuxing = Object.entries(result.wuxingCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([wuxing, count]) => `${wuxing}${count}个`);
  interpretations.push(`五行分布：${sortedWuxing.join('、')}`);
  
  // 最旺和最弱的五行
  const maxWuxing = Object.entries(result.wuxingCounts).reduce((a, b) => a[1] > b[1] ? a : b);
  const minWuxing = Object.entries(result.wuxingCounts).reduce((a, b) => a[1] < b[1] ? a : b);
  interpretations.push(`${maxWuxing[0]}气最旺，${minWuxing[0]}气最弱`);
  
  // 神煞
  if (result.shensha.length > 0) {
    interpretations.push(`\n【神煞信息】`);
    result.shensha.forEach(ss => {
      interpretations.push(`${ss.name}：${ss.description}`);
    });
  }
  
  // 大运
  interpretations.push(`\n【大运信息】`);
  interpretations.push(`${result.daYun.direction === '顺' ? '顺行' : '逆行'}大运，${result.daYun.startAge}岁起运`);
  
  // 综合建议
  interpretations.push(`\n【综合建议】`);
  if (result.dayMasterStrength.strength === '强') {
    interpretations.push(`宜泄不宜补，应注意调和五行。`);
  } else if (result.dayMasterStrength.strength === '弱') {
    interpretations.push(`宜补不宜泄，应加强自身能量。`);
  } else {
    interpretations.push(`五行平衡，宜保持现状，稳中求进。`);
  }
  
  return interpretations.join('\n');
}
