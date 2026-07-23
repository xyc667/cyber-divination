// 占卜记录类型
export interface DivinationRecord {
  id: string;
  type: 'qimen' | 'zhouyi' | 'liuyao' | 'bazi' | 'meihua' | 'shefu';
  date: string;
  input: Record<string, any>;
  result: Record<string, any>;
}

// 用户命盘信息
export interface UserBazi {
  id: string;
  name: string;
  gender: '男' | '女';
  year: number;
  month: number;
  day: number;
  hour: number;
  createdAt: string;
}

// 本地存储键名
const DIVINATION_RECORDS_KEY = 'cyber_divination_records';
const USER_BAZI_KEY = 'cyber_user_bazi';

// 获取占卜记录
export function getDivinationRecords(): DivinationRecord[] {
  try {
    const data = localStorage.getItem(DIVINATION_RECORDS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// 保存占卜记录
export function saveDivinationRecord(record: Omit<DivinationRecord, 'id' | 'date'>): DivinationRecord {
  const records = getDivinationRecords();
  const newRecord: DivinationRecord = {
    ...record,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  records.unshift(newRecord);
  // 只保留最近100条记录
  if (records.length > 100) {
    records.pop();
  }
  localStorage.setItem(DIVINATION_RECORDS_KEY, JSON.stringify(records));
  return newRecord;
}

// 删除占卜记录
export function deleteDivinationRecord(id: string): void {
  const records = getDivinationRecords();
  const filtered = records.filter(r => r.id !== id);
  localStorage.setItem(DIVINATION_RECORDS_KEY, JSON.stringify(filtered));
}

// 清空所有占卜记录
export function clearDivinationRecords(): void {
  localStorage.removeItem(DIVINATION_RECORDS_KEY);
}

// 获取用户命盘
export function getUserBazi(): UserBazi | null {
  try {
    const data = localStorage.getItem(USER_BAZI_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// 保存用户命盘
export function saveUserBazi(bazi: Omit<UserBazi, 'id' | 'createdAt'>): UserBazi {
  const newBazi: UserBazi = {
    ...bazi,
    id: Date.now().toString(),
    createdAt: new Date().toISOString()
  };
  localStorage.setItem(USER_BAZI_KEY, JSON.stringify(newBazi));
  return newBazi;
}

// 删除用户命盘
export function deleteUserBazi(): void {
  localStorage.removeItem(USER_BAZI_KEY);
}

// 获取最近的占卜记录
export function getRecentRecords(count: number = 5): DivinationRecord[] {
  const records = getDivinationRecords();
  return records.slice(0, count);
}

// 获取按类型分类的记录
export function getRecordsByType(type: DivinationRecord['type']): DivinationRecord[] {
  const records = getDivinationRecords();
  return records.filter(r => r.type === type);
}

// 生成唯一ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
