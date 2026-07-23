import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Sparkles, Lightbulb, Eye, Trophy, HelpCircle, Check, X, Play } from 'lucide-react';
import { getAllItems, getInitialQuestion, filterItemsByAnswer, getNextQuestion, makeFinalGuess, ShefuItem } from '../utils/shefuCalculator';

type GameState = 'idle' | 'selecting' | 'playing' | 'guessing' | 'won' | 'lost';

export default function ShefuPage() {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [selectedItem, setSelectedItem] = useState<ShefuItem | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<{ question: string; feature: string } | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [remainingItems, setRemainingItems] = useState<ShefuItem[]>([]);
  const [finalGuess, setFinalGuess] = useState('');
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const allItems = getAllItems();

  const startGame = () => {
    setGameState('selecting');
    setSelectedItem(null);
  };

  const selectItem = (item: ShefuItem) => {
    setSelectedItem(item);
    setRemainingItems([...allItems]);
    const initialQuestion = getInitialQuestion();
    setCurrentQuestion(initialQuestion);
    setQuestionIndex(0);
    setAskedQuestions([]);
    setSelectedAnswer(null);
    setGameState('playing');
  };

  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion || !selectedItem) return;

    setSelectedAnswer(answer);
    setAskedQuestions([...askedQuestions, `${currentQuestion.question} ${answer ? '是' : '否'}`]);

    const filteredItems = filterItemsByAnswer(remainingItems, questionIndex, answer);
    setRemainingItems(filteredItems);

    if (filteredItems.length <= 1 || questionIndex >= 17) {
      const guess = makeFinalGuess(filteredItems);
      setFinalGuess(guess);
      setGameState('guessing');
    } else {
      const nextQuestion = getNextQuestion(questionIndex);
      if (nextQuestion) {
        setCurrentQuestion(nextQuestion);
        setQuestionIndex(questionIndex + 1);
      }
    }
  };

  const confirmGuess = (correct: boolean) => {
    if (correct) {
      setGameState('won');
    } else {
      setGameState('lost');
    }
  };

  const resetGame = () => {
    setGameState('idle');
    setSelectedItem(null);
    setCurrentQuestion(null);
    setQuestionIndex(0);
    setRemainingItems([]);
    setFinalGuess('');
    setAskedQuestions([]);
    setSelectedAnswer(null);
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-purple/10 border border-ancient-purple/30 mb-4">
            <Eye className="w-4 h-4 text-ancient-purple" />
            <span className="text-ancient-purple text-sm">射覆游戏</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            射覆
          </h1>
          <p className="text-ancient-brown">
            你想一个物品，我来猜 —— 古代文人雅士的智慧游戏
          </p>
        </motion.div>

        {gameState === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="ancient-card text-center"
          >
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-ancient-purple/20 to-ancient-red/20 flex items-center justify-center border border-ancient-purple/30">
                <Eye className="w-12 h-12 text-ancient-purple" />
              </div>
            </div>

            <div className="mb-8 text-left space-y-4">
              <h3 className="text-lg font-bold text-ancient-gold">游戏规则</h3>
              <ul className="text-ancient-gray space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-ancient-purple">1.</span>
                  从物品列表中选择一个物品
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ancient-purple">2.</span>
                  系统会通过提问来猜测你选的物品
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ancient-purple">3.</span>
                  回答"是"或"否"来帮助系统缩小范围
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ancient-purple">4.</span>
                  系统会在有限次数内做出最终猜测
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="ancient-btn w-full max-w-xs flex items-center justify-center gap-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              开始游戏
            </motion.button>
          </motion.div>
        )}

        {gameState === 'selecting' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <button
                onClick={resetGame}
                className="ancient-btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                返回
              </button>
              <h2 className="text-xl font-bold text-ancient-gold brush-text">选择一个物品</h2>
              <div className="w-20"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  onClick={() => selectItem(item)}
                  className="ancient-card cursor-pointer text-center p-4 group"
                >
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="text-sm font-medium text-ancient-dark group-hover:text-ancient-gold transition-colors">
                    {item.name}
                  </div>
                  <div className="text-xs text-ancient-gray">{item.category}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && currentQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <button
                onClick={resetGame}
                className="ancient-btn-secondary flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                重新开始
              </button>
              <div className="text-sm text-ancient-gray">剩余物品: {remainingItems.length}</div>
              <div className="w-20"></div>
            </div>

            <div className="ancient-card text-center p-8">
              <div className="text-4xl mb-6">🔮</div>
              <h2 className="text-2xl font-bold text-ancient-gold mb-2 brush-text">第 {questionIndex + 1} 问</h2>
              <p className="text-xl text-ancient-dark">{currentQuestion.question}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(true)}
                className="ancient-btn flex items-center justify-center gap-2 bg-ancient-red hover:bg-ancient-red/80"
              >
                <Check className="w-5 h-5" />
                是
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(false)}
                className="ancient-btn flex items-center justify-center gap-2 bg-ancient-brown hover:bg-ancient-brown/80"
              >
                <X className="w-5 h-5" />
                否
              </motion.button>
            </div>

            {askedQuestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="ancient-card"
              >
                <h3 className="text-sm text-ancient-gray mb-3">已问问题</h3>
                <div className="flex flex-wrap gap-2">
                  {askedQuestions.map((q, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-ancient-dark/20 text-ancient-gray text-sm"
                    >
                      {q}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {gameState === 'guessing' && selectedItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="ancient-card text-center p-8">
              <div className="text-6xl mb-6">🤔</div>
              <h2 className="text-2xl font-bold text-ancient-gold mb-4 brush-text">我的猜测是...</h2>
              <div className="text-4xl font-bold text-ancient-red mb-6">{finalGuess}</div>
              <p className="text-ancient-gray">我猜你想的是「{finalGuess}」，对吗？</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => confirmGuess(finalGuess === selectedItem.name)}
                className="ancient-btn flex items-center justify-center gap-2 bg-ancient-red hover:bg-ancient-red/80"
              >
                <Check className="w-5 h-5" />
                猜对了！
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => confirmGuess(false)}
                className="ancient-btn flex items-center justify-center gap-2 bg-ancient-brown hover:bg-ancient-brown/80"
              >
                <X className="w-5 h-5" />
                猜错了
              </motion.button>
            </div>
          </motion.div>
        )}

        {(gameState === 'won' || gameState === 'lost') && selectedItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ancient-card text-center"
          >
            {gameState === 'won' ? (
              <>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-ancient-gold to-ancient-orange flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-ancient-gold mb-2 brush-text">🎉 恭喜！我猜对了！</h3>
                <p className="text-ancient-gray mb-4">
                  你想的确实是「{selectedItem.name}」
                </p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-ancient-red to-ancient-brown flex items-center justify-center">
                  <HelpCircle className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-ancient-red mb-2">😅 猜错了！</h3>
                <p className="text-ancient-gray mb-4">
                  你想的其实是「{selectedItem.name}」
                </p>
                <p className="text-ancient-gray text-sm mb-4">
                  {selectedItem.description}
                </p>
              </>
            )}
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetGame}
              className="ancient-btn"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              再玩一次
            </motion.button>
          </motion.div>
        )}

        {gameState !== 'selecting' && gameState !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <h3 className="text-lg font-bold text-ancient-gold mb-4 text-center brush-text">物品列表（共{allItems.length}件）</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allItems.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border text-center ${
                    selectedItem?.id === item.id
                      ? 'bg-ancient-gold/20 border-ancient-gold/50'
                      : 'bg-ancient-dark/20 border-ancient-brown/30'
                  }`}
                >
                  <div className="text-sm text-ancient-dark">{item.name}</div>
                  <div className="text-xs text-ancient-gray">{item.category}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
