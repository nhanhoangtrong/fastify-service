import { config } from 'dotenv';

config();

const Config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT,
  telegramBot: process.env.TELEGRAM_BOT || '',
  dbUrl: process.env.DB_URL || 'postgresql://test:test@localhost:5432/test',
  simpleAuthToken: process.env.SIMPLE_AUTH_TOKEN || 'simple-auth-token',
  jwtSecret: process.env.JWT_SECRET || 'jwt-secret',
  jwtExpire: Number.parseInt(process.env.JWT_EXPIRE || '86400'), // 1 day

  /**
   * Get Fastify logger option from environment
   * @returns {import("fastify").FastifyLoggerOptions}
   */
  loggerConfig() {
    /** @type {{[key: string]: import("fastify").FastifyLoggerOptions}} */
    const confByEnv = {
      development: {
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
        level: 'debug',
      },
      production: true,
      test: false,
    };

    return confByEnv[process.env.NODE_ENV || 'development'] || false;
  },

  /**
   * Get value from environment or default value
   * @template T
   * @param {string} key
   * @param {T | undefined} defaultValue
   * @returns {T | undefined}
   */
  get(key, defaultValue) {
    return Object.prototype.hasOwnProperty.call(this, key) ? this[key] : defaultValue;
  },
};

export default Config;
