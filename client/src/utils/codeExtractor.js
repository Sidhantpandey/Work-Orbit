// Utility to extract code blocks from AI responses
export const extractCodeBlocks = (text) => {
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  
  while ((match = codeBlockRegex.exec(text)) !== null) {
    blocks.push({
      language: match[1] || 'javascript',
      code: match[2].trim(),
      fullMatch: match[0]
    });
  }
  
  return blocks;
};

export const removeCodeBlocks = (text) => {
  return text.replace(/```(\w+)?\n([\s\S]*?)```/g, '').trim();
};

export const hasCodeBlocks = (text) => {
  return /```(\w+)?\n([\s\S]*?)```/g.test(text);
};