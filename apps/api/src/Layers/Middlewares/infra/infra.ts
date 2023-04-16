import requestLogger from 'koa-logger';
import Koa, { Next, Context } from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';
import { injectable } from 'inversify';

const errorHandler: Koa.Middleware = async (ctx: Context, next: Next) => {
  try {
    await next();
  } catch (e: any) {
    ctx.status = 500;
    ctx.body = { error: e.message };
  }
};

const attachAuthData: Koa.Middleware = async (ctx: Context, next: Next) => {
  const { authorization } = ctx.headers;
  const accessToken = authorization?.replace('Bearer', '').trim();

  if (accessToken) {
    ctx.state.accessToken = accessToken;
  }

  await next();
};

const defaultMiddlewares = [
  cors({ credentials: true }),
  helmet(),
  bodyParser(),
  errorHandler,
  requestLogger(),
  attachAuthData,
];

@injectable()
export class InfraMiddlewares {
  constructor(
    private readonly middlewares: Koa.Middleware[] = defaultMiddlewares
  ) {
    this.middlewares = middlewares;
  }
  attach(app: Koa) {
    this.middlewares.forEach((middleware) => {
      app.use(middleware);
    });
  }
}
