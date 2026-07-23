export interface KnowledgeItem {
  id: string;
  title: string;
  category: string;
  content: string;
  keywords: string[];
  sources?: string[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  category: string;
  type: 'book' | 'concept' | 'method' | 'person';
  x?: number;
  y?: number;
}

export interface KnowledgeGraphLink {
  source: string;
  target: string;
  relation: string;
}

export const knowledgeGraphNodes: KnowledgeGraphNode[] = [
  { id: 'zhouyi', label: '周易', category: '经典', type: 'book' },
  { id: 'yuanhai', label: '渊海子平', category: '经典', type: 'book' },
  { id: 'ditiansui', label: '滴天髓', category: '经典', type: 'book' },
  { id: 'sanming', label: '三命通会', category: '经典', type: 'book' },
  { id: 'ziping', label: '子平真诠', category: '经典', type: 'book' },
  { id: 'qiongtong', label: '穷通宝鉴', category: '经典', type: 'book' },
  { id: 'buzheng', label: '卜筮正宗', category: '经典', type: 'book' },
  { id: 'maiyi', label: '麻衣神相', category: '经典', type: 'book' },
  { id: 'ziwei', label: '紫微斗数', category: '经典', type: 'book' },
  { id: 'wuxing', label: '五行', category: '基础', type: 'concept' },
  { id: 'tiangan', label: '天干', category: '基础', type: 'concept' },
  { id: 'dizhi', label: '地支', category: '基础', type: 'concept' },
  { id: 'bazi', label: '八字', category: '方法', type: 'method' },
  { id: 'liuyao', label: '六爻', category: '方法', type: 'method' },
  { id: 'qimen', label: '奇门遁甲', category: '方法', type: 'method' },
  { id: 'meihua', label: '梅花易数', category: '方法', type: 'method' },
  { id: 'ziweiMethod', label: '紫微斗数', category: '方法', type: 'method' },
  { id: 'mianxiang', label: '面相学', category: '方法', type: 'method' },
  { id: 'shouxiang', label: '手相学', category: '方法', type: 'method' },
  { id: 'xingming', label: '姓名学', category: '方法', type: 'method' },
  { id: 'shishen', label: '十神', category: '概念', type: 'concept' },
  { id: 'geju', label: '格局', category: '概念', type: 'concept' },
  { id: 'dayun', label: '大运流年', category: '概念', type: 'concept' },
  { id: 'shiergong', label: '十二宫', category: '概念', type: 'concept' },
  { id: 'sizhu', label: '四化', category: '概念', type: 'concept' },
];

export const knowledgeGraphLinks: KnowledgeGraphLink[] = [
  { source: 'zhouyi', target: 'wuxing', relation: '包含' },
  { source: 'zhouyi', target: 'tiangan', relation: '包含' },
  { source: 'zhouyi', target: 'dizhi', relation: '包含' },
  { source: 'yuanhai', target: 'bazi', relation: '创立' },
  { source: 'yuanhai', target: 'shishen', relation: '阐述' },
  { source: 'ditiansui', target: 'geju', relation: '精解' },
  { source: 'ditiansui', target: 'wuxing', relation: '深化' },
  { source: 'sanming', target: 'bazi', relation: '集大成' },
  { source: 'sanming', target: 'shishen', relation: '详解' },
  { source: 'ziping', target: 'geju', relation: '专论' },
  { source: 'qiongtong', target: 'tiangan', relation: '详论' },
  { source: 'buzheng', target: 'liuyao', relation: '规范' },
  { source: 'maiyi', target: 'mianxiang', relation: '创立' },
  { source: 'ziwei', target: 'ziweiMethod', relation: '经典' },
  { source: 'bazi', target: 'shishen', relation: '核心' },
  { source: 'bazi', target: 'geju', relation: '核心' },
  { source: 'bazi', target: 'dayun', relation: '应用' },
  { source: 'liuyao', target: 'zhouyi', relation: '源于' },
  { source: 'qimen', target: 'wuxing', relation: '运用' },
  { source: 'qimen', target: 'tiangan', relation: '运用' },
  { source: 'meihua', target: 'zhouyi', relation: '源于' },
  { source: 'ziweiMethod', target: 'shiergong', relation: '核心' },
  { source: 'ziweiMethod', target: 'sizhu', relation: '核心' },
  { source: 'mianxiang', target: 'wuxing', relation: '运用' },
  { source: 'shouxiang', target: 'wuxing', relation: '运用' },
  { source: 'xingming', target: 'wuxing', relation: '运用' },
  { source: 'xingming', target: 'tiangan', relation: '运用' },
];

export const knowledgeBase: KnowledgeItem[] = [
  {
    id: '1',
    title: '周易简介',
    category: '周易',
    content: '《周易》又称《易经》，是中国古代的一部经典哲学著作，被誉为"群经之首"。它包含六十四卦，每卦由六爻组成，通过卦象变化来揭示宇宙万物的规律。周易不仅是占卜之书，更是一部探讨宇宙人生哲理的智慧宝典。',
    keywords: ['周易', '易经', '六十四卦', '卦象', '爻'],
    sources: ['周易·系辞传']
  },
  {
    id: '2',
    title: '八卦的含义',
    category: '周易',
    content: '八卦是周易的基本符号，分别是乾、坤、震、巽、坎、离、艮、兑。乾代表天，坤代表地，震代表雷，巽代表风，坎代表水，离代表火，艮代表山，兑代表泽。八卦相互组合形成六十四卦，揭示了万物变化的规律。',
    keywords: ['八卦', '乾', '坤', '震', '巽', '坎', '离', '艮', '兑'],
    sources: ['周易·说卦传']
  },
  {
    id: '3',
    title: '五行相生相克',
    category: '基础理论',
    content: '五行学说是中国古代哲学的重要组成部分，包括木、火、土、金、水五种基本元素。相生关系：木生火、火生土、土生金、金生水、水生木。相克关系：木克土、土克水、水克火、火克金、金克木。五行理论广泛应用于中医、命理、占卜等领域。',
    keywords: ['五行', '相生', '相克', '木', '火', '土', '金', '水'],
    sources: ['尚书·洪范']
  },
  {
    id: '4',
    title: '天干地支',
    category: '基础理论',
    content: '天干地支是中国古代的纪年、纪时系统。天干有十个：甲、乙、丙、丁、戊、己、庚、辛、壬、癸。地支有十二个：子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。天干地支组合用于纪年、纪月、纪日、纪时，是八字命理的基础。',
    keywords: ['天干', '地支', '甲', '乙', '丙', '丁', '子', '丑', '寅'],
    sources: ['史记·律书']
  },
  {
    id: '5',
    title: '八字命理入门',
    category: '四柱八字',
    content: '四柱八字，简称八字，是根据出生年月日时推算的命理学术。每柱由天干和地支组成，共四柱八个字。日柱天干代表命主本身，称为日主。通过分析八字中五行的强弱、十神的配置，可以推断人的性格、命运、吉凶祸福。',
    keywords: ['八字', '四柱', '日主', '十神', '命理'],
    sources: ['渊海子平']
  },
  {
    id: '6',
    title: '十神详解',
    category: '四柱八字',
    content: '十神是八字命理中的重要概念，包括正官、七杀、正财、偏财、正印、偏印、食神、伤官、比肩、劫财。它们代表了日主与其他天干之间的关系，反映了一个人的性格、事业、财运、感情等方面的信息。',
    keywords: ['十神', '正官', '七杀', '正财', '偏财', '正印', '偏印'],
    sources: ['三命通会']
  },
  {
    id: '7',
    title: '奇门遁甲基础',
    category: '奇门遁甲',
    content: '奇门遁甲是中国古代的高层次预测学，被誉为"帝王之学"。它以时间和空间为坐标，通过排盘来预测事物的发展趋势。奇门遁甲盘包含天盘、地盘、人盘、神盘四个层面，涉及九星、八门、八神等元素。',
    keywords: ['奇门遁甲', '排盘', '九星', '八门', '八神'],
    sources: ['奇门遁甲大全']
  },
  {
    id: '8',
    title: '奇门九星',
    category: '奇门遁甲',
    content: '奇门遁甲中的九星分别是天蓬星、天任星、天冲星、天辅星、天英星、天芮星、天柱星、天心星、天禽星。每颗星代表不同的能量和含义，在预测中用于判断事物的性质和发展趋势。',
    keywords: ['九星', '天蓬', '天任', '天冲', '天辅', '天英'],
    sources: ['奇门遁甲秘笈大全']
  },
  {
    id: '9',
    title: '奇门八门',
    category: '奇门遁甲',
    content: '八门是奇门遁甲中的重要元素，分别是休门、生门、伤门、杜门、景门、死门、惊门、开门。八门代表不同的方位和吉凶，用于判断事物的可行性和吉凶祸福。',
    keywords: ['八门', '休门', '生门', '伤门', '杜门', '景门'],
    sources: ['奇门遁甲详解']
  },
  {
    id: '10',
    title: '六爻预测方法',
    category: '六爻',
    content: '六爻预测是传统占卜方法之一，通过投掷三枚铜钱六次得到六个爻，组成一个卦象。根据卦象的变化和爻辞的含义，可以预测事物的吉凶祸福。六爻预测注重变爻的分析，变爻越多，事情变化越大。',
    keywords: ['六爻', '铜钱', '爻辞', '变爻', '卦象'],
    sources: ['卜筮正宗']
  },
  {
    id: '11',
    title: '纳甲法',
    category: '六爻',
    content: '纳甲法是六爻预测中的重要方法，将天干地支纳入卦中，用于分析卦象的五行生克关系。纳甲法包括纳天干、纳地支、配六亲等步骤，是六爻断卦的基础。',
    keywords: ['纳甲', '天干', '地支', '六亲', '五行'],
    sources: ['增删卜易']
  },
  {
    id: '12',
    title: '梅花易数起卦方法',
    category: '梅花易数',
    content: '梅花易数是一种灵活的起卦方法，可以通过时间、数字、文字等多种方式起卦。其特点是起卦迅速，判断准确。梅花易数注重体用关系的分析，通过体卦和用卦的五行生克来判断吉凶。',
    keywords: ['梅花易数', '起卦', '体用', '时间起卦', '数字起卦'],
    sources: ['梅花易数']
  },
  {
    id: '13',
    title: '体用生克',
    category: '梅花易数',
    content: '在梅花易数中，体卦代表问卦者本身，用卦代表所问之事。体用之间的关系通过五行生克来判断：用生体为吉，体生用为不吉，体克用为吉，用克体为凶，体用比和为吉。',
    keywords: ['体用', '生克', '体卦', '用卦', '五行'],
    sources: ['梅花易数·卷一']
  },
  {
    id: '14',
    title: '神煞的作用',
    category: '基础理论',
    content: '神煞是命理和占卜中的重要概念，包括吉神和凶煞。吉神如天乙贵人、文昌、将星等，代表吉祥、帮助和机遇；凶煞如劫煞、灾煞、羊刃等，代表不利、阻碍和危险。神煞的分析可以辅助判断吉凶。',
    keywords: ['神煞', '天乙贵人', '文昌', '将星', '劫煞'],
    sources: ['协纪辨方书']
  },
  {
    id: '15',
    title: '流年大运',
    category: '四柱八字',
    content: '流年和大运是八字命理中用于预测人生阶段运势的概念。大运每十年一步，流年指每年的运势。通过分析大运和流年与八字命局的关系，可以预测某一时期的吉凶祸福和主要事件。',
    keywords: ['流年', '大运', '运势', '命局'],
    sources: ['滴天髓']
  },
  {
    id: '16',
    title: '择吉择日',
    category: '择吉',
    content: '择吉是选择吉祥日子进行重要活动的传统方法。根据天干地支的组合、神煞的分布、五行的相生相克来选择吉日。择吉广泛应用于婚嫁、开业、出行、动土等重要事项。',
    keywords: ['择吉', '吉日', '黄道吉日', '动土', '婚嫁'],
    sources: ['通书']
  },
  {
    id: '17',
    title: '卦变的意义',
    category: '周易',
    content: '卦变指卦象中某些爻发生变化，形成新的卦象。变爻代表事物的变化和发展趋势。变爻越多，说明事情的变化越大。分析卦变可以预测事情的发展方向和最终结果。',
    keywords: ['卦变', '变爻', '卦象', '发展趋势'],
    sources: ['周易·系辞传']
  },
  {
    id: '18',
    title: '天干五合',
    category: '基础理论',
    content: '天干五合是指甲己合化土、乙庚合化金、丙辛合化水、丁壬合化木、戊癸合化火。天干相合代表着事物的结合、和谐与转化，在命理分析中用于判断人际关系、合作机会等。',
    keywords: ['天干五合', '甲己合', '乙庚合', '丙辛合', '丁壬合'],
    sources: ['三命通会']
  },
  {
    id: '19',
    title: '地支六冲',
    category: '基础理论',
    content: '地支六冲是指子冲午、丑冲未、寅冲申、卯冲酉、辰冲戌、巳冲亥。地支相冲代表对立、冲突和变动，在命理分析中用于判断人际关系的矛盾、工作变动、出行等事项。',
    keywords: ['地支六冲', '子午冲', '丑未冲', '寅申冲', '卯酉冲'],
    sources: ['渊海子平']
  },
  {
    id: '20',
    title: '地支三合',
    category: '基础理论',
    content: '地支三合是指申子辰合水、亥卯未合木、寅午戌合火、巳酉丑合金。地支三合代表着力量的聚集和合作，在命理分析中用于判断人际关系的和谐、团队合作、贵人相助等。',
    keywords: ['地支三合', '申子辰', '亥卯未', '寅午戌', '巳酉丑'],
    sources: ['三命通会']
  },
  {
    id: '21',
    title: '易经的智慧',
    category: '周易',
    content: '《易经》不仅是一部占卜之书，更是一部蕴含深刻哲理的智慧宝典。它教导人们如何顺应自然、把握时机、趋吉避凶。"天行健，君子以自强不息；地势坤，君子以厚德载物"是其中最著名的格言。',
    keywords: ['易经', '智慧', '自强不息', '厚德载物', '哲理'],
    sources: ['周易·乾卦', '周易·坤卦']
  },
  {
    id: '22',
    title: '占卜的意义',
    category: '基础理论',
    content: '占卜并非迷信，而是一种探索未知、辅助决策的工具。通过占卜，可以帮助人们更清晰地认识自己、理解事物的发展规律，从而做出更明智的选择。真正的智慧在于"善易者不卜"，即通过修养达到无需占卜也能洞察事物的境界。',
    keywords: ['占卜', '决策', '智慧', '善易者不卜'],
    sources: ['周易·系辞传']
  },
  {
    id: '23',
    title: '十神与性格',
    category: '四柱八字',
    content: '十神不仅代表吉凶，也反映人的性格特征。例如，正官旺的人正直稳重，食神旺的人聪明多才，偏财旺的人善于理财，劫财旺的人竞争心强。通过分析十神的配置，可以了解一个人的性格特点和行为方式。',
    keywords: ['十神', '性格', '正官', '食神', '偏财'],
    sources: ['渊海子平']
  },
  {
    id: '24',
    title: '风水与命理',
    category: '风水',
    content: '风水是研究环境与人关系的学问，认为环境的布局会影响人的运势。风水注重气场的流通、山水的格局、方位的选择等。好的风水可以为居住者带来健康、财富和好运。',
    keywords: ['风水', '气场', '环境', '方位', '运势'],
    sources: ['葬书']
  },
  {
    id: '25',
    title: '渊海子平简介',
    category: '经典著作',
    content: '《渊海子平》是八字命理学的奠基之作，由宋代徐子升编纂。该书系统整理了以日干为中心的论命体系，确立了十神、格局、神煞等核心概念，是学习八字命理的必读经典。书中收录了大量歌诀和命例，为后世命理研究奠定了基础。',
    keywords: ['渊海子平', '徐子升', '八字', '十神', '格局'],
    sources: ['渊海子平']
  },
  {
    id: '26',
    title: '滴天髓精要',
    category: '经典著作',
    content: '《滴天髓》被誉为八字命理的"圣经"，相传为宋代京图所著，清代任铁樵作注。该书以阴阳五行为核心，强调"清气"、"浊气"、"通关"等概念，注重格局高低的判断和五行生克制化的根本原理，是提升命理思维深度的关键读物。',
    keywords: ['滴天髓', '任铁樵', '阴阳五行', '格局', '通关'],
    sources: ['滴天髓阐微']
  },
  {
    id: '27',
    title: '三命通会详解',
    category: '经典著作',
    content: '《三命通会》是明代万民英所著的命理学集大成之作，百科全书式的巨著。内容涵盖干支、五行、纳音、神煞、格局、六亲、大运流年等，几乎囊括了明代以前所有重要的命理理论和技法，具有极高的参考价值。',
    keywords: ['三命通会', '万民英', '纳音', '神煞', '六亲'],
    sources: ['三命通会']
  },
  {
    id: '28',
    title: '子平真诠格局论',
    category: '经典著作',
    content: '《子平真诠》是清代沈孝瞻所著，专注于八字格局论的经典。该书条理清晰，逻辑严密，系统阐述了正格(八格)、变格(外格)的取用方法和成败救应，是格局法的权威教材，对后世命理研究影响深远。',
    keywords: ['子平真诠', '沈孝瞻', '格局', '正格', '变格'],
    sources: ['子平真诠']
  },
  {
    id: '29',
    title: '穷通宝鉴调候论',
    category: '经典著作',
    content: '《穷通宝鉴》又名《造化元钥》，以十天干在不同季节的喜忌为核心。该书提出了著名的"调候"理论，强调寒暖燥湿的平衡，是论命的重要视角。其论命思路直观有效，常与格局法、用神法并用。',
    keywords: ['穷通宝鉴', '调候', '十天干', '寒暖燥湿', '用神'],
    sources: ['穷通宝鉴']
  },
  {
    id: '30',
    title: '卜筮正宗纳甲法',
    category: '经典著作',
    content: '《卜筮正宗》是清代王洪绪所辑，六爻预测法的经典教科书。该书系统整理了六爻(纳甲筮法)的起卦、装卦、断卦规则，包含十八问答和大量分类占断实例，是学习六爻预测最权威的读物之一。',
    keywords: ['卜筮正宗', '王洪绪', '六爻', '纳甲', '断卦'],
    sources: ['卜筮正宗']
  },
  {
    id: '31',
    title: '增删卜易详解',
    category: '经典著作',
    content: '《增删卜易》是清代野鹤老人所著，六爻预测的重要典籍。该书以大量实际案例为基础，详细讲解了六爻断卦的方法和技巧，强调"实用"和"应验"，对后世六爻预测影响深远。',
    keywords: ['增删卜易', '野鹤老人', '六爻', '断卦', '案例'],
    sources: ['增删卜易']
  },
  {
    id: '32',
    title: '梅花易数精义',
    category: '经典著作',
    content: '《梅花易数》相传为宋代邵雍所著，是一种灵活的起卦方法。该书讲述了通过时间、数字、文字等多种方式起卦的方法，注重体用关系的分析，具有起卦迅速、判断准确的特点。',
    keywords: ['梅花易数', '邵雍', '起卦', '体用', '时间起卦'],
    sources: ['梅花易数']
  },
  {
    id: '33',
    title: '天干阴阳生死',
    category: '基础理论',
    content: '天干阴阳生死是指十天干在十二个月份中的旺相休囚状态。甲木死于午、乙木死于亥、丙火死于酉、丁火死于寅、戊土死于酉、己土死于寅、庚金死于子、辛金死于巳、壬水死于卯、癸水死于申。掌握天干生死对判断五行强弱至关重要。',
    keywords: ['天干', '阴阳', '生死', '旺相休囚', '五行'],
    sources: ['三命通会']
  },
  {
    id: '34',
    title: '地支相刑',
    category: '基础理论',
    content: '地支相刑包括寅巳申三刑、丑未戌三刑、子卯相刑、辰午酉亥自刑。相刑代表刑罚、伤害、疾病等不吉之事。三刑主刑伤、牢狱、疾病；子卯相刑主门户无礼；自刑主内心矛盾、自我伤害。',
    keywords: ['地支相刑', '三刑', '子卯相刑', '自刑', '刑罚'],
    sources: ['渊海子平']
  },
  {
    id: '35',
    title: '纳音五行',
    category: '基础理论',
    content: '纳音五行是将六十甲子与五音十二律相配的学说。每对干支组合对应一种纳音五行，如甲子乙丑海中金、丙寅丁卯炉中火等。纳音五行用于判断年命、性格、职业等，在命理分析中具有辅助作用。',
    keywords: ['纳音', '六十甲子', '海中金', '炉中火', '年命'],
    sources: ['三命通会']
  },
  {
    id: '36',
    title: '用神与忌神',
    category: '四柱八字',
    content: '用神是命局中最需要的五行，用于平衡命局、弥补不足；忌神则是对命局不利的五行。取用神需综合考虑日主强弱、格局高低、调候需求等因素。用神得地则吉，忌神得势则凶。',
    keywords: ['用神', '忌神', '日主', '格局', '调候'],
    sources: ['滴天髓']
  },
  {
    id: '37',
    title: '格局成败',
    category: '四柱八字',
    content: '格局成败是判断命局层次的关键。成格需满足用神得地、有情、有力；败格则因用神被克、被合、被冲或无力。格局高低直接影响人生成就的大小。',
    keywords: ['格局', '成败', '用神', '命局', '层次'],
    sources: ['子平真诠']
  },
  {
    id: '38',
    title: '天乙贵人',
    category: '神煞',
    content: '天乙贵人是最尊贵的吉神，象征贵人相助、逢凶化吉。天乙贵人查法：甲戊庚牛羊，乙己鼠猴乡，丙丁猪鸡位，壬癸兔蛇藏，六辛逢马虎，此是贵人方。命中有天乙贵人者，一生多得贵人提携。',
    keywords: ['天乙贵人', '吉神', '贵人', '逢凶化吉'],
    sources: ['三命通会']
  },
  {
    id: '39',
    title: '文昌星',
    category: '神煞',
    content: '文昌星主聪明智慧、学业功名。文昌星查法：甲乙巳午报君知，丙戊申宫丁己鸡，庚猪辛鼠壬逢虎，癸人见兔入云梯。命中有文昌星者，头脑聪慧，学习能力强，利于考试升学。',
    keywords: ['文昌星', '智慧', '学业', '功名', '考试'],
    sources: ['协纪辨方书']
  },
  {
    id: '40',
    title: '羊刃',
    category: '神煞',
    content: '羊刃是一把双刃剑，既主勇猛果断，也主血光之灾。羊刃查法：甲羊刃在卯、乙羊刃在寅、丙戊羊刃在午、丁己羊刃在巳、庚羊刃在酉、辛羊刃在申、壬羊刃在子、癸羊刃在亥。羊刃需得制化方吉。',
    keywords: ['羊刃', '勇猛', '血光', '制化'],
    sources: ['渊海子平']
  },
  {
    id: '41',
    title: '驿马',
    category: '神煞',
    content: '驿马主奔波、走动、旅行、迁移。驿马查法：申子辰马在寅，亥卯未马在巳，寅午戌马在申，巳酉丑马在亥。命中驿马旺相者，一生多动，适合外出发展或从事流动性工作。',
    keywords: ['驿马', '奔波', '走动', '迁移', '旅行'],
    sources: ['三命通会']
  },
  {
    id: '42',
    title: '十神生克',
    category: '四柱八字',
    content: '十神之间存在生克关系：正印生比肩劫财，比肩劫财生食神伤官，食神伤官生正财偏财，正财偏财生正官七杀，正官七杀生正印偏印；正印克食神伤官，比肩劫财克正财偏财，食神伤官克正官七杀，正财偏财克正印偏印，正官七杀克比肩劫财。',
    keywords: ['十神', '生克', '正印', '比肩', '食神'],
    sources: ['渊海子平']
  },
  {
    id: '43',
    title: '八字取象',
    category: '四柱八字',
    content: '八字取象是通过天干地支的组合来推断人生诸事。包括职业取象、性格取象、婚姻取象、财运取象等。取象需结合五行特性、十神含义、地支藏干等综合判断。',
    keywords: ['取象', '职业', '性格', '婚姻', '财运'],
    sources: ['滴天髓']
  },
  {
    id: '44',
    title: '岁运并临',
    category: '四柱八字',
    content: '岁运并临指大运与流年相同，或岁运与命局中某柱相同。岁运并临主重大变化，吉则大吉，凶则大凶。需结合具体命局判断是吉是凶。',
    keywords: ['岁运并临', '大运', '流年', '变化'],
    sources: ['三命通会']
  },
  {
    id: '45',
    title: '从格判断',
    category: '四柱八字',
    content: '从格是特殊格局，当日主极弱且无生扶时，顺从强势五行。从格包括从财、从官杀、从儿、从势等。从格成立需满足一定条件，从得真者格局高。',
    keywords: ['从格', '从财', '从官杀', '从儿', '特殊格局'],
    sources: ['子平真诠']
  },
  {
    id: '46',
    title: '紫微斗数简介',
    category: '紫微斗数',
    content: '紫微斗数是中国传统命理学术，相传始于五代陈抟老祖。它以星曜入宫、宫宫相照为核心，将人生分为十二宫位：命宫、财帛、官禄、夫妻、子女、田宅、迁移、疾厄、奴仆、父母、福德、兄弟。通过分析十四主星、辅星及四化（化禄、化权、化科、化忌）的组合，推断人的性格、命运和吉凶祸福。',
    keywords: ['紫微斗数', '陈抟', '十二宫', '十四主星', '四化'],
    sources: ['紫微斗数全书']
  },
  {
    id: '47',
    title: '紫微斗数十四主星',
    category: '紫微斗数',
    content: '紫微斗数的十四主星分为紫微星系和天府星系。紫微星系包括紫微、天机、太阳、武曲、天同、廉贞；天府星系包括天府、太阴、贪狼、巨门、天相、天梁、七杀、破军。每颗主星代表不同的性格特质和命运倾向，如紫微星主尊贵、武曲星主财星、贪狼星主欲望与桃花。',
    keywords: ['紫微', '天机', '武曲', '贪狼', '七杀', '破军'],
    sources: ['紫微斗数全书']
  },
  {
    id: '48',
    title: '紫微斗数十二宫',
    category: '紫微斗数',
    content: '紫微斗数十二宫各有其职能：命宫看性格与格局，财帛宫看财富运势，官禄宫看事业发展，夫妻宫看婚姻感情，子女宫看子女缘分，田宅宫看不动产，迁移宫看外出与人际关系，疾厄宫看健康，奴仆宫看下属与朋友，父母宫看长辈缘分，福德宫看精神修养，兄弟宫看手足关系。',
    keywords: ['命宫', '财帛宫', '官禄宫', '夫妻宫', '迁移宫'],
    sources: ['紫微斗数全书']
  },
  {
    id: '49',
    title: '紫微斗数四化',
    category: '紫微斗数',
    content: '四化是紫微斗数的核心概念，指化禄、化权、化科、化忌四种变化。化禄主财富与享受，化权主权力与掌控，化科主名誉与学问，化忌主阻碍与困扰。四化飞星是推断流年运势和事件应期的重要方法。',
    keywords: ['化禄', '化权', '化科', '化忌', '飞星'],
    sources: ['紫微斗数全书']
  },
  {
    id: '50',
    title: '麻衣神相简介',
    category: '面相学',
    content: '《麻衣神相》是北宋麻衣道者所著的相术经典，被誉为"相学圣经"。该书系统总结了面部十二宫、三百六十五骨相，强调"相不独论"，需结合气色、纹理综合判断。核心思想是"相由心生"，认为相貌反映人的内在品德和命运。',
    keywords: ['麻衣神相', '面相', '十二宫', '骨相', '相由心生'],
    sources: ['麻衣神相']
  },
  {
    id: '51',
    title: '面相十二宫',
    category: '面相学',
    content: '面相十二宫包括命宫（印堂）、财帛宫（鼻子）、兄弟宫（眉毛）、田宅宫（上眼睑）、男女宫（眼下）、奴仆宫（下唇）、妻妾宫（鱼尾）、疾厄宫（山根）、迁移宫（眉角）、官禄宫（天庭）、福德宫（天仓）、父母宫（日月角）。每宫主管不同的人生领域。',
    keywords: ['命宫', '财帛宫', '官禄宫', '夫妻宫', '迁移宫'],
    sources: ['麻衣神相']
  },
  {
    id: '52',
    title: '面相五官',
    category: '面相学',
    content: '五官指耳、眉、眼、鼻、口，分别称为采听官、保寿官、监察官、审辨官、出纳官。耳朵主智慧与财运，眉毛主健康与兄弟，眼睛主心灵与感情，鼻子主财富与地位，嘴巴主食禄与口才。五官端正清秀为吉相。',
    keywords: ['五官', '耳朵', '眉毛', '眼睛', '鼻子', '嘴巴'],
    sources: ['麻衣神相']
  },
  {
    id: '53',
    title: '手相三大主线',
    category: '手相学',
    content: '手相三大主线为生命线、智慧线、感情线。生命线起自虎口，环绕拇指根部，主健康与生命力；智慧线横贯掌心，主思维与智慧；感情线起自小指根部，伸向食指或中指，主情感与人际关系。三线的长短、深浅、形态反映人生运势。',
    keywords: ['生命线', '智慧线', '感情线', '手相', '掌纹'],
    sources: ['玉掌纹鉴']
  },
  {
    id: '54',
    title: '手相辅助线',
    category: '手相学',
    content: '手相辅助线包括事业线、财运线、婚姻线、健康线等。事业线起自手腕，向上延伸，主事业发展；财运线位于小指根部，主财富积累；婚姻线位于小指根部侧面，主婚姻状况；健康线起自生命线，向小指延伸，主健康状况。',
    keywords: ['事业线', '财运线', '婚姻线', '健康线'],
    sources: ['手相铁关刀']
  },
  {
    id: '55',
    title: '姓名学五格剖象',
    category: '姓名学',
    content: '五格剖象法是姓名学的核心方法，将姓名分为天格、人格、地格、外格、总格。天格由姓氏笔画决定，主父母与祖上；人格为姓名中心，主一生命运；地格由名字笔画决定，主前运；外格主社交与外部环境；总格主后运。通过八十一数理判断吉凶。',
    keywords: ['五格', '天格', '人格', '地格', '八十一数理'],
    sources: ['姓名学']
  },
  {
    id: '56',
    title: '姓名学五行',
    category: '姓名学',
    content: '姓名学中，汉字的笔画数对应五行：1、2为木，3、4为火，5、6为土，7、8为金，9、10为水。取名时需根据八字喜用神选择相应五行的字，以平衡命理。笔画计算以繁体字为准，特殊部首需按原字计算。',
    keywords: ['五行', '笔画', '八字', '喜用神', '繁体字'],
    sources: ['姓名学']
  },
  {
    id: '57',
    title: '姓名与命运',
    category: '姓名学',
    content: '姓名不仅是人的标识，更是一种能量符号。好的名字能助运，差的名字可能带来阻碍。姓名的音、形、义都会影响人的运势，需综合考虑音律优美、字形美观、寓意吉祥，同时结合命理五行进行取名或改名。',
    keywords: ['姓名', '命运', '能量', '助运', '改名'],
    sources: ['姓名学']
  },
  {
    id: '58',
    title: '相由心生',
    category: '面相学',
    content: '"相由心生"是相术的核心思想，认为人的相貌由内心决定。心地善良者相貌慈祥，心怀恶意者相貌凶恶。通过修心养性可以改变相貌，积德行善能使面相变得更加和善吉祥。',
    keywords: ['相由心生', '修心', '德行', '相貌'],
    sources: ['麻衣神相']
  },
  {
    id: '59',
    title: '气色判断',
    category: '面相学',
    content: '气色是面相判断的重要组成部分，不同部位的气色反映不同的运势。印堂红润主近期顺利，山根发青主健康问题，颧骨发红主财运将至，眼下发黑主劳累或情感问题。气色需结合五行和季节综合判断。',
    keywords: ['气色', '印堂', '山根', '运势', '五行'],
    sources: ['麻衣神相']
  },
  {
    id: '60',
    title: '紫微斗数格局',
    category: '紫微斗数',
    content: '紫微斗数中有许多经典格局，如紫府朝垣格、七杀朝斗格、机月同梁格、杀破狼格等。格局的高低决定了命局的层次，好的格局如紫府朝垣主大富大贵，杀破狼格主开创变动，机月同梁格主机谋善变。',
    keywords: ['格局', '紫府朝垣', '杀破狼', '机月同梁'],
    sources: ['紫微斗数全书']
  }
];

export function searchKnowledge(query: string): KnowledgeItem[] {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 0);
  
  return knowledgeBase
    .map(item => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery) ? 3 : 0;
      const contentMatch = item.content.toLowerCase().includes(lowerQuery) ? 2 : 0;
      const keywordMatch = item.keywords.some(k => 
        k.toLowerCase().includes(lowerQuery) || lowerQuery.includes(k.toLowerCase())
      ) ? 1 : 0;
      const allMatch = queryWords.every(word => 
        item.title.toLowerCase().includes(word) ||
        item.content.toLowerCase().includes(word) ||
        item.keywords.some(k => k.toLowerCase().includes(word))
      ) ? 5 : 0;
      
      return {
        ...item,
        score: titleMatch + contentMatch + keywordMatch + allMatch
      };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => (b as any).score - (a as any).score)
    .slice(0, 10);
}

export function getRelatedKnowledge(itemId: string, limit: number = 5): KnowledgeItem[] {
  const item = knowledgeBase.find(i => i.id === itemId);
  if (!item) return [];
  
  return knowledgeBase
    .filter(i => i.id !== itemId && i.category === item.category)
    .slice(0, limit);
}

export function getCategories(): string[] {
  const categories = new Set(knowledgeBase.map(item => item.category));
  return Array.from(categories);
}

export function getByCategory(category: string): KnowledgeItem[] {
  return knowledgeBase.filter(item => item.category === category);
}
