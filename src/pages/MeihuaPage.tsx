import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, Hash, FileText, RefreshCw, Info } from 'lucide-react';
import { calculateMeihua, MeihuaResult } from '../utils/meihuaCalculator';

export default function MeihuaPage() {
  const [method, setMethod] = useState<'time' | 'numbers' | 'text'>('time');
  const [numbers, setNumbers] = useState({ num1: '', num2: '' });
  const [text, setText] = useState('');
  const [result, setResult] = useState<MeihuaResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    setTimeout(() => {
      let meihuaResult: MeihuaResult;
      const now = new Date();
      
      if (method === 'time') {
        const year = now.getFullYear() % 100;
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hour = now.getHours();
        meihuaResult = calculateMeihua('time', year, month, day, hour);
      } else if (method === 'numbers') {
        const num1 = parseInt(numbers.num1) || Math.floor(Math.random() * 100) + 1;
        const num2 = parseInt(numbers.num2) || Math.floor(Math.random() * 100) + 1;
        meihuaResult = calculateMeihua('numbers', num1, num2);
      } else {
        meihuaResult = calculateMeihua('text', text || '占卜');
      }
      
      setResult(meihuaResult);
      setIsCalculating(false);
    }, 1500);
  };

  const handleReset = () => {
    setResult(null);
    setNumbers({ num1: '', num2: '' });
    setText('');
  };

  const renderGuaCard = (upperGua: any, lowerGua: any, title: string, highlight = false) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`ancient-card p-4 text-center ${highlight ? 'border-ancient-gold/50' : ''}`}
    >
      <div className={`text-sm mb-2 ${highlight ? 'text-ancient-gold' : 'text-ancient-gray'}`}>{title}</div>
      <div className="text-4xl mb-2">{upperGua.symbol}</div>
      <div className="text-xl font-bold text-ancient-dark">{upperGua.name}</div>
      <div className="text-xs text-ancient-gray mt-1">{upperGua.pinyin}</div>
      <div className="text-4xl mb-2 mt-4">{lowerGua.symbol}</div>
      <div className="text-xl font-bold text-ancient-dark">{lowerGua.name}</div>
      <div className="text-xs text-ancient-gray mt-1">{lowerGua.pinyin}</div>
      <div className="mt-3 pt-3 border-t border-ancient-brown/30">
        <div className="flex justify-center gap-4 text-xs">
          <span className="text-ancient-gold">{upperGua.wuxing}</span>
          <span className="text-ancient-brown/50">|</span>
          <span className="text-ancient-purple">{upperGua.natural}</span>
        </div>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-purple/10 border border-ancient-purple/30 mb-4">
            <Sparkles className="w-4 h-4 text-ancient-purple" />
            <span className="text-ancient-purple text-sm">梅花易数</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            梅花易数
          </h1>
          <p className="text-ancient-brown">快速起卦，洞察先机，与周易占卜相辅相成</p>
        </motion.div>

        {!result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ancient-card p-6"
          >
            <div className="mb-6">
              <label className="text-sm text-ancient-gray mb-3 block">选择起卦方式</label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setMethod('time')}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    method === 'time'
                      ? 'border-ancient-gold bg-ancient-gold/20 text-ancient-gold'
                      : 'border-ancient-brown/50 text-ancient-brown hover:border-ancient-brown'
                  }`}
                >
                  <Clock className="w-5 h-5" />
                  <span className="text-sm">时间起卦</span>
                </button>
                <button
                  onClick={() => setMethod('numbers')}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    method === 'numbers'
                      ? 'border-ancient-red bg-ancient-red/20 text-ancient-red'
                      : 'border-ancient-brown/50 text-ancient-brown hover:border-ancient-brown'
                  }`}
                >
                  <Hash className="w-5 h-5" />
                  <span className="text-sm">数字起卦</span>
                </button>
                <button
                  onClick={() => setMethod('text')}
                  className={`p-3 rounded-lg border transition-all flex flex-col items-center gap-2 ${
                    method === 'text'
                      ? 'border-ancient-orange bg-ancient-orange/20 text-ancient-orange'
                      : 'border-ancient-brown/50 text-ancient-brown hover:border-ancient-brown'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className="text-sm">文字起卦</span>
                </button>
              </div>
            </div>

            {method === 'numbers' && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm text-ancient-gray mb-2 block">第一个数字（上卦）</label>
                  <input
                    type="number"
                    value={numbers.num1}
                    onChange={(e) => setNumbers(prev => ({ ...prev, num1: e.target.value }))}
                    placeholder="输入1-100的数字"
                    className="ancient-input w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-ancient-gray mb-2 block">第二个数字（下卦）</label>
                  <input
                    type="number"
                    value={numbers.num2}
                    onChange={(e) => setNumbers(prev => ({ ...prev, num2: e.target.value }))}
                    placeholder="输入1-100的数字"
                    className="ancient-input w-full"
                  />
                </div>
              </div>
            )}

            {method === 'text' && (
              <div className="mb-6">
                <label className="text-sm text-ancient-gray mb-2 block">输入文字</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="输入要占卜的问题或文字"
                  rows={3}
                  className="ancient-input w-full resize-none"
                />
              </div>
            )}

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
                  起卦中...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  开始起卦
                </>
              )}
            </motion.button>
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
              className="w-20 h-20 mx-auto mb-4 rounded-full border-2 border-ancient-purple/30 flex items-center justify-center"
            >
              <span className="text-3xl">☯</span>
            </motion.div>
            <p className="text-ancient-gray">正在推演卦象...</p>
          </motion.div>
        )}

        {result && !isCalculating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* 主卦 */}
            <div className="ancient-card p-6">
              <h3 className="text-lg font-bold text-ancient-purple mb-4 text-center">本卦</h3>
              <div className="flex justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">{result.upperGuaInfo.symbol}</div>
                  <div className="text-2xl font-bold text-ancient-dark">{result.upperGuaInfo.name}</div>
                  <div className="text-sm text-ancient-gray">{result.upperGuaInfo.natural}</div>
                </div>
                <div className="mx-4 flex flex-col justify-center">
                  <div className="text-2xl font-bold text-ancient-gold">+</div>
                </div>
                <div className="text-center">
                  <div className="text-6xl mb-4">{result.lowerGuaInfo.symbol}</div>
                  <div className="text-2xl font-bold text-ancient-dark">{result.lowerGuaInfo.name}</div>
                  <div className="text-sm text-ancient-gray">{result.lowerGuaInfo.natural}</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="px-3 py-1 rounded-full bg-ancient-gold/20 text-ancient-gold text-sm">
                  动爻：第{result.movingLine}爻
                </span>
              </div>
            </div>

            {/* 互卦和变卦 */}
            <div className="grid md:grid-cols-2 gap-4">
              {renderGuaCard(result.huGua.upperHuInfo, result.huGua.lowerHuInfo, '互卦')}
              {renderGuaCard(result.bianGua.newUpperInfo, result.bianGua.newLowerInfo, '变卦')}
            </div>

            {/* 体用关系 */}
            <div className="ancient-card p-6">
              <h3 className="text-lg font-bold text-ancient-gold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5" />
                体用关系
              </h3>
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-3xl mb-2">{result.tiYong.tiInfo.symbol}</div>
                  <div className="text-xl font-bold text-ancient-dark">{result.tiYong.tiInfo.name}</div>
                  <div className="text-sm text-ancient-gold">体</div>
                </div>
                <div className="text-2xl font-bold text-ancient-orange">{result.tiYong.relation}</div>
                <div className="text-center">
                  <div className="text-3xl mb-2">{result.tiYong.yongInfo.symbol}</div>
                  <div className="text-xl font-bold text-ancient-dark">{result.tiYong.yongInfo.name}</div>
                  <div className="text-sm text-ancient-red">用</div>
                </div>
              </div>
              <div className="mt-4 text-center text-ancient-dark">
                {result.tiYong.description}
              </div>
            </div>

            {/* 断语 */}
            <div className="ancient-card p-6">
              <h3 className="text-lg font-bold text-ancient-gold mb-4">卦象断语</h3>
              <div className="text-ancient-dark leading-relaxed">
                {result.duanyu}
              </div>
              <div className="mt-4 pt-4 border-t border-ancient-brown/30">
                <div className="text-sm text-ancient-gray">
                  <strong className="text-ancient-gold">{result.lineDuanyu}</strong>
                </div>
              </div>
            </div>

            {/* 总结 */}
            <div className="ancient-card p-6 bg-gradient-to-r from-ancient-purple/10 to-ancient-red/10 border border-ancient-purple/30">
              <h3 className="text-lg font-bold text-ancient-purple mb-4">综合解读</h3>
              <div className="text-ancient-dark leading-relaxed">
                {result.summary}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="ancient-btn-secondary w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              重新起卦
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
