import Config from '../config.js';
import httpServices from './http.service.js';

class TelegramService {
  baseURL = '';
  constructor(baseURL = `https://api.telegram.org/${Config.TELEGRAM_BOT}`) {
    this.baseURL = baseURL;
  }

  async sendMessage(chatId = 0, text = '', parseMode = 'markdown') {
    const resp = httpServices.callAPI('POST', '/sendMessage', {
      baseURL: this.baseURL,
      data: {
        chat_id: chatId,
        text,
        parse_mode: parseMode,
      },
    });
    return resp;
  }
}

export default new TelegramService();
