import type { DecodePayloadType } from '@fastify/jwt';

type DrizzleDb = ReturnType<typeof import('drizzle-orm/node-postgres').drizzle>;

declare namespace telegram {
  type Entity = {
    offset: number;
    length: number;
    type: string;
  };

  type TelegramMessage = {
    message_id: number;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name: string;
      username: string;
      language_code: string;
    };
    chat: { id: number; title: string; type: string };
    date: number;
    text: string;
    entities: Array<Entity>;
  };
}

declare module 'fastify' {
  interface FastifyInstance {
    db: DrizzleDb;
    authorized: () => void;
    authenticate: () => void;
  }

  interface FastifyRequest {
    decoded: DecodePayloadType;
  }
}
