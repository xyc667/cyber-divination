import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Link2, ChevronRight, X, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import { knowledgeBase, knowledgeGraphNodes, knowledgeGraphLinks, type KnowledgeItem, type KnowledgeGraphNode } from '../utils/ragKnowledgeBase';

export default function KnowledgeGraphPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<KnowledgeGraphNode | null>(null);
  const [selectedKnowledge, setSelectedKnowledge] = useState<KnowledgeItem | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [searchResults, setSearchResults] = useState<KnowledgeItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cats = ['全部', ...new Set(knowledgeBase.map(item => item.category))];
    setCategories(cats);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = knowledgeBase.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const filteredKnowledge = activeCategory === '全部' 
    ? knowledgeBase 
    : knowledgeBase.filter(item => item.category === activeCategory);

  const handleNodeClick = (node: KnowledgeGraphNode) => {
    setSelectedNode(node);
    const relatedKnowledge = knowledgeBase.find(k => 
      k.title.includes(node.label) || k.keywords.includes(node.label)
    );
    if (relatedKnowledge) {
      setSelectedKnowledge(relatedKnowledge);
      setShowModal(true);
    }
  };

  const handleKnowledgeClick = (knowledge: KnowledgeItem) => {
    setSelectedKnowledge(knowledge);
    setShowModal(true);
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(prev * delta, 0.5), 2));
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current) {
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      positionStart.current = { ...position };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition({
        x: positionStart.current.x + dx,
        y: positionStart.current.y + dy
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'book': return '#b8860b';
      case 'concept': return '#8b0000';
      case 'method': return '#cd853f';
      case 'person': return '#6b4423';
      default: return '#5d4037';
    }
  };

  const getNodeShape = (type: string) => {
    switch (type) {
      case 'book': return 'rect';
      case 'concept': return 'circle';
      case 'method': return 'polygon';
      case 'person': return 'ellipse';
      default: return 'circle';
    }
  };

  const layoutNodes = () => {
    const nodes = knowledgeGraphNodes;
    const width = 800;
    const height = 600;
    
    const categoryGroups: Record<string, KnowledgeGraphNode[]> = {};
    nodes.forEach(node => {
      if (!categoryGroups[node.category]) {
        categoryGroups[node.category] = [];
      }
      categoryGroups[node.category].push(node);
    });

    const categories = Object.keys(categoryGroups);
    const angleStep = (2 * Math.PI) / categories.length;
    const radius = 180;

    let nodeIndex = 0;
    nodes.forEach(node => {
      const catIndex = categories.indexOf(node.category);
      const baseAngle = catIndex * angleStep;
      const nodesInCat = categoryGroups[node.category].length;
      const nodeInCatIndex = categoryGroups[node.category].indexOf(node);
      
      const spreadAngle = Math.min(angleStep * 0.6, Math.PI / 6);
      const angle = baseAngle + (nodeInCatIndex - (nodesInCat - 1) / 2) * (spreadAngle / (nodesInCat - 1 || 1));
      
      const nodeRadius = radius * (0.8 + Math.random() * 0.4);
      
      node.x = width / 2 + Math.cos(angle) * nodeRadius;
      node.y = height / 2 + Math.sin(angle) * nodeRadius;
      nodeIndex++;
    });

    return { width, height };
  };

  const { width, height } = layoutNodes();

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-ancient-paper">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ancient-gold/10 border border-ancient-gold/30 mb-4">
            <Link2 className="w-4 h-4 text-ancient-gold" />
            <span className="text-ancient-gold text-sm">知识图谱</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 brush-text text-ancient-dark">
            命理知识库
          </h1>
          <p className="text-ancient-brown">探索古代命理经典，构建知识网络</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="ancient-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-ancient-gold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  知识网络图
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setScale(prev => Math.max(prev * 0.8, 0.5))}
                    className="p-2 rounded-lg bg-ancient-dark/20 hover:bg-ancient-dark/30 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4 text-ancient-gray" />
                  </button>
                  <button
                    onClick={() => setScale(prev => Math.min(prev * 1.25, 2))}
                    className="p-2 rounded-lg bg-ancient-dark/20 hover:bg-ancient-dark/30 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-ancient-gray" />
                  </button>
                  <button
                    onClick={() => { setScale(1); setPosition({ x: 0, y: 0 }); }}
                    className="p-2 rounded-lg bg-ancient-dark/20 hover:bg-ancient-dark/30 transition-colors"
                  >
                    <Maximize2 className="w-4 h-4 text-ancient-gray" />
                  </button>
                </div>
              </div>
              
              <div 
                className="relative bg-ancient-dark/10 rounded-lg overflow-hidden border border-ancient-brown/30"
                style={{ height: '500px' }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <svg
                  ref={svgRef}
                  width="100%"
                  height="100%"
                  viewBox={`0 0 ${width} ${height}`}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transformOrigin: 'center center',
                    cursor: isDragging ? 'grabbing' : 'grab'
                  }}
                >
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <linearGradient id="linkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#b8860b" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#8b0000" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  {knowledgeGraphLinks.map((link, index) => {
                    const sourceNode = knowledgeGraphNodes.find(n => n.id === link.source);
                    const targetNode = knowledgeGraphNodes.find(n => n.id === link.target);
                    if (!sourceNode || !targetNode) return null;
                    
                    return (
                      <g key={index}>
                        <line
                          x1={sourceNode.x}
                          y1={sourceNode.y}
                          x2={targetNode.x}
                          y2={targetNode.y}
                          stroke="url(#linkGradient)"
                          strokeWidth="1.5"
                          strokeDasharray="5,3"
                          opacity="0.5"
                        />
                        <motion.text
                          x={(sourceNode.x + targetNode.x) / 2}
                          y={(sourceNode.y + targetNode.y) / 2 - 5}
                          textAnchor="middle"
                          fill="#5d4037"
                          fontSize="10"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="pointer-events-none"
                        >
                          {link.relation}
                        </motion.text>
                      </g>
                    );
                  })}

                  {knowledgeGraphNodes.map((node) => (
                    <motion.g
                      key={node.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: Math.random() * 0.3 }}
                      onClick={() => handleNodeClick(node)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      style={{ cursor: 'pointer' }}
                    >
                      {getNodeShape(node.type) === 'rect' ? (
                        <rect
                          x={node.x! - 35}
                          y={node.y! - 18}
                          width="70"
                          height="36"
                          rx="6"
                          fill={getNodeColor(node.type)}
                          fillOpacity={hoveredNode === node.id ? 0.9 : 0.7}
                          stroke={getNodeColor(node.type)}
                          strokeWidth="2"
                          filter="url(#glow)"
                          className="transition-all"
                        />
                      ) : getNodeShape(node.type) === 'circle' ? (
                        <circle
                          cx={node.x!}
                          cy={node.y!}
                          r={hoveredNode === node.id ? 28 : 24}
                          fill={getNodeColor(node.type)}
                          fillOpacity={hoveredNode === node.id ? 0.9 : 0.7}
                          stroke={getNodeColor(node.type)}
                          strokeWidth="2"
                          filter="url(#glow)"
                          className="transition-all"
                        />
                      ) : getNodeShape(node.type) === 'polygon' ? (
                        <polygon
                          points={`${node.x!},${node.y! - 25} ${node.x! + 25},${node.y! + 12} ${node.x! - 25},${node.y! + 12}`}
                          fill={getNodeColor(node.type)}
                          fillOpacity={hoveredNode === node.id ? 0.9 : 0.7}
                          stroke={getNodeColor(node.type)}
                          strokeWidth="2"
                          filter="url(#glow)"
                          className="transition-all"
                        />
                      ) : (
                        <ellipse
                          cx={node.x!}
                          cy={node.y!}
                          rx={hoveredNode === node.id ? 28 : 24}
                          ry={hoveredNode === node.id ? 20 : 16}
                          fill={getNodeColor(node.type)}
                          fillOpacity={hoveredNode === node.id ? 0.9 : 0.7}
                          stroke={getNodeColor(node.type)}
                          strokeWidth="2"
                          filter="url(#glow)"
                          className="transition-all"
                        />
                      )}
                      <text
                        x={node.x!}
                        y={node.y! + 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {node.label}
                      </text>
                      {hoveredNode === node.id && (
                        <motion.text
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          x={node.x!}
                          y={node.y! + 35}
                          textAnchor="middle"
                          fill="#5d4037"
                          fontSize="10"
                          className="pointer-events-none"
                        >
                          {node.category}
                        </motion.text>
                      )}
                    </motion.g>
                  ))}
                </svg>

                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                  {[
                    { type: 'book', label: '经典', color: '#b8860b' },
                    { type: 'concept', label: '概念', color: '#8b0000' },
                    { type: 'method', label: '方法', color: '#cd853f' },
                  ].map(item => (
                    <div key={item.type} className="flex items-center gap-2 text-xs text-ancient-gray">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="ancient-card p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ancient-gray" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索知识..."
                  className="ancient-input w-full pl-10"
                />
              </div>
            </div>

            <div className="ancient-card p-4">
              <h3 className="text-sm font-bold text-ancient-gray mb-3">分类筛选</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      activeCategory === cat
                        ? 'bg-ancient-gold/20 text-ancient-gold border border-ancient-gold/30'
                        : 'bg-ancient-dark/20 text-ancient-gray hover:bg-ancient-dark/30'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="ancient-card p-4 max-h-[500px] overflow-y-auto">
              <h3 className="text-lg font-bold text-ancient-gold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                知识条目
              </h3>
              <div className="space-y-3">
                <AnimatePresence>
                  {(searchResults.length > 0 ? searchResults : filteredKnowledge).slice(0, 20).map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleKnowledgeClick(item)}
                      className="p-3 rounded-lg bg-ancient-dark/10 hover:bg-ancient-dark/20 cursor-pointer transition-colors border border-transparent hover:border-ancient-brown/30"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-ancient-dark">{item.title}</h4>
                        <ChevronRight className="w-4 h-4 text-ancient-gray" />
                      </div>
                      <div className="text-xs text-ancient-gray mt-1">{item.category}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showModal && selectedKnowledge && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-ancient-paper rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-ancient-paper border-b border-ancient-brown/30 p-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-ancient-dark brush-text">{selectedKnowledge.title}</h2>
                    <span className="text-sm text-ancient-gray">{selectedKnowledge.category}</span>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-lg hover:bg-ancient-dark/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-ancient-gray" />
                  </button>
                </div>
                
                <div className="p-6">
                  <p className="text-ancient-dark leading-relaxed mb-6">
                    {selectedKnowledge.content}
                  </p>
                  
                  {selectedKnowledge.keywords && selectedKnowledge.keywords.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-ancient-gray mb-2">关键词</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedKnowledge.keywords.map((kw, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 rounded-full bg-ancient-gold/10 text-ancient-gold text-sm"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedKnowledge.sources && selectedKnowledge.sources.length > 0 && (
                    <div>
                      <h4 className="text-sm font-bold text-ancient-gray mb-2">参考来源</h4>
                      <div className="space-y-1">
                        {selectedKnowledge.sources.map((source, index) => (
                          <div key={index} className="text-sm text-ancient-gray flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {source}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}