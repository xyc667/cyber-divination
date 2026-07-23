import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, User, RefreshCw, Info } from 'lucide-react';
import { calculateBaZi, generateBaZiInterpretation, BaZiInput, BaZiResult } from '../services/baziService';

export default function BaziPage() {
  const [input, setInput] = useState<BaZiInput>({
    year: 1990,
    month: 1,
    day: 1,
    hour: 12,
    gender: '男',
    name: ''
  });
  
  const [result, setResult] = useState<BaZiResult | null>(null);
  const [interpretation, setInterpretation] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleCalculate = () => {
    setIsCalculating(true);
    setShowForm(false);
    
    setTimeout(() => {
      const baziResult = calculateBaZi(input);
      const interpretationText = generateBaZiInterpretation(baziResult);
      setResult(baziResult);
      setInterpretation(interpretationText);
      setIsCalculating(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setInterpretation('');
    setShowForm(true);
  };

  const handleInputChange = (field: keyof BaZiInput, value: any) => {
    setInput(prev => ({ ...prev, [field]: value }));
  };

  // 生成年份选项
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  // 生成月份选项
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  // 生成日期选项
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // 生成时辰选项
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const formatHour = (hour: number) => {
    const periods = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
    return periods[Math.floor((hour + 1) / 2) % 12] + ` (${hour.toString().padStart(2, '0')}:00)`;
  };

  const renderPillar = (pillar: any, title: string, highlight: boolean = false) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`ancient-card p-4 ${highlight ? 'border-ancient-gold/50' : ''}`}
    >
      <div className="text-center mb-2">
        <span className={`text-sm ${highlight ? 'text-ancient-gold' : 'text-ancient-gray'}`}>{title}</span>
      </div>
      <div className="flex flex-col items-center">
        <div className={`text-2xl font-bold ${pillar.ganInfo?.yinYang === '阳' ? 'text-ancient-gold' : 'text-ancient-red'}`}>
          {pillar.gan}
        </div>
        <div className="text-sm text-ancient-gray">{pillar.shiShen || '本气'}</div>
        <div className="text-2xl font-bold text-ancient-dark mt-2">{pillar.zhi}</div>
        <div className="text-sm text-ancient-gray">
          {pillar.zhiInfo?.animal && `（${pillar.zhiInfo.animal}）`}
        </div>
        
        {/* 藏干 */}
        {pillar.cangGan && pillar.cangGan.length > 0 && (
          <div className="mt-3 text-xs text-ancient-gray">
            <div className="border-t border-ancient-brown/30 pt-2 mt-2">
              <div className="text-ancient-gray mb-1">藏干：</div>
              {pillar.cangGan.map((cg: any, idx: number) => (
                <div key={idx} className="flex justify-between gap-4">
                  <span>{cg.gan}</span>
                  <span className="text-ancient-gold">{cg.shiShen}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-orange/10 border border-ancient-orange/30 mb-4">
            <Calendar className="w-4 h-4 text-ancient-orange" />
            <span className="text-ancient-orange text-sm">四柱八字</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            四柱命盘
          </h1>
          <p className="text-ancient-brown">探索命运的密码，解读人生的轨迹</p>
        </motion.div>

        {showForm && !result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ancient-card p-6"
          >
            <div className="space-y-6">
              {/* 姓名 */}
              <div>
                <label className="flex items-center gap-2 text-sm text-ancient-gray mb-2">
                  <User className="w-4 h-4" />
                  姓名（可选）
                </label>
                <input
                  type="text"
                  value={input.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="输入您的姓名"
                  className="ancient-input w-full"
                />
              </div>

              {/* 性别 */}
              <div>
                <label className="text-sm text-ancient-gray mb-2 block">性别</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleInputChange('gender', '男')}
                    className={`p-3 rounded-lg border transition-all ${
                      input.gender === '男'
                        ? 'border-ancient-gold bg-ancient-gold/20 text-ancient-gold'
                        : 'border-ancient-brown/50 text-ancient-brown hover:border-ancient-brown'
                    }`}
                  >
                    男
                  </button>
                  <button
                    onClick={() => handleInputChange('gender', '女')}
                    className={`p-3 rounded-lg border transition-all ${
                      input.gender === '女'
                        ? 'border-ancient-red bg-ancient-red/20 text-ancient-red'
                        : 'border-ancient-brown/50 text-ancient-brown hover:border-ancient-brown'
                    }`}
                  >
                    女
                  </button>
                </div>
              </div>

              {/* 出生日期时间 */}
              <div>
                <label className="flex items-center gap-2 text-sm text-ancient-gray mb-2">
                  <Calendar className="w-4 h-4" />
                  出生日期
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <select
                    value={input.year}
                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                    className="ancient-input"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}年</option>
                    ))}
                  </select>
                  <select
                    value={input.month}
                    onChange={(e) => handleInputChange('month', parseInt(e.target.value))}
                    className="ancient-input"
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}月</option>
                    ))}
                  </select>
                  <select
                    value={input.day}
                    onChange={(e) => handleInputChange('day', parseInt(e.target.value))}
                    className="ancient-input"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}日</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 出生时辰 */}
              <div>
                <label className="flex items-center gap-2 text-sm text-ancient-gray mb-2">
                  <Clock className="w-4 h-4" />
                  出生时辰
                </label>
                <select
                  value={input.hour}
                  onChange={(e) => handleInputChange('hour', parseInt(e.target.value))}
                  className="ancient-input w-full"
                >
                  {hours.map(hour => (
                    <option key={hour} value={hour}>{formatHour(hour)}</option>
                  ))}
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCalculate}
                disabled={isCalculating}
                className="ancient-btn w-full flex items-center justify-center gap-2"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    排盘中...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    开始排盘
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {isCalculating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ancient-card p-8 text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-ancient-orange/30 flex items-center justify-center"
            >
              <span className="text-3xl">☴</span>
            </motion.div>
            <p className="text-ancient-gray">正在解析命盘...</p>
          </motion.div>
        )}

        {result && !isCalculating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* 命盘标题 */}
            <div className="ancient-card text-center p-6">
              <h2 className="text-2xl font-bold text-ancient-orange mb-2 brush-text">
                {input.name || '命主'} · 四柱命盘
              </h2>
              <div className="text-ancient-gray">
                {input.year}年{input.month}月{input.day}日 {formatHour(input.hour)}
              </div>
              <div className="mt-4 flex justify-center gap-4 text-sm">
                <span className="px-3 py-1 rounded-full bg-ancient-orange/20 text-ancient-orange">
                  {result.naYin}
                </span>
                <span className="px-3 py-1 rounded-full bg-ancient-gold/20 text-ancient-gold">
                  {result.dayMasterWuxing}命{result.dayMasterYinYang === '阳' ? '人' : '性'}
                </span>
                <span className="px-3 py-1 rounded-full bg-ancient-red/20 text-ancient-red">
                  {result.dayMasterStrength.strength}
                </span>
              </div>
            </div>

            {/* 四柱展示 */}
            <div className="grid grid-cols-4 gap-4">
              {renderPillar(result.yearPillar, '年柱')}
              {renderPillar(result.monthPillar, '月柱')}
              {renderPillar(result.dayPillar, '日柱', true)}
              {renderPillar(result.timePillar, '时柱')}
            </div>

            {/* 五行分布 */}
            <div className="ancient-card p-6">
              <h3 className="text-lg font-bold text-ancient-gold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                五行分布
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(result.wuxingCounts).map(([wuxing, count]) => (
                  <div key={wuxing} className="text-center">
                    <div className="text-3xl mb-2">
                      {wuxing === '木' ? '🌳' : wuxing === '火' ? '🔥' : wuxing === '土' ? '🏔️' : wuxing === '金' ? '⚔️' : '💧'}
                    </div>
                    <div className="text-2xl font-bold text-ancient-dark">{count}</div>
                    <div className="text-sm text-ancient-gray">{wuxing}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 神煞 */}
            {result.shensha.length > 0 && (
              <div className="ancient-card p-6">
                <h3 className="text-lg font-bold text-ancient-gold mb-4">神煞信息</h3>
                <div className="grid grid-cols-2 gap-4">
                  {result.shensha.map((ss, index) => (
                    <div key={index} className="p-3 rounded-lg bg-ancient-gold/10 border border-ancient-gold/30">
                      <div className="font-bold text-ancient-gold">{ss.name}</div>
                      <div className="text-sm text-ancient-gray">{ss.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 大运 */}
            <div className="ancient-card p-6">
              <h3 className="text-lg font-bold text-ancient-red mb-4">大运信息</h3>
              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-ancient-red">
                    {result.daYun.direction === '顺' ? '顺行' : '逆行'}
                  </div>
                  <div className="text-sm text-ancient-gray">运行方向</div>
                </div>
                <div className="text-4xl text-ancient-brown/30">|</div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-ancient-red">{result.daYun.startAge}岁</div>
                  <div className="text-sm text-ancient-gray">起运年龄</div>
                </div>
              </div>
            </div>

            {/* 综合解读 */}
            <div className="ancient-card p-6">
              <h3 className="text-lg font-bold text-ancient-gold mb-4">命盘解读</h3>
              <pre className="whitespace-pre-wrap text-ancient-dark leading-relaxed font-mono text-sm">
                {interpretation}
              </pre>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="ancient-btn-secondary w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              重新排盘
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
