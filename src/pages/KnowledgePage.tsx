import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Compass, Coins, Eye, Sparkles, ChevronRight, Search } from 'lucide-react';
import { getAllCategories, KnowledgeCategory, KnowledgeItem } from '../data/knowledgeBase';
import { hexagrams, Hexagram, searchHexagrams } from '../data/hexagrams';

const iconMap: Record<string, typeof Compass> = {
  Compass,
  BookOpen,
  Coins,
  Eye,
  Sparkles
};

type ViewMode = 'categories' | 'articles' | 'article-detail' | 'hexagrams' | 'hexagram-detail';

export default function KnowledgePage() {
  const [viewMode, setViewMode] = useState<ViewMode>('categories');
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | null>(null);
  const [selectedItem, setSelectedItem] = useState<KnowledgeItem | null>(null);
  const [selectedHexagram, setSelectedHexagram] = useState<Hexagram | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getAllCategories();

  const filteredItems = selectedCategory
    ? selectedCategory.items.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredHexagrams = searchQuery ? searchHexagrams(searchQuery) : hexagrams;

  const handleCategoryClick = (category: KnowledgeCategory) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    setViewMode('articles');
  };

  const handleItemClick = (item: KnowledgeItem) => {
    setSelectedItem(item);
    setViewMode('article-detail');
  };

  const handleHexagramClick = (hexagram: Hexagram) => {
    setSelectedHexagram(hexagram);
    setViewMode('hexagram-detail');
  };

  const handleBack = () => {
    if (viewMode === 'article-detail') {
      setSelectedItem(null);
      setViewMode('articles');
    } else if (viewMode === 'articles') {
      setSelectedCategory(null);
      setViewMode('categories');
    } else if (viewMode === 'hexagram-detail') {
      setSelectedHexagram(null);
      setViewMode('hexagrams');
    } else if (viewMode === 'hexagrams') {
      setViewMode('categories');
    }
  };

  const handleViewHexagrams = () => {
    setViewMode('hexagrams');
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 mb-4">
            <BookOpen className="w-4 h-4 text-cyber-cyan" />
            <span className="text-cyber-cyan text-sm">知识宝库</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyber-cyan to-cyber-pink bg-clip-text text-transparent">
              知识库
            </span>
          </h1>
          <p className="text-gray-400">探索占卜文化的深层智慧与知识</p>
        </motion.div>

        {viewMode === 'categories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              onClick={handleViewHexagrams}
              className="cyber-card cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-3xl">☯</span>
              </div>
              <h3 className="text-xl font-bold text-yellow-400 mb-2">六十四卦</h3>
              <p className="text-gray-400 text-sm mb-4">完整的周易六十四卦详解</p>
              <div className="flex items-center text-yellow-400">
                <span className="text-sm">查看 (64卦)</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>

            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon] || BookOpen;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + 1) * 0.05 }}
                  whileHover={{ y: -5 }}
                  onClick={() => handleCategoryClick(category)}
                  className="cyber-card cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyber-cyan/30 to-cyber-pink/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-cyber-cyan" />
                  </div>
                  <h3 className="text-xl font-bold text-cyber-cyan mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{category.description}</p>
                  <div className="flex items-center text-cyber-cyan">
                    <span className="text-sm">查看 ({category.items.length}篇)</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {viewMode === 'articles' && selectedCategory && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="cyber-btn-secondary flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                返回分类
              </button>
              <h2 className="text-2xl font-bold text-cyber-cyan">{selectedCategory.name}</h2>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索文章..."
                className="cyber-input pl-12"
              />
            </div>

            <div className="space-y-4">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                    onClick={() => handleItemClick(item)}
                    className="cyber-card cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-200 group-hover:text-cyber-cyan transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                          {item.content.slice(0, 100)}...
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-cyber-cyan group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12 text-gray-500">
                  未找到相关内容
                </div>
              )}
            </div>
          </motion.div>
        )}

        {viewMode === 'article-detail' && selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="cyber-btn-secondary flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                返回列表
              </button>
            </div>

            <div className="cyber-card">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 mb-4">
                <span className="text-cyber-cyan text-sm">{selectedItem.category}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-100 mb-6">{selectedItem.title}</h2>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {selectedItem.content}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {viewMode === 'hexagrams' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="cyber-btn-secondary flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                返回分类
              </button>
              <h2 className="text-2xl font-bold text-yellow-400">周易六十四卦</h2>
            </div>

            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索卦名、卦辞..."
                className="cyber-input pl-12"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
              {filteredHexagrams.map((hexagram, index) => (
                <motion.div
                  key={hexagram.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  onClick={() => handleHexagramClick(hexagram)}
                  className="cyber-card cursor-pointer text-center p-3 group"
                >
                  <div className="text-3xl mb-2 group-hover:text-yellow-400 transition-colors">
                    {hexagram.symbol}
                  </div>
                  <div className="text-sm font-medium text-gray-200">{hexagram.number}.{hexagram.name}</div>
                  <div className="text-xs text-gray-500">{hexagram.pinyin}</div>
                </motion.div>
              ))}
            </div>

            {filteredHexagrams.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                未找到相关卦象
              </div>
            )}
          </motion.div>
        )}

        {viewMode === 'hexagram-detail' && selectedHexagram && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={handleBack}
                className="cyber-btn-secondary flex items-center gap-2"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                返回卦象列表
              </button>
            </div>

            <div className="cyber-card">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4">{selectedHexagram.symbol}</div>
                <h2 className="text-3xl font-bold text-yellow-400 mb-2">
                  第{selectedHexagram.number}卦 · {selectedHexagram.name} ({selectedHexagram.pinyin})
                </h2>
                <div className="text-gray-400">
                  上卦：{selectedHexagram.upperTrigram} · 下卦：{selectedHexagram.lowerTrigram}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-cyber-dark/50 border border-yellow-400/30">
                  <h3 className="text-sm text-yellow-400 mb-2">卦辞</h3>
                  <p className="text-lg text-gray-200">{selectedHexagram.guaci}</p>
                </div>

                <div className="p-4 rounded-lg bg-cyber-dark/50 border border-purple-500/30">
                  <h3 className="text-sm text-purple-400 mb-2">象曰</h3>
                  <p className="text-lg text-gray-200">{selectedHexagram.xiang}</p>
                </div>

                <div>
                  <h3 className="text-sm text-cyber-cyan mb-4">爻辞</h3>
                  <div className="space-y-3">
                    {selectedHexagram.yao.map((yao, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-cyber-dark/30 border border-cyber-cyan/20"
                      >
                        <p className="text-gray-200">{yao}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
