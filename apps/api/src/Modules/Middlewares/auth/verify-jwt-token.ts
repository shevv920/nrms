import Koa, { Context, Next } from 'koa';
import * as E from 'fp-ts/Either';

import { Auth } from '~/Modules/Auth/live';
import { PrismaDatabase } from '~/Modules/Database/Prisma';

const verifyJwtToken: Koa.Middleware = async (ctx: Context, next: Next) => {
  const { accessToken } = ctx.state;
  if (!accessToken) {
    ctx.throw(401, 'Unauthorized');
  }
  const auth = new Auth();
  const result = auth.verifyToken(accessToken);
  if (E.isLeft(result)) {
    ctx.throw(401, 'Unauthorized');
  }
  ctx.state.jwtPayload = result.right;
  await next();
};

const attachAccount: Koa.Middleware = async (ctx: Context, next: Next) => {
  const { accountId } = ctx.state.jwtPayload;
  const db = new PrismaDatabase();
  ctx.state.account = await db.prisma.accounts.findFirst({ where: { id: accountId } });
  await next();
};

const defaultMiddlewares: Array<Koa.Middleware> = [
  verifyJwtToken,
  attachAccount,
];

export class AuthMiddlewares {
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
