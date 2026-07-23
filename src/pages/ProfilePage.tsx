import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, Clock, Trash2, Edit2, Save, Eye, History, RefreshCw } from 'lucide-react';
import { getDivinationRecords, deleteDivinationRecord, clearDivinationRecords, getUserBazi, saveUserBazi, deleteUserBazi, DivinationRecord, UserBazi } from '../utils/storage';

export default function ProfilePage() {
  const [records, setRecords] = useState<DivinationRecord[]>(getDivinationRecords());
  const [userBazi, setUserBazi] = useState<UserBazi | null>(getUserBazi());
  const [isEditing, setIsEditing] = useState(false);
  const [editBazi, setEditBazi] = useState<UserBazi | null>(null);

  const handleRefresh = () => {
    setRecords(getDivinationRecords());
    setUserBazi(getUserBazi());
  };

  const handleDeleteRecord = (id: string) => {
    deleteDivinationRecord(id);
    setRecords(getDivinationRecords());
  };

  const handleClearRecords = () => {
    if (confirm('确定要清空所有占卜记录吗？')) {
      clearDivinationRecords();
      setRecords([]);
    }
  };

  const handleEditBazi = () => {
    setEditBazi({ ...userBazi! });
    setIsEditing(true);
  };

  const handleSaveBazi = () => {
    if (editBazi) {
      saveUserBazi({
        name: editBazi.name,
        gender: editBazi.gender,
        year: editBazi.year,
        month: editBazi.month,
        day: editBazi.day,
        hour: editBazi.hour
      });
      setUserBazi(getUserBazi());
      setIsEditing(false);
      setEditBazi(null);
    }
  };

  const handleDeleteBazi = () => {
    if (confirm('确定要删除命盘信息吗？')) {
      deleteUserBazi();
      setUserBazi(null);
    }
  };

  const handleSaveNewBazi = (data: { name: string; gender: '男' | '女'; year: number; month: number; day: number; hour: number }) => {
    saveUserBazi(data);
    setUserBazi(getUserBazi());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeName = (type: string) => {
    const types: Record<string, string> = {
      qimen: '奇门遁甲',
      zhouyi: '周易占卜',
      liuyao: '六爻预测',
      bazi: '四柱八字',
      meihua: '梅花易数',
      shefu: '射覆游戏'
    };
    return types[type] || type;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      qimen: 'text-cyber-cyan',
      zhouyi: 'text-cyber-pink',
      liuyao: 'text-yellow-400',
      bazi: 'text-orange-400',
      meihua: 'text-purple-400',
      shefu: 'text-green-400'
    };
    return colors[type] || 'text-gray-400';
  };

  const handleInputChange = (field: keyof UserBazi, value: any) => {
    if (editBazi) {
      setEditBazi(prev => ({ ...prev!, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <User className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm">个人命盘</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              个人命盘管理
            </span>
          </h1>
          <p className="text-gray-400">管理您的命盘信息和占卜记录</p>
        </motion.div>

        {/* 用户命盘 */}
        <div className="cyber-card p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-cyber-cyan flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              我的命盘
            </h3>
            {userBazi && (
              <div className="flex gap-2">
                <button
                  onClick={handleEditBazi}
                  className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:border-cyber-cyan hover:text-cyber-cyan transition-all"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDeleteBazi}
                  className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {!userBazi ? (
            <BaziForm onSave={handleSaveNewBazi} />
          ) : isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">姓名</label>
                  <input
                    type="text"
                    value={editBazi?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="cyber-input w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">性别</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleInputChange('gender', '男')}
                      className={`p-2 rounded-lg border transition-all ${
                        editBazi?.gender === '男'
                          ? 'border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan'
                          : 'border-gray-700 text-gray-400'
                      }`}
                    >
                      男
                    </button>
                    <button
                      onClick={() => handleInputChange('gender', '女')}
                      className={`p-2 rounded-lg border transition-all ${
                        editBazi?.gender === '女'
                          ? 'border-cyber-pink bg-cyber-pink/20 text-cyber-pink'
                          : 'border-gray-700 text-gray-400'
                      }`}
                    >
                      女
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <select
                  value={editBazi?.year}
                  onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                  className="cyber-input"
                >
                  {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                    <option key={year} value={year}>{year}年</option>
                  ))}
                </select>
                <select
                  value={editBazi?.month}
                  onChange={(e) => handleInputChange('month', parseInt(e.target.value))}
                  className="cyber-input"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                    <option key={month} value={month}>{month}月</option>
                  ))}
                </select>
                <select
                  value={editBazi?.day}
                  onChange={(e) => handleInputChange('day', parseInt(e.target.value))}
                  className="cyber-input"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <option key={day} value={day}>{day}日</option>
                  ))}
                </select>
                <select
                  value={editBazi?.hour}
                  onChange={(e) => handleInputChange('hour', parseInt(e.target.value))}
                  className="cyber-input"
                >
                  {Array.from({ length: 24 }, (_, i) => i).map(hour => (
                    <option key={hour} value={hour}>{hour}:00</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleSaveBazi}
                  className="flex-1 cyber-btn flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  保存
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 cyber-btn-secondary"
                >
                  取消
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <div className="text-sm text-gray-400 mb-2">姓名</div>
                <div className="text-xl font-bold text-gray-200">{userBazi.name}</div>
              </div>
              <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/30">
                <div className="text-sm text-gray-400 mb-2">性别</div>
                <div className="text-xl font-bold text-gray-200">{userBazi.gender}</div>
              </div>
              <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                <div className="text-sm text-gray-400 mb-2">出生日期</div>
                <div className="text-xl font-bold text-gray-200">
                  {userBazi.year}年{userBazi.month}月{userBazi.day}日
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="text-sm text-gray-400 mb-2">出生时辰</div>
                <div className="text-xl font-bold text-gray-200">
                  {userBazi.hour}:00
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 占卜历史 */}
        <div className="cyber-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-cyber-cyan flex items-center gap-2">
              <History className="w-5 h-5" />
              占卜历史
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:border-cyber-cyan hover:text-cyber-cyan transition-all"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {records.length > 0 && (
                <button
                  onClick={handleClearRecords}
                  className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:border-red-500 hover:text-red-500 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {records.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>暂无占卜记录</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-gray-600 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`px-3 py-1 rounded-full bg-gray-700 text-sm font-medium ${getTypeColor(record.type)}`}>
                      {getTypeName(record.type)}
                    </div>
                    <div className="text-gray-300">
                      {record.type === 'zhouyi' && record.result?.hexagram?.name && (
                        <span>《{record.result.hexagram.name}》</span>
                      )}
                      {record.type === 'bazi' && (
                        <span>{record.input.year}年{record.input.month}月{record.input.day}日</span>
                      )}
                      {record.type === 'qimen' && (
                        <span>奇门排盘</span>
                      )}
                      {record.type === 'liuyao' && (
                        <span>六爻预测</span>
                      )}
                      {record.type === 'meihua' && (
                        <span>梅花易数</span>
                      )}
                      {record.type === 'shefu' && (
                        <span>射覆游戏</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-500">
                      {formatDate(record.date)}
                    </div>
                    <button
                      onClick={() => handleDeleteRecord(record.id)}
                      className="p-2 rounded-lg text-gray-500 hover:text-red-500 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 命盘表单组件
function BaziForm({ onSave }: { onSave: (data: { name: string; gender: '男' | '女'; year: number; month: number; day: number; hour: number }) => void }) {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'男' | '女'>('男');
  const [year, setYear] = useState(new Date().getFullYear() - 20);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);

  const handleSubmit = () => {
    onSave({ name, gender, year, month, day, hour });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400 mb-2 block">姓名</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入您的姓名"
            className="cyber-input w-full"
          />
        </div>
        <div>
          <label className="text-sm text-gray-400 mb-2 block">性别</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setGender('男')}
              className={`p-2 rounded-lg border transition-all ${
                gender === '男'
                  ? 'border-cyber-cyan bg-cyber-cyan/20 text-cyber-cyan'
                  : 'border-gray-700 text-gray-400'
              }`}
            >
              男
            </button>
            <button
              onClick={() => setGender('女')}
              className={`p-2 rounded-lg border transition-all ${
                gender === '女'
                  ? 'border-cyber-pink bg-cyber-pink/20 text-cyber-pink'
                  : 'border-gray-700 text-gray-400'
              }`}
            >
              女
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <select
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="cyber-input"
        >
          {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}年</option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
          className="cyber-input"
        >
          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
            <option key={month} value={month}>{month}月</option>
          ))}
        </select>
        <select
          value={day}
          onChange={(e) => setDay(parseInt(e.target.value))}
          className="cyber-input"
        >
          {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
            <option key={day} value={day}>{day}日</option>
          ))}
        </select>
        <select
          value={hour}
          onChange={(e) => setHour(parseInt(e.target.value))}
          className="cyber-input"
        >
          {Array.from({ length: 24 }, (_, i) => i).map(hour => (
            <option key={hour} value={hour}>{hour}:00</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleSubmit}
        className="cyber-btn w-full flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        保存命盘
      </button>
    </div>
  );
}
