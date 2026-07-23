import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Bot, User, Sparkles, BookOpen, ChevronRight } from 'lucide-react';
import { ragEngine } from '../utils/ragEngine';
import { KnowledgeItem } from '../utils/ragKnowledgeBase';

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  sources?: KnowledgeItem[];
  timestamp: Date;
}

export default function RAGChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: '您好！我是赛博算卦的智能顾问，精通周易、八字、奇门遁甲、六爻等占卜知识。请问有什么可以帮您解答的？',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const { answer, sources } = ragEngine.generateAnswer(input);

    const assistantMessage: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: answer,
      sources,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsThinking(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    '什么是五行？',
    '天干地支是什么？',
    '八字命理怎么看？',
    '奇门遁甲排盘方法',
    '周易六十四卦'
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-purple/10 border border-ancient-purple/30 mb-4">
            <MessageCircle className="w-4 h-4 text-ancient-purple" />
            <span className="text-ancient-purple text-sm">智能问答</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            占卜知识库
          </h1>
          <p className="text-ancient-brown">随时解答您关于占卜、命理的疑问</p>
        </motion.div>

        {/* 快速问题 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="ancient-card p-4 mb-6"
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-ancient-gray mr-2">快速提问：</span>
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInput(question)}
                className="px-4 py-2 rounded-full bg-ancient-dark/30 text-ancient-gray text-sm hover:bg-ancient-dark/50 transition-all"
              >
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 聊天区域 */}
        <div className="ancient-card p-6 mb-6" style={{ minHeight: '400px' }}>
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user'
                      ? 'bg-ancient-red/20 text-ancient-red'
                      : 'bg-ancient-purple/20 text-ancient-purple'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-5 h-5" />
                    ) : (
                      <Bot className="w-5 h-5" />
                    )}
                  </div>
                  <div className={`max-w-[70%] ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block px-4 py-2 rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-ancient-red/20 text-ancient-red rounded-br-md'
                        : 'bg-ancient-dark/30 text-ancient-dark rounded-bl-md'
                    }`}>
                      {message.content}
                    </div>
                    {message.sources && message.sources.length > 0 && (
                      <div className="mt-2">
                        <div className="text-xs text-ancient-gray mb-1">参考来源：</div>
                        {message.sources.slice(0, 2).map((source, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-ancient-gray flex items-center gap-1 cursor-pointer hover:text-ancient-gold"
                          >
                            <BookOpen className="w-3 h-3" />
                            {source.title}
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isThinking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-ancient-purple/20 text-ancient-purple flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="px-4 py-2 rounded-2xl bg-ancient-dark/30 rounded-bl-md">
                  <div className="flex gap-1">
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-2 h-2 rounded-full bg-ancient-gray"
                    />
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-2 h-2 rounded-full bg-ancient-gray"
                    />
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-2 h-2 rounded-full bg-ancient-gray"
                    />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* 输入区域 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ancient-card p-4"
        >
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入您的问题，例如：什么是八字命理？"
                rows={2}
                className="ancient-input w-full resize-none pr-12"
                disabled={isThinking}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              disabled={!input.trim() || isThinking}
              className="ancient-btn px-6 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden md:inline">发送</span>
            </motion.button>
          </div>
        </motion.div>

        {/* 功能提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-ancient-gray text-sm"
        >
          <div className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              支持周易、八字、奇门、六爻等知识
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
