// Calculator 模板 - 复制后把 __KEBAB__/__NAME__/__TITLE__ 替换为真实值

export interface __NAME__Input {
  question?: string;
  datetime?: Date;
}

export interface __NAME__Result {
  summary: string;
  details: Record<string, unknown>;
}

/**
 * __TITLE__ 起盘 / 排盘主入口
 * 必须是纯函数，不引用 React / DOM
 */
export function calc__NAME__(input: __NAME__Input): __NAME__Result {
  // 引用 input 避免 TS noUnusedParameters 报错；真正实现时移除此行
  void input;
  return {
    summary: '尚未实现',
    details: {},
  };
}