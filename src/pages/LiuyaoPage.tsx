import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Coins } from 'lucide-react';
import { calculateLiuyao, LiuyaoResult } from '../utils/liuyaoCalculator';
import { useDivinationStore } from '../store/divinationStore';

export default function LiuyaoPage() {
  const [result, setResult] = useState<LiuyaoResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isTossing, setIsTossing] = useState(false);
  const [tossStep, setTossStep] = useState(0);
  const { addRecord } = useDivinationStore();

  const handleCalculate = () => {
    setIsTossing(true);
    setTossStep(0);
    
    const interval = setInterval(() => {
      setTossStep(prev => {
        const next = prev + 1;
        if (next >= 6) {
          clearInterval(interval);
          setTimeout(() => {
            const liuyaoResult = calculateLiuyao();
            setResult(liuyaoResult);
            addRecord({ type: 'liuyao', liuyaoResult });
            setIsTossing(false);
          }, 500);
          return 6;
        }
        return next;
      });
    }, 400);
  };

  const handleReset = () => {
    setResult(null);
  };

  const getLineSymbol = (line: { yang: boolean; changing: boolean }) => {
    if (line.changing) {
      return line.yang ? '⚎' : '⚏';
    }
    return line.yang ? '⚊' : '⚋';
  };

  const getLineColor = (line: { yang: boolean; changing: boolean }) => {
    if (line.changing) {
      return line.yang ? 'text-ancient-gold' : 'text-ancient-gold';
    }
    return line.yang ? 'text-ancient-gold' : 'text-ancient-red';
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
            <Coins className="w-4 h-4 text-ancient-gold" />
            <span className="text-ancient-gold text-sm">六爻预测</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            六爻预测
          </h1>
          <p className="text-ancient-brown">三枚铜钱，六次投掷，洞察玄机</p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ancient-card text-center"
          >
            <div className="mb-8">
              <div className="flex justify-center gap-4">
                {[1, 2, 3].map((coin) => (
                  <motion.div
                    key={coin}
                    animate={isTossing ? {
                      y: [0, -30, 0],
                      rotate: [0, 180, 360],
                    } : {}}
                    transition={{
                      duration: 0.5,
                      repeat: isTossing ? Infinity : 0,
                      delay: coin * 0.1,
                    }}
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-ancient-gold to-ancient-orange flex items-center justify-center shadow-lg"
                  >
                    <span className="text-2xl">○</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5, 6].map((step) => (
                  <motion.div
                    key={step}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      tossStep >= step
                        ? 'border-ancient-gold bg-ancient-gold/20 text-ancient-gold'
                        : 'border-ancient-brown/50 text-ancient-gray'
                    }`}
                  >
                    {step}
                  </motion.div>
                ))}
              </div>
              <p className="text-ancient-gray mt-4">
                {isTossing ? `正在投掷第 ${Math.min(tossStep, 6)} 次...` : '点击开始六次投掷'}
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              disabled={isTossing}
              className="ancient-btn w-full max-w-xs flex items-center justify-center gap-2 mx-auto"
            >
              {isTossing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  投掷中...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  开始投掷
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
            <div className="ancient-card text-center">
              <div className="mb-6">
                <div className="text-5xl font-bold text-ancient-gold mb-4">
                  {result.hexagram}
                </div>
                <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-ancient-gold/20 to-ancient-orange/20 border border-ancient-gold/30">
                  <div className="text-xl font-bold text-ancient-gold brush-text">六爻卦象</div>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="space-y-2">
                  {result.lines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center gap-4 p-2 rounded-lg ${
                        line.changing
                          ? 'bg-ancient-gold/10 border border-ancient-gold/30'
                          : 'bg-ancient-dark/20'
                      }`}
                    >
                      <span className="text-sm text-ancient-gray w-8">
                        {['初', '二', '三', '四', '五', '上'][index]}爻
                      </span>
                      <span className={`text-3xl font-bold ${getLineColor(line)}`}>
                        {getLineSymbol(line)}
                      </span>
                      <span className="text-sm text-ancient-gray">
                        {line.yang ? '阳' : '阴'}
                        {line.changing && '变'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ancient-card">
              <div className="p-4 rounded-lg bg-gradient-to-r from-ancient-gold/20 to-ancient-orange/20 border border-ancient-gold/30 mb-4">
                <h3 className="text-lg font-bold text-ancient-gold mb-2">卦象总结</h3>
                <p className="text-ancient-dark">{result.summary}</p>
              </div>
            </div>

            <div className="ancient-card">
              <h3 className="text-lg font-bold text-ancient-gold mb-4">各爻解读</h3>
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
              再次投掷
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
