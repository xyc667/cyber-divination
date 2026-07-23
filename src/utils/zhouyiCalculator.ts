export interface Hexagram {
  name: string;
  symbol: string;
  lines: number[];
  meaning: string;
  judgment: string;
  image: string;
  interpretation: string;
  advice: string;
}

export interface ZhouyiResult {
  hexagram: Hexagram;
  changingLines: number[];
  interpretation: string;
}

const HEXAGRAMS: Hexagram[] = [
  {
    name: '乾',
    symbol: '☰',
    lines: [1, 1, 1, 1, 1, 1],
    meaning: '天',
    judgment: '元亨利贞',
    image: '天行健，君子以自强不息',
    interpretation: '乾卦象征刚健、纯粹、至善至美。代表事物处于上升阶段，充满活力与创造力。如同天道运行不息，君子应效法天道，刚毅坚卓，发奋图强。此卦预示着事业顺利、机遇来临，是大吉之兆。',
    advice: '宜积极进取，勇于开拓，保持刚健中正之德，持之以恒。但需戒骄戒躁，避免亢龙有悔。'
  },
  {
    name: '坤',
    symbol: '☷',
    lines: [0, 0, 0, 0, 0, 0],
    meaning: '地',
    judgment: '元亨，利牝马之贞',
    image: '地势坤，君子以厚德载物',
    interpretation: '坤卦象征柔顺、包容、厚德载物。代表事物处于孕育、积累阶段，需要耐心等待和默默耕耘。如同大地承载万物，君子应效法地德，宽厚包容，以德服人。此卦预示着需要顺势而为，厚积薄发。',
    advice: '宜柔顺处事，广结善缘，积累德行。不可急于求成，要像母马一样温顺而坚定，终能成事。'
  },
  {
    name: '屯',
    symbol: '☳',
    lines: [1, 0, 0, 1, 1, 1],
    meaning: '萌芽',
    judgment: '元亨利贞，勿用有攸往',
    image: '云雷屯，君子以经纶',
    interpretation: '屯卦象征初生、萌芽、困难与希望并存。如同一颗种子刚刚破土而出，需要精心呵护。虽有艰难险阻，但蕴含无限生机。君子应像治理丝纶一样，理清头绪，循序渐进。',
    advice: '宜守正待机，不宜轻举妄动。积小成大，厚植根基，待时机成熟再行动。'
  },
  {
    name: '蒙',
    symbol: '☶',
    lines: [0, 0, 1, 0, 0, 0],
    meaning: '启蒙',
    judgment: '亨，匪我求童蒙',
    image: '山下出泉，君子以果行育德',
    interpretation: '蒙卦象征启蒙、教育、求知。如同泉水从山下涌出，象征智慧的开启。此卦预示着学习的开始，需要虚心求教，循序渐进。君子应果断行动，培养品德。',
    advice: '宜虚心学习，尊师重道。保持好奇心，持续积累知识，终能豁然开朗。'
  },
  {
    name: '需',
    symbol: '☱',
    lines: [0, 1, 1, 1, 1, 1],
    meaning: '等待',
    judgment: '有孚，光亨贞吉',
    image: '云上于天，君子以饮食宴乐',
    interpretation: '需卦象征等待、需待、积蓄力量。如同云气上升到天空，即将降雨。此时需要耐心等待时机，不可急躁。君子应安心等待，养精蓄锐。',
    advice: '宜耐心等待，不可强求。趁此时机充实自己，厚积薄发。'
  },
  {
    name: '讼',
    symbol: '☴',
    lines: [1, 1, 1, 0, 1, 0],
    meaning: '争讼',
    judgment: '有孚窒惕，中吉终凶',
    image: '天与水违行，君子以作事谋始',
    interpretation: '讼卦象征争讼、矛盾、纠纷。天与水背道而驰，象征意见不合。此卦预示着可能发生争执，但宜和解不宜对抗。君子应在做事之初就考虑周全，避免争端。',
    advice: '宜谨慎处事，避免争执。以和为贵，寻求和解之道，不可逞强好胜。'
  },
  {
    name: '师',
    symbol: '☵',
    lines: [0, 0, 0, 0, 1, 0],
    meaning: '军队',
    judgment: '贞，丈人吉，无咎',
    image: '地中有水，君子以容民畜众',
    interpretation: '师卦象征军队、众望、领导。如同地中藏水，蕴含力量。此卦预示着需要团结众人，共同奋斗。君子应像贤明的统帅，以德服人，凝聚人心。',
    advice: '宜团结协作，选贤任能。严明纪律，以身作则，方能成就大事。'
  },
  {
    name: '比',
    symbol: '☲',
    lines: [1, 0, 0, 0, 0, 0],
    meaning: '亲比',
    judgment: '吉，原筮元永贞',
    image: '地上有水，先王以建万国',
    interpretation: '比卦象征亲比、团结、归附。如同水在地上，滋润万物。此卦预示着人际关系良好，容易得到他人的帮助和支持。君子应广结善缘，相互依存。',
    advice: '宜广交朋友，和睦相处。以诚待人，乐于助人，自然得道多助。'
  },
  {
    name: '小畜',
    symbol: '☰',
    lines: [1, 1, 0, 1, 1, 1],
    meaning: '小积蓄',
    judgment: '亨，密云不雨',
    image: '风行天上，君子以懿文德',
    interpretation: '小畜卦象征小有积蓄、待时而动。如同乌云密布但尚未下雨，时机尚未成熟。此卦预示着小有成就，但还需要继续积累。君子应修文养德，厚积薄发。',
    advice: '宜修身养性，积累实力。时机未到，不可强求，静待天时。'
  },
  {
    name: '履',
    symbol: '☷',
    lines: [0, 1, 1, 1, 0, 0],
    meaning: '履践',
    judgment: '履虎尾，不咥人，亨',
    image: '上天下泽，君子以辨上下',
    interpretation: '履卦象征实践、履险、谨慎行事。如同行走在老虎尾巴旁边，需要小心翼翼。此卦预示着前进道路上有风险，但谨慎行事可保平安。君子应辨明上下尊卑，循礼而行。',
    advice: '宜谨慎行事，步步为营。保持敬畏之心，小心谨慎可保平安。'
  },
  {
    name: '泰',
    symbol: '☰☷',
    lines: [0, 0, 0, 1, 1, 1],
    meaning: '通泰',
    judgment: '小往大来，吉亨',
    image: '天地交，泰，后以财成天地之道',
    interpretation: '泰卦象征通泰、亨通、顺利。天地相交，万物通达。此卦预示着事业顺利，吉祥亨通，是大吉之兆。君子应把握时机，成就事业。',
    advice: '宜顺势而为，大展宏图。此时是发展的黄金时期，应积极进取。'
  },
  {
    name: '否',
    symbol: '☷☰',
    lines: [1, 1, 1, 0, 0, 0],
    meaning: '闭塞',
    judgment: '否之匪人，不利君子贞',
    image: '天地不交，否，君子以俭德辟难',
    interpretation: '否卦象征闭塞、不通、困难。天地不交，万物不通。此卦预示着时运不佳，诸事不顺。君子应收敛锋芒，节俭修身，等待转机。',
    advice: '宜守正待时，韬光养晦。不可强求，保存实力，静待否极泰来。'
  },
  {
    name: '同人',
    symbol: '☲☰',
    lines: [1, 1, 1, 0, 1, 1],
    meaning: '同人',
    judgment: '同人于野，亨',
    image: '天与火，同人，君子以类族辨物',
    interpretation: '同人卦象征团结、同心、和谐。天与火相互映照，志同道合。此卦预示着人际关系和谐，容易与人合作成功。君子应明辨事物类别，团结同类。',
    advice: '宜广结善缘，精诚合作。团结一心，共同奋斗，无往不胜。'
  },
  {
    name: '大有',
    symbol: '☰☲',
    lines: [1, 0, 1, 0, 0, 0],
    meaning: '大有',
    judgment: '元亨',
    image: '火在天上，君子以遏恶扬善',
    interpretation: '大有卦象征富有、丰收、盛大。如同火光普照大地，光明灿烂。此卦预示着事业兴旺，收获颇丰。君子应遏止邪恶，宣扬善行。',
    advice: '宜行善积德，保持谦逊。富而不骄，贵而能仁，方能长久。'
  },
  {
    name: '谦',
    symbol: '☶☷',
    lines: [0, 0, 0, 0, 1, 0],
    meaning: '谦虚',
    judgment: '亨，君子有终',
    image: '地中有山，君子以裒多益寡',
    interpretation: '谦卦象征谦虚、退让、美德。山藏于地下，象征谦逊。此卦预示着谦虚使人受益，骄傲使人落后。君子应减损多余，补益不足。',
    advice: '宜保持谦逊，虚怀若谷。谦虚待人，方能获得他人尊重和帮助。'
  },
  {
    name: '豫',
    symbol: '☷☶',
    lines: [0, 1, 0, 0, 0, 0],
    meaning: '喜悦',
    judgment: '利建侯行师',
    image: '雷出地奋，先王以作乐崇德',
    interpretation: '豫卦象征喜悦、安乐、和顺。雷声震动大地，万物欢欣。此卦预示着心情舒畅，诸事顺遂。君子应作乐崇德，与民同乐。',
    advice: '宜享受当下，与人为善。但不可沉溺享乐，保持适度。'
  },
  {
    name: '随',
    symbol: '☳☰',
    lines: [1, 1, 1, 0, 0, 1],
    meaning: '随顺',
    judgment: '元亨利贞，无咎',
    image: '泽中有雷，君子以向晦入宴息',
    interpretation: '随卦象征随顺、跟随、顺应。泽中有雷，顺从自然。此卦预示着顺势而为，诸事顺遂。君子应顺应时势，劳逸结合。',
    advice: '宜顺势而为，灵活应变。审时度势，随遇而安。'
  },
  {
    name: '蛊',
    symbol: '☰☳',
    lines: [1, 0, 0, 1, 1, 1],
    meaning: '蛊坏',
    judgment: '元亨，利涉大川',
    image: '山下有风，君子以振民育德',
    interpretation: '蛊卦象征腐败、整治、革新。山下有风，吹散旧弊。此卦预示着需要整顿治理，去除弊端。君子应振作民众，培养品德。',
    advice: '宜整顿革新，去除旧弊。勇于改革，方能重焕生机。'
  },
  {
    name: '临',
    symbol: '☵☷',
    lines: [0, 0, 0, 1, 0, 0],
    meaning: '临视',
    judgment: '元亨利贞，至于八月有凶',
    image: '泽上有地，君子以教思无穷',
    interpretation: '临卦象征临视、统治、督导。泽上有地，居高临下。此卦预示着处于领导地位，需要以身作则。君子应教导民众，思虑深远。',
    advice: '宜以身作则，教导他人。保持警惕，不可懈怠。'
  },
  {
    name: '观',
    symbol: '☷☵',
    lines: [1, 0, 0, 0, 0, 0],
    meaning: '观察',
    judgment: '盥而不荐，有孚颙若',
    image: '风行地上，先王以省方观民设教',
    interpretation: '观卦象征观察、审视、教化。风行大地，遍观万物。此卦预示着需要仔细观察，审时度势。君子应巡视四方，观察民情。',
    advice: '宜静观其变，明察秋毫。多角度观察，方能洞察真相。'
  },
  {
    name: '噬嗑',
    symbol: '☲☴',
    lines: [0, 1, 0, 0, 1, 1],
    meaning: '咬合',
    judgment: '亨，利用狱',
    image: '雷电，噬嗑，先王以明罚敕法',
    interpretation: '噬嗑卦象征咬合、整治、决断。雷电交加，明辨是非。此卦预示着需要明断是非，公正处理。君子应严明刑罚，整饬法度。',
    advice: '宜明断是非，公正处事。赏罚分明，方能服众。'
  },
  {
    name: '贲',
    symbol: '☴☲',
    lines: [1, 1, 0, 1, 0, 0],
    meaning: '文饰',
    judgment: '亨，小利有攸往',
    image: '山下有火，君子以明庶政',
    interpretation: '贲卦象征文饰、美化、礼仪。山下有火，光彩照人。此卦预示着注重外表修饰，讲究礼仪。君子应明察政务，注重形式与内容的统一。',
    advice: '宜注重修养，内外兼修。文质彬彬，然后君子。'
  },
  {
    name: '剥',
    symbol: '☶☰',
    lines: [1, 1, 1, 1, 0, 0],
    meaning: '剥落',
    judgment: '不利有攸往',
    image: '山附于地，上以厚下安宅',
    interpretation: '剥卦象征剥落、衰败、退守。山附着于地，根基动摇。此卦预示着事物处于衰退阶段，不宜进取。君子应厚待民众，巩固根基。',
    advice: '宜退守自保，厚植根基。保存实力，等待转机。'
  },
  {
    name: '复',
    symbol: '☰☶',
    lines: [0, 0, 1, 1, 1, 1],
    meaning: '复归',
    judgment: '亨。出入无疾，朋来无咎',
    image: '雷在地中，先王以至日闭关',
    interpretation: '复卦象征复归、回归、复兴。雷藏地中，蓄势待发。此卦预示着否极泰来，事物开始好转。君子应顺应天时，闭关修养。',
    advice: '宜回归本源，休养生息。返璞归真，静待复兴。'
  },
  {
    name: '无妄',
    symbol: '☳☴',
    lines: [0, 0, 1, 1, 1, 0],
    meaning: '无妄',
    judgment: '元亨利贞。其匪正有眚',
    image: '天下雷行，物与无妄，先王以茂对时育万物',
    interpretation: '无妄卦象征无妄、不妄为、守正。天下雷行，万物遵道。此卦预示着应顺其自然，不可妄动。君子应顺应时节，养育万物。',
    advice: '宜守正不妄，顺其自然。安分守己，不贪非分之福。'
  },
  {
    name: '大畜',
    symbol: '☴☳',
    lines: [0, 1, 1, 1, 0, 1],
    meaning: '大积蓄',
    judgment: '利贞，不家食吉',
    image: '天在山中，君子以多识前言往行',
    interpretation: '大畜卦象征大积蓄、大德、多识。天藏山中，积蓄能量。此卦预示着需要广积学识，厚积薄发。君子应博古通今，积累智慧。',
    advice: '宜广积学识，厚植德行。博学多闻，方能成就大业。'
  },
  {
    name: '颐',
    symbol: '☶☵',
    lines: [0, 0, 0, 0, 1, 1],
    meaning: '颐养',
    judgment: '贞吉，观颐，自求口实',
    image: '山下有雷，君子以慎言语节饮食',
    interpretation: '颐卦象征颐养、保养、自食其力。山下有雷，震动万物。此卦预示着需要修身养性，自食其力。君子应谨慎言语，节制饮食。',
    advice: '宜修身养性，自食其力。劳逸结合，保持身心健康。'
  },
  {
    name: '大过',
    symbol: '☵☶',
    lines: [1, 1, 0, 0, 0, 0],
    meaning: '大过',
    judgment: '栋桡，利有攸往',
    image: '泽灭木，君子以独立不惧',
    interpretation: '大过卦象征过度、非常、变革。泽水淹没树木，非常之象。此卦预示着需要非常手段，大胆革新。君子应独立不惧，敢于担当。',
    advice: '宜大胆革新，勇于突破。非常时期需要非常之举。'
  },
  {
    name: '坎',
    symbol: '☵',
    lines: [0, 1, 0, 0, 1, 0],
    meaning: '水',
    judgment: '习坎，有孚维心亨',
    image: '水洊至，君子以常德行习教事',
    interpretation: '坎卦象征险陷、困难、诚信。水流不息，重重险难。此卦预示着困难重重，但只要心怀诚信，终能亨通。君子应保持常道，反复学习。',
    advice: '宜坚守诚信，勇于克难。不畏艰险，终能突破困境。'
  },
  {
    name: '离',
    symbol: '☲',
    lines: [1, 0, 1, 1, 0, 1],
    meaning: '火',
    judgment: '利贞，亨，畜牝牛吉',
    image: '明两作，离，大人以继明照于四方',
    interpretation: '离卦象征光明、依附、美丽。火焰光明，照耀四方。此卦预示着光明照耀，事业光明。君子应传承光明，照耀四方。',
    advice: '宜光明磊落，积极进取。以德服人，凝聚人心。'
  },
  {
    name: '咸',
    symbol: '☴☷',
    lines: [0, 0, 0, 0, 1, 0],
    meaning: '感应',
    judgment: '亨利贞，取女吉',
    image: '山上有泽，君子以虚受人',
    interpretation: '咸卦象征感应、交感、和谐。山上有泽，相互感应。此卦预示着人际关系和谐，心意相通。君子应虚心接纳，感应万物。',
    advice: '宜真诚相待，心灵相通。相互理解，和谐共处。'
  },
  {
    name: '恒',
    symbol: '☷☴',
    lines: [0, 1, 0, 0, 0, 0],
    meaning: '恒常',
    judgment: '亨无咎，利贞',
    image: '雷风，恒，君子以立不易方',
    interpretation: '恒卦象征恒常、持久、坚守。雷风相伴，恒久不变。此卦预示着需要持之以恒，坚守正道。君子应坚守信念，持之以恒。',
    advice: '宜持之以恒，坚守正道。坚持不懈，终能成功。'
  },
  {
    name: '遁',
    symbol: '☰☴',
    lines: [0, 1, 1, 1, 1, 1],
    meaning: '退避',
    judgment: '亨，小利贞',
    image: '天下有山，君子以远小人',
    interpretation: '遁卦象征退避、隐遁、收敛。天高于山，君子遁世。此卦预示着需要暂时退避，明哲保身。君子应远离小人，洁身自好。',
    advice: '宜审时度势，适时退避。韬光养晦，保存实力。'
  },
  {
    name: '大壮',
    symbol: '☴☰',
    lines: [1, 1, 1, 1, 0, 1],
    meaning: '大壮',
    judgment: '利贞',
    image: '雷在天上，君子以非礼弗履',
    interpretation: '大壮卦象征壮大、强盛、刚健。雷在天上，声威显赫。此卦预示着事业强盛，但需守正。君子应守礼而行，不可妄动。',
    advice: '宜守正不阿，量力而行。强大而不骄横，方能持久。'
  },
  {
    name: '晋',
    symbol: '☲☷',
    lines: [0, 0, 0, 1, 0, 1],
    meaning: '晋升',
    judgment: '康侯用锡马蕃庶',
    image: '明出地上，君子以自昭明德',
    interpretation: '晋卦象征晋升、前进、成长。光明出地，蒸蒸日上。此卦预示着事业上升，步步高升。君子应彰显美德，不断进步。',
    advice: '宜积极进取，彰显美德。抓住机遇，稳步上升。'
  },
  {
    name: '明夷',
    symbol: '☷☲',
    lines: [1, 0, 1, 0, 0, 0],
    meaning: '光明损伤',
    judgment: '利艰贞',
    image: '明入地中，君子以莅众用晦而明',
    interpretation: '明夷卦象征光明损伤、韬光养晦。光明入地，暂时隐藏。此卦预示着时运不佳，需要收敛锋芒。君子应治理民众，用晦而明。',
    advice: '宜韬光养晦，静待时机。表面隐晦，内心清明。'
  },
  {
    name: '家人',
    symbol: '☲☶',
    lines: [0, 1, 0, 1, 0, 1],
    meaning: '家庭',
    judgment: '利女贞',
    image: '风自火出，君子以言有物而行有恒',
    interpretation: '家人卦象征家庭、和睦、治家。风自火出，温暖家庭。此卦预示着家庭和睦，事业稳固。君子应言行一致，持之以恒。',
    advice: '宜修身齐家，和睦相处。言传身教，家风端正。'
  },
  {
    name: '睽',
    symbol: '☶☲',
    lines: [1, 0, 1, 0, 1, 0],
    meaning: '乖离',
    judgment: '小事吉',
    image: '上火下泽，君子以同而异',
    interpretation: '睽卦象征乖离、矛盾、分歧。上火下泽，相互背离。此卦预示着意见不合，需要求同存异。君子应和而不同，尊重差异。',
    advice: '宜求同存异，化解矛盾。相互理解，达成共识。'
  },
  {
    name: '蹇',
    symbol: '☵☶',
    lines: [0, 1, 0, 0, 0, 1],
    meaning: '险阻',
    judgment: '利西南，不利东北',
    image: '山上有水，君子以反身修德',
    interpretation: '蹇卦象征险阻、困难、进退维谷。山上有水，道路艰难。此卦预示着前进受阻，需要反躬自省。君子应反身修德，积蓄力量。',
    advice: '宜反躬自省，修身养性。积蓄力量，等待时机。'
  },
  {
    name: '解',
    symbol: '☶☵',
    lines: [1, 0, 0, 0, 1, 0],
    meaning: '解除',
    judgment: '利西南，无所往',
    image: '雷雨作，君子以赦过宥罪',
    interpretation: '解卦象征解除、缓解、释放。雷雨交加，解除困境。此卦预示着困境解除，重获自由。君子应赦免过错，宽恕他人。',
    advice: '宜解除束缚，宽以待人。放下包袱，轻装上阵。'
  },
  {
    name: '损',
    symbol: '☶☱',
    lines: [0, 1, 1, 0, 0, 1],
    meaning: '减损',
    judgment: '有孚，元吉无咎',
    image: '山下有泽，君子以惩忿窒欲',
    interpretation: '损卦象征减损、克制、节俭。山下有泽，泽减山损。此卦预示着需要减损欲望，克制自己。君子应克制忿怒，抑制欲望。',
    advice: '宜克制欲望，节俭修身。损己利人，终获吉祥。'
  },
  {
    name: '益',
    symbol: '☱☶',
    lines: [1, 0, 0, 1, 1, 0],
    meaning: '增益',
    judgment: '利有攸往，利涉大川',
    image: '风雷，益，君子以见善则迁',
    interpretation: '益卦象征增益、受益、进取。风雷相助，相得益彰。此卦预示着受益增多，事业进步。君子应见善则迁，有过则改。',
    advice: '宜积极进取，助人为乐。多行善事，自然受益。'
  },
  {
    name: '夬',
    symbol: '☱☰',
    lines: [1, 1, 1, 1, 1, 0],
    meaning: '决断',
    judgment: '扬于王庭，孚号',
    image: '泽上于天，君子以施禄及下',
    interpretation: '夬卦象征决断、果断、清除。泽水滔天，势不可挡。此卦预示着需要果断行动，清除障碍。君子应施恩于民，泽被四方。',
    advice: '宜当机立断，清除障碍。果断决策，速战速决。'
  },
  {
    name: '姤',
    symbol: '☰☱',
    lines: [0, 1, 1, 1, 1, 1],
    meaning: '相遇',
    judgment: '女壮，勿用取女',
    image: '天下有风，后以施命诰四方',
    interpretation: '姤卦象征相遇、邂逅、机遇。天下有风，无物不遇。此卦预示着机缘巧合，萍水相逢。君子应广施号令，泽被天下。',
    advice: '宜广结善缘，把握机遇。顺势而为，不可强求。'
  },
  {
    name: '萃',
    symbol: '☵☱',
    lines: [0, 1, 1, 0, 0, 0],
    meaning: '聚集',
    judgment: '亨，王假有庙',
    image: '泽上于地，君子以除戎器戒不虞',
    interpretation: '萃卦象征聚集、荟萃、团结。泽水汇聚，万物聚集。此卦预示着人才汇聚，事业兴旺。君子应修治兵器，防患未然。',
    advice: '宜团结协作，广纳人才。居安思危，防患未然。'
  },
  {
    name: '升',
    symbol: '☱☵',
    lines: [0, 0, 0, 1, 1, 0],
    meaning: '上升',
    judgment: '元亨，用见大人',
    image: '地中生木，君子以顺德积小以高大',
    interpretation: '升卦象征上升、晋升、成长。地中生木，茁壮成长。此卦预示着事业上升，步步高升。君子应顺应德性，积小成大。',
    advice: '宜顺势上升，积少成多。循序渐进，终成大器。'
  },
  {
    name: '困',
    symbol: '☴☵',
    lines: [0, 0, 1, 0, 1, 0],
    meaning: '困厄',
    judgment: '亨，贞大人吉',
    image: '泽无水，君子以致命遂志',
    interpretation: '困卦象征困厄、困境、坚守。泽中无水，陷入困境。此卦预示着处境艰难，但坚守正道终能脱困。君子应不惜生命，实现志向。',
    advice: '宜坚守正道，自强不息。困境中保持信念，终能突破。'
  },
  {
    name: '井',
    symbol: '☵☴',
    lines: [0, 1, 0, 1, 0, 0],
    meaning: '水井',
    judgment: '改邑不改井，无丧无得',
    image: '木上有水，君子以劳民劝相',
    interpretation: '井卦象征水井、源泉、修养。木上有水，滋润万物。此卦预示着修身养性，滋养他人。君子应鼓励民众，相互帮助。',
    advice: '宜修身养性，乐于助人。积德行善，泽被他人。'
  },
  {
    name: '革',
    symbol: '☲☵',
    lines: [0, 1, 0, 1, 0, 1],
    meaning: '变革',
    judgment: '巳日乃孚，元亨利贞',
    image: '泽中有火，君子以治历明时',
    interpretation: '革卦象征变革、革新、除旧布新。泽中有火，水火相济。此卦预示着需要大胆变革，与时俱进。君子应制定历法，明确时机。',
    advice: '宜顺应时势，大胆革新。把握时机，除旧布新。'
  },
  {
    name: '鼎',
    symbol: '☵☲',
    lines: [1, 0, 1, 0, 1, 0],
    meaning: '鼎器',
    judgment: '元吉，亨',
    image: '木上有火，君子以正位凝命',
    interpretation: '鼎卦象征鼎器、权力、稳重。木上有火，烹饪食物。此卦预示着地位稳固，事业鼎盛。君子应端正位置，凝聚天命。',
    advice: '宜端正态度，稳重行事。德位相配，方能长久。'
  },
  {
    name: '震',
    symbol: '☳',
    lines: [0, 0, 1, 0, 0, 1],
    meaning: '雷',
    judgment: '亨，震来虩虩',
    image: '洊雷，震，君子以恐惧修省',
    interpretation: '震卦象征震动、警醒、奋发。雷声震动，警醒世人。此卦预示着突发事件，需要保持警觉。君子应心怀敬畏，修身反省。',
    advice: '宜保持警觉，居安思危。临危不乱，化危为机。'
  },
  {
    name: '艮',
    symbol: '☶',
    lines: [1, 0, 0, 1, 0, 0],
    meaning: '山',
    judgment: '艮其背，不获其身',
    image: '兼山，艮，君子以思不出其位',
    interpretation: '艮卦象征静止、停止、坚守。两山相叠，静止不动。此卦预示着需要停止行动，静心思索。君子应安分守己，不越本分。',
    advice: '宜静观其变，守位不越。适时停止，反思自省。'
  },
  {
    name: '渐',
    symbol: '☴☳',
    lines: [0, 0, 1, 0, 0, 1],
    meaning: '渐进',
    judgment: '女归吉，利贞',
    image: '山上有木，君子以居贤德善俗',
    interpretation: '渐卦象征渐进、逐步、积累。山上有木，慢慢生长。此卦预示着事物逐步发展，循序渐进。君子应修养贤德，改善风俗。',
    advice: '宜循序渐进，稳步前进。积少成多，终成大器。'
  },
  {
    name: '归妹',
    symbol: '☳☴',
    lines: [1, 0, 0, 1, 0, 0],
    meaning: '归妹',
    judgment: '征凶，无攸利',
    image: '泽上有雷，君子以永终知敝',
    interpretation: '归妹卦象征婚嫁、归宿、从属。泽上有雷，相互感应。此卦预示着需要慎重行事，不宜急进。君子应考虑长远，预见弊端。',
    advice: '宜慎重行事，考虑长远。不急不躁，水到渠成。'
  },
  {
    name: '丰',
    symbol: '☲☳',
    lines: [0, 0, 1, 1, 0, 1],
    meaning: '丰盛',
    judgment: '亨，王假之',
    image: '雷电皆至，君子以折狱致刑',
    interpretation: '丰卦象征丰盛、盛大、光明。雷电交加，光芒万丈。此卦预示着事业鼎盛，光芒四射。君子应明断狱讼，公正执法。',
    advice: '宜保持谦逊，戒骄戒躁。盛极之时，更需谨慎。'
  },
  {
    name: '旅',
    symbol: '☳☲',
    lines: [1, 0, 1, 0, 0, 1],
    meaning: '旅行',
    judgment: '小亨，旅贞吉',
    image: '山上有火，君子以明慎用刑',
    interpretation: '旅卦象征旅行、羁旅、漂泊。山上有火，旅途劳顿。此卦预示着身处异乡，需要谨慎行事。君子应明慎用刑，不轻举妄动。',
    advice: '宜谨慎行事，入乡随俗。保持警觉，保护自己。'
  },
  {
    name: '巽',
    symbol: '☴',
    lines: [1, 0, 1, 1, 0, 1],
    meaning: '风',
    judgment: '小亨，利有攸往',
    image: '随风，巽，君子以申命行事',
    interpretation: '巽卦象征风、顺从、谦逊。风吹万物，无孔不入。此卦预示着需要柔顺处事，灵活应变。君子应重申命令，贯彻执行。',
    advice: '宜谦逊柔顺，灵活应变。顺势而为，无往不利。'
  },
  {
    name: '兑',
    symbol: '☱',
    lines: [0, 1, 1, 0, 1, 1],
    meaning: '泽',
    judgment: '亨，利贞',
    image: '丽泽，兑，君子以朋友讲习',
    interpretation: '兑卦象征泽、喜悦、交流。两泽相连，相互滋润。此卦预示着人际关系和谐，心情愉悦。君子应与朋友切磋，共同进步。',
    advice: '宜友善待人，广交朋友。相互学习，共同进步。'
  },
  {
    name: '涣',
    symbol: '☴☵',
    lines: [0, 1, 0, 1, 0, 1],
    meaning: '涣散',
    judgment: '亨，王假有庙',
    image: '风行水上，先王以享于帝立庙',
    interpretation: '涣卦象征涣散、离散、化解。风行水上，涣散万物。此卦预示着需要凝聚人心，化解分歧。君子应祭祀祖先，凝聚精神。',
    advice: '宜凝聚人心，化解矛盾。团结一心，共渡难关。'
  },
  {
    name: '节',
    symbol: '☵☱',
    lines: [0, 1, 1, 0, 1, 0],
    meaning: '节制',
    judgment: '亨，苦节不可贞',
    image: '泽上有水，君子以制数度议德行',
    interpretation: '节卦象征节制、节度、适度。泽上有水，需要节制。此卦预示着需要节制欲望，把握分寸。君子应制定制度，议论德行。',
    advice: '宜节制有度，适可而止。过犹不及，恰到好处。'
  },
  {
    name: '中孚',
    symbol: '☱☲',
    lines: [1, 0, 1, 0, 1, 1],
    meaning: '诚信',
    judgment: '豚鱼吉，利涉大川',
    image: '泽上有风，君子以议狱缓死',
    interpretation: '中孚卦象征诚信、忠信、孚信。泽上有风，无所不至。此卦预示着心怀诚信，无往不利。君子应审慎断狱，宽缓刑罚。',
    advice: '宜诚实守信，言行一致。诚信待人，自然得道多助。'
  },
  {
    name: '小过',
    symbol: '☲☱',
    lines: [1, 1, 0, 1, 0, 1],
    meaning: '小过',
    judgment: '亨，利贞，可小事',
    image: '山上有雷，君子以行过乎恭',
    interpretation: '小过卦象征小过、小有过度、谨慎。山上有雷，声势稍过。此卦预示着小有过度，需要谨慎行事。君子应行为恭敬，守礼有度。',
    advice: '宜谨慎行事，不越分寸。小过无妨，过则成灾。'
  },
  {
    name: '既济',
    symbol: '☵☲',
    lines: [1, 0, 0, 0, 1, 1],
    meaning: '既济',
    judgment: '亨，小利贞',
    image: '水在火上，君子以思患而豫防之',
    interpretation: '既济卦象征既济、完成、成功。水在火上，烹饪完成。此卦预示着事情已经完成，但需防患未然。君子应居安思危，预防隐患。',
    advice: '宜居安思危，防患未然。成功之后，更需谨慎。'
  },
  {
    name: '未济',
    symbol: '☲☵',
    lines: [0, 1, 1, 1, 0, 0],
    meaning: '未济',
    judgment: '亨，小狐汔济',
    image: '火在水上，君子以慎辨物居方',
    interpretation: '未济卦象征未济、未完成、继续努力。火在水上，尚未完成。此卦预示着事情尚未完成，需要继续努力。君子应谨慎分辨，各居其位。',
    advice: '宜再接再厉，坚持到底。功亏一篑，实为可惜。'
  }
];

