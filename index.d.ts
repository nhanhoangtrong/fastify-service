declare namespace root {
  type DrizzleDb = ReturnType<typeof import('./lib/plugins/drizzle/connector').default>;
  type FastifyInstance = import('fastify').FastifyInstance & {
    db: DrizzleDb;
  };
}

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

type HandlerResponse = {
  text: string;
  success: boolean;
};
