export interface QimenPlate {
  palace: number;
  heaven: string;
  earth: string;
  door: string;
  god: string;
  stem: string;
}

export interface QimenResult {
  plate: QimenPlate[];
  dayStem: string;
  dayBranch: string;
  timeStem: string;
  timeBranch: string;
  interpretation: string;
}

const HEAVEN_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const EARTH_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const HEAVEN_STARS = ['天蓬', '天任', '天冲', '天辅', '天英', '天芮', '天柱', '天心', '天禽'];
const EARTH_DEITIES = ['休门', '生门', '伤门', '杜门', '景门', '死门', '惊门', '开门'];
const SPIRITS = ['玄武', '白虎', '六合', '太阴', '螣蛇', '朱雀', '九地', '九天'];

function getDayStemBranch(date: Date): { stem: string; branch: string } {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const ganIndex = (year - 4 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + getMonthAdd(month) + day) % 10;
  const zhiIndex = (year - 4 + Math.floor((year - 1) / 4) - Math.floor((year - 1) / 100) + Math.floor((year - 1) / 400) + getMonthAdd(month) + day) % 12;
  
  return {
    stem: HEAVEN_STEMS[ganIndex],
    branch: EARTH_BRANCHES[zhiIndex]
  };
}

function getMonthAdd(month: number): number {
  const add = [0, 6, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
  return add[month - 1];
}

function getTimeStemBranch(hour: number): { stem: string; branch: string } {
  const branchIndex = Math.floor(hour / 2);
  return {
    stem: HEAVEN_STEMS[branchIndex % 10],
    branch: EARTH_BRANCHES[branchIndex]
  };
}

function generatePlate(dayStem: string, timeBranch: string): QimenPlate[] {
  const plate: QimenPlate[] = [];
  const stemIndex = HEAVEN_STEMS.indexOf(dayStem);
  const branchIndex = EARTH_BRANCHES.indexOf(timeBranch);
  
  for (let i = 0; i < 9; i++) {
    const palaceIndex = (i + stemIndex) % 9;
    plate.push({
      palace: i + 1,
      heaven: HEAVEN_STARS[palaceIndex],
      earth: EARTH_DEITIES[i % 8],
      door: EARTH_DEITIES[(i + branchIndex) % 8],
      god: SPIRITS[i % 8],
      stem: HEAVEN_STEMS[(i + stemIndex) % 10]
    });
  }
  
  return plate;
}

function generateInterpretation(plate: QimenPlate[], dayStem: string): string {
  const interpretations: string[] = [];
  
  const auspiciousDoors = ['休门', '生门', '开门'];
  const inauspiciousDoors = ['伤门', '死门', '惊门'];
  
  plate.forEach(p => {
    if (auspiciousDoors.includes(p.door)) {
      interpretations.push(`第${p.palace}宫【${p.door}】：吉门，主顺利、机遇`);
    } else if (inauspiciousDoors.includes(p.door)) {
      interpretations.push(`第${p.palace}宫【${p.door}】：凶门，主阻碍、谨慎`);
    }
  });
  
  const centralPalace = plate[4];
  interpretations.push(`\n【中宫】${centralPalace.heaven}星居中，${centralPalace.stem}干主事`);
  interpretations.push(`综合判断：${dayStem}日利于谋划，宜静不宜动`);
  
  return interpretations.join('\n');
}

export function calculateQimen(date: Date, time: string): QimenResult {
  const [hours] = time.split(':').map(Number);
  const dayInfo = getDayStemBranch(date);
  const timeInfo = getTimeStemBranch(hours);
  const plate = generatePlate(dayInfo.stem, timeInfo.branch);
  const interpretation = generateInterpretation(plate, dayInfo.stem);
  
  return {
    plate,
    dayStem: dayInfo.stem,
    dayBranch: dayInfo.branch,
    timeStem: timeInfo.stem,
    timeBranch: timeInfo.branch,
    interpretation
  };
}
