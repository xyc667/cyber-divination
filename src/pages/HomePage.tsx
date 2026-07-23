import { motion } from 'framer-motion';
import { Compass, BookOpen, Coins, Eye, Sparkles, ChevronRight, Calendar, Sparkle, User, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDivinationStore } from '../store/divinationStore';

const features = [
  {
    icon: Compass,
    title: '奇门遁甲',
    description: '古代高层次预测学，通过排盘洞察天时地利人和',
    path: '/qimen',
    color: 'from-ancient-red to-ancient-orange'
  },
  {
    icon: BookOpen,
    title: '周易占卜',
    description: '源自易经的智慧，通过卦象解读人生奥秘',
    path: '/zhouyi',
    color: 'from-ancient-gold to-ancient-orange'
  },
  {
    icon: Calendar,
    title: '四柱八字',
    description: '传统命理学，分析命盘、大运、流年运势',
    path: '/bazi',
    color: 'from-ancient-orange to-ancient-red'
  },
  {
    icon: Sparkle,
    title: '梅花易数',
    description: '快速起卦法，时间数字文字皆可起卦',
    path: '/meihua',
    color: 'from-ancient-gold to-ancient-red'
  },
  {
    icon: Coins,
    title: '六爻预测',
    description: '传统占卜术，通过六爻变化预测吉凶祸福',
    path: '/liuyao',
    color: 'from-ancient-orange to-ancient-red'
  },
  {
    icon: Eye,
    title: '射覆游戏',
    description: '古代文人雅士的智慧游戏，卜卦猜物',
    path: '/shefu',
    color: 'from-ancient-red to-ancient-gold'
  },
  {
    icon: MessageCircle,
    title: '智能问答',
    description: '国学知识库，智能解答占卜命理疑问',
    path: '/chat',
    color: 'from-ancient-brown to-ancient-orange'
  },
  {
    icon: User,
    title: '我的命盘',
    description: '管理您的个人命盘和占卜历史记录',
    path: '/profile',
    color: 'from-ancient-gold to-ancient-brown'
  }
];

export default function HomePage() {
  const navigate = useNavigate();
  const { records } = useDivinationStore();

  return (
    <div className="min-h-screen pt-20 pb-10">
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-ancient-dark via-ancient-bg to-ancient-dark" />
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-ancient-gold/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -15, 0],
                opacity: [0.2, 0.6, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-gold/10 border border-ancient-gold/30 mb-6">
              <Sparkles className="w-4 h-4 text-ancient-gold" />
              <span className="text-ancient-gold text-sm">易经智慧 · 国学传承</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 brush-text">
              <span className="text-ancient-gold">
                周易草堂
              </span>
            </h1>
            
            <p className="text-xl text-ancient-text mb-8 max-w-2xl mx-auto">
              传承千年智慧，探索奇门遁甲、周易占卜、六爻预测的神秘世界
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/zhouyi')}
                className="ancient-btn flex items-center justify-center gap-2"
              >
                起卦占卜
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
              占卜法门
            </h2>
            <p className="text-ancient-brown">选择一种占卜方式，开启你的探索之旅</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.path}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -5 }}
                onClick={() => navigate(feature.path)}
                className="ancient-card cursor-pointer group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-ancient-dark mb-3 brush-text">{feature.title}</h3>
                <p className="text-ancient-brown mb-4 text-sm">{feature.description}</p>
                
                <div className="flex items-center text-ancient-red group-hover:gap-2 transition-all duration-300">
                  <span className="text-sm">开始占卜</span>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {records.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
                最近记录
              </h2>
            </motion.div>

            <div className="grid gap-4">
              {records.slice(0, 3).map((record) => (
                <motion.div
                  key={record.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="ancient-card flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${
                      record.type === 'qimen' ? 'from-ancient-red to-ancient-orange' :
                      record.type === 'zhouyi' ? 'from-ancient-gold to-ancient-orange' :
                      'from-ancient-orange to-ancient-red'
                    } flex items-center justify-center text-white font-bold brush-text`}>
                      {record.type === 'qimen' ? '奇' : record.type === 'zhouyi' ? '周' : '六'}
                    </div>
                    <div>
                      <div className="font-medium text-ancient-dark">
                        {record.type === 'qimen' ? '奇门遁甲排盘' : 
                         record.type === 'zhouyi' ? '周易占卜' : '六爻预测'}
                      </div>
                      <div className="text-sm text-ancient-gray">
                        {new Date(record.timestamp).toLocaleString('zh-CN')}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(
                      record.type === 'qimen' ? '/qimen' :
                      record.type === 'zhouyi' ? '/zhouyi' : '/liuyao'
                    )}
                    className="ancient-btn-secondary text-sm px-4 py-2"
                  >
                    再次占卜
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="ancient-card"
          >
            <Sparkles className="w-12 h-12 text-ancient-gold mx-auto mb-4" />
            <h3 className="text-xl font-bold text-ancient-dark mb-2 brush-text">传承千年的古老智慧</h3>
            <p className="text-ancient-brown">
              我们致力于传承和弘扬中华传统占卜文化，
              为您提供便捷、准确的在线占卜服务。
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
