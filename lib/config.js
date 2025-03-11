import { config } from 'dotenv';

config();

const Config = {
  PORT: process.env.PORT,
  CMC_API_KEY: process.env.CMC_API_KEY,
  TELEGRAM_BOT: process.env.TELEGRAM_BOT,
  RECEIVER_IDS: (process.env.RECEIVER_IDS || '').split(',').map((str) => Number.parseInt(str)),
  CRON_FNG: process.env.CRON_FNG || '0 * * * *',
  CRON_ALERT: process.env.CRON_ALERT || '* * * * *', // Default to every minutes
  DB_NAME: process.env.DB_NAME || 'test',
  DB_URL: process.env.DB_URL || 'mongo://localhost:27017/test',
};

export default Config;
