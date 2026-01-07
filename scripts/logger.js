/**
 * 統一錯誤處理和日誌工具
 */
class Logger {
  static info(message, context = '') {
    const prefix = context ? `[${context}]` : '[INFO]';
    console.log(`${prefix} ${message}`);
  }

  static warn(message, context = '') {
    const prefix = context ? `[${context}]` : '[WARN]';
    console.warn(`${prefix} ${message}`);
  }

  static error(message, error = null, context = '') {
    const prefix = context ? `[${context}]` : '[ERROR]';
    console.error(`${prefix} ${message}`);
    if (error) {
      console.error(error);
    }
  }
}

module.exports = { Logger };