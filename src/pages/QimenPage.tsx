import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, RefreshCw, Sparkles } from 'lucide-react';
import { calculateQimen, QimenResult } from '../utils/qimenCalculator';
import { useDivinationStore } from '../store/divinationStore';

export default function QimenPage() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [result, setResult] = useState<QimenResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { addRecord } = useDivinationStore();

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const qimenResult = calculateQimen(new Date(date), time);
      setResult(qimenResult);
      addRecord({ type: 'qimen', qimenResult });
      setIsCalculating(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setDate(new Date().toISOString().split('T')[0]);
    setTime(new Date().toTimeString().slice(0, 5));
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-gold/10 border border-ancient-gold/30 mb-4">
            <Sparkles className="w-4 h-4 text-ancient-gold" />
            <span className="text-ancient-gold text-sm">奇门遁甲</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            奇门遁甲排盘
          </h1>
          <p className="text-ancient-brown">选择日期和时间，排演奇门遁甲盘</p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ancient-card"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm text-ancient-gray mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  选择日期
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="ancient-input"
                />
              </div>
              <div>
                <label className="block text-sm text-ancient-gray mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  选择时辰
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="ancient-input"
                />
              </div>
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
                  正在排盘...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  开始排盘
                </>
              )}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="ancient-card">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 rounded-lg bg-ancient-dark/20">
                  <div className="text-2xl font-bold text-ancient-gold">{result.dayStem}{result.dayBranch}</div>
                  <div className="text-sm text-ancient-gray">日干支</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ancient-dark/20">
                  <div className="text-2xl font-bold text-ancient-red">{result.timeStem}{result.timeBranch}</div>
                  <div className="text-sm text-ancient-gray">时干支</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-ancient-dark/20">
                  <div className="text-2xl font-bold text-ancient-orange">{date} {time}</div>
                  <div className="text-sm text-ancient-gray">选择时间</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {result.plate.map((palace, index) => (
                  <motion.div
                    key={palace.palace}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${
                      palace.palace === 5 
                        ? 'bg-gradient-to-br from-ancient-gold/20 to-ancient-red/20 border-ancient-gold/50' 
                        : 'bg-ancient-dark/20 border-ancient-brown/30'
                    }`}
                  >
                    <div className="text-center mb-2">
                      <span className="text-xs text-ancient-gray">第{palace.palace}宫</span>
                    </div>
                    <div className="text-sm space-y-1">
                      <div className="text-ancient-gold">{palace.heaven}</div>
                      <div className="text-ancient-red">{palace.door}</div>
                      <div className="text-ancient-orange">{palace.god}</div>
                      <div className="text-ancient-gray">{palace.stem}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="ancient-card">
              <h3 className="text-lg font-bold text-ancient-gold mb-4">解读分析</h3>
              <pre className="whitespace-pre-wrap text-ancient-dark leading-relaxed font-mono text-sm">
                {result.interpretation}
              </pre>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="ancient-btn-secondary w-full"
            >
              再次排盘
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