function generateRandomLines(): number[] {
  const lines: number[] = [];
  for (let i = 0; i < 6; i++) {
    lines.push(Math.random() > 0.5 ? 1 : 0);
  }
  return lines;
}

function findHexagram(lines: number[]): Hexagram {
  const reversed = [...lines].reverse();
  for (const hexagram of HEXAGRAMS) {
    if (hexagram.lines.every((line, index) => line === reversed[index])) {
      return hexagram;
    }
  }
  return HEXAGRAMS[0];
}

function generateInterpretation(hexagram: Hexagram, changingLines: number[]): string {
  const interpretations: string[] = [];
  interpretations.push(`【${hexagram.name}卦·${hexagram.meaning}】`);
  interpretations.push(`卦象：${hexagram.symbol}`);
  interpretations.push(`卦辞：${hexagram.judgment}`);
  interpretations.push(`象曰：${hexagram.image}`);
  
  if (changingLines.length > 0) {
    interpretations.push(`\n变爻：第${changingLines.join('、')}爻`);
    interpretations.push('提示：变爻意味着事物正在发生变化，需关注变化带来的机遇与挑战。');
  }
  
  interpretations.push(`\n${hexagram.interpretation}`);
  interpretations.push(`\n建议：${hexagram.advice}`);
  
  return interpretations.join('\n');
}

export function calculateZhouyi(): ZhouyiResult {
  const lines = generateRandomLines();
  const hexagram = findHexagram(lines);
  const changingLines: number[] = [];
  
  lines.forEach((line, index) => {
    if (Math.random() > 0.7) {
      changingLines.push(index + 1);
    }
  });
  
  const interpretation = generateInterpretation(hexagram, changingLines);
  
  return {
    hexagram,
    changingLines,
    interpretation
  };
}

export function getHexagramByName(name: string): Hexagram | undefined {
  return HEXAGRAMS.find(h => h.name === name);
}
