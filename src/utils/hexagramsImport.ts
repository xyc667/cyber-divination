import { knowledgeBase } from './ragKnowledgeBase';
import { HEXAGRAM_DATA } from './hexagramsFull';

function generateHexagramKnowledge() {
  const hexagramKnowledge = [];
  
  Object.entries(HEXAGRAM_DATA).forEach(([name, data]) => {
    const yaoText = data.yao.map((y: any) => `${y[0]}：${y[1]}`).join('；');
    
    let content = `【${data.symbol}】${name}卦（第${data.index}卦）\n\n`;
    content += `**卦辞**：${data.gua_ci || '无'}\n\n`;
    content += `**爻辞**：${yaoText}\n\n`;
    
    if (data.tuan) {
      content += `**彖传**：${data.tuan}\n\n`;
    }
    
    if (data.da_xiang) {
      content += `**大象**：${data.da_xiang}\n\n`;
    }
    
    if (data.wen_yan) {
      content += `**文言**：${data.wen_yan}\n\n`;
    }
    
    if (data.yong_jiu) {
      content += `**用九**：${data.yong_jiu}\n\n`;
    }
    
    if (data.yong_liu) {
      content += `**用六**：${data.yong_liu}\n\n`;
    }
    
    hexagramKnowledge.push({
      id: `hexagram_${data.index}`,
      title: `${name}卦`,
      category: '周易64卦',
      content: content.trim(),
      keywords: [name, `第${data.index}卦`, data.symbol],
      sources: ['周易']
    });
  });
  
  return hexagramKnowledge;
}

export const hexagramKnowledgeBase = generateHexagramKnowledge();