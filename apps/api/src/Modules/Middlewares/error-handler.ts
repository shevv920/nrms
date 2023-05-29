import { Context, Next } from 'koa';
import type { Config, Logger } from '~/types';

export const errorHandler = (logger: Logger, config: Config) => {
  return async (ctx: Context, next: Next) => {
    try {
      await next();
    } catch (e: any) {
      ctx.status = 500;
      if (config.isDev) {
        logger.error(e);
      }
      ctx.body = { error: 'Unexpected server error' };
    }
  };
};
