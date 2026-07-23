import { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { label: '首页', path: '/' },
  { label: '奇门遁甲', path: '/qimen' },
  { label: '周易占卜', path: '/zhouyi' },
  { label: '四柱八字', path: '/bazi' },
  { label: '梅花易数', path: '/meihua' },
  { label: '六爻预测', path: '/liuyao' },
  { label: '射覆游戏', path: '/shefu' },
  { label: '知识图谱', path: '/knowledge-graph' },
  { label: '智能问答', path: '/chat' },
  { label: '我的命盘', path: '/profile' },
  { label: '知识库', path: '/knowledge' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ancient-dark/90 backdrop-blur-sm border-b border-ancient-brown/30">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-ancient-red to-ancient-orange flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold text-ancient-gold brush-text">
              周易草堂
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-ancient-gold/20 text-ancient-gold border border-ancient-gold/30'
                    : 'text-ancient-text hover:text-ancient-gold hover:bg-ancient-gold/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-ancient-gold p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-ancient-brown/30 pt-4"
            >
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(item.path)
                      ? 'bg-ancient-gold/20 text-ancient-gold'
                      : 'text-ancient-text hover:text-ancient-gold hover:bg-ancient-gold/10'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
