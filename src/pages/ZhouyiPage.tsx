import { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { calculateZhouyi, ZhouyiResult } from '../utils/zhouyiCalculator';
import { useDivinationStore } from '../store/divinationStore';

export default function ZhouyiPage() {
  const [result, setResult] = useState<ZhouyiResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { addRecord } = useDivinationStore();

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const zhouyiResult = calculateZhouyi();
      setResult(zhouyiResult);
      addRecord({ type: 'zhouyi', zhouyiResult });
      setIsCalculating(false);
    }, 2000);
  };

  const handleReset = () => {
    setResult(null);
  };

  const renderHexagram = (lines: number[]) => {
    return lines.map((line, index) => (
      <div
        key={index}
        className={`h-8 flex items-center justify-center rounded ${
          line === 1
            ? 'bg-gradient-to-r from-ancient-gold/30 to-ancient-orange/30 border border-ancient-gold/50'
            : 'bg-ancient-paper/30 border-b-2 border-ancient-red/50 border-x border-ancient-red/20'
        }`}
      >
        <span className={`text-2xl font-bold ${line === 1 ? 'text-ancient-gold' : 'text-ancient-red'}`}>
          {line === 1 ? '☰' : '☷'}
        </span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-red/10 border border-ancient-red/30 mb-4">
            <BookOpen className="w-4 h-4 text-ancient-red" />
            <span className="text-ancient-red text-sm">周易占卜</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            周易六十四卦
          </h1>
          <p className="text-ancient-brown">问天地之理，探人生之道</p>
        </motion.div>

        {!result ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ancient-card text-center"
          >
            <div className="mb-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 mx-auto relative"
              >
                <div className="absolute inset-0 rounded-full border-2 border-ancient-red/30" />
                <div className="absolute inset-4 rounded-full border-2 border-ancient-gold/30" />
                <div className="absolute inset-8 rounded-full border-2 border-ancient-red/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ancient-red to-ancient-orange flex items-center justify-center">
                    <span className="text-3xl font-bold text-white brush-text">易</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <h3 className="text-xl font-medium text-ancient-dark mb-4">
              静心思考您的问题，然后点击开始占卜
            </h3>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCalculate}
              disabled={isCalculating}
              className="ancient-btn w-full max-w-xs flex items-center justify-center gap-2 mx-auto"
            >
              {isCalculating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  卜算中...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  开始占卜
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
                <div className="inline-block p-4 rounded-xl bg-gradient-to-br from-ancient-red/20 to-ancient-gold/20 border border-ancient-red/30">
                  <div className="text-6xl font-bold mb-2">
                    {result.hexagram.symbol}
                  </div>
                  <div className="text-2xl font-bold text-ancient-gold brush-text">
                    {result.hexagram.name}卦 · {result.hexagram.meaning}
                  </div>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <div className="space-y-1">
                  {renderHexagram(result.hexagram.lines)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-ancient-dark/20 border border-ancient-gold/20">
                  <div className="text-sm text-ancient-gray mb-1">卦辞</div>
                  <div className="text-ancient-gold">{result.hexagram.judgment}</div>
                </div>
                <div className="p-4 rounded-lg bg-ancient-dark/20 border border-ancient-red/20">
                  <div className="text-sm text-ancient-gray mb-1">象曰</div>
                  <div className="text-ancient-red">{result.hexagram.image}</div>
                </div>
              </div>
            </div>

            {result.changingLines.length > 0 && (
              <div className="ancient-card">
                <h3 className="text-lg font-bold text-ancient-orange mb-4">变爻提示</h3>
                <p className="text-ancient-dark">
                  变爻位置：第{result.changingLines.join('、')}爻
                </p>
                <p className="text-ancient-brown text-sm mt-2">
                  变爻意味着事物正在发生变化，需关注变化带来的机遇与挑战。
                </p>
              </div>
            )}

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
              再次占卜
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
