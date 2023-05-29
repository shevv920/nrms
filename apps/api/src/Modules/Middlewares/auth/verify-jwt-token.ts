import Koa, { Context, Next } from 'koa';
import * as E from 'fp-ts/Either';
import type { AuthHelper, PrismaDatabase } from '~/types';

export class AuthMiddlewares {
  private attachToken = async (ctx: Context, next: Next) => {
    const { authorization } = ctx.headers;
    const accessToken = authorization?.replace('Bearer', '').trim();

    if (accessToken) {
      ctx.state.accessToken = accessToken;
    }

    await next();
  };

  private verifyJwtToken: Koa.Middleware = async (ctx: Context, next: Next) => {
    const { accessToken } = ctx.state;
    if (!accessToken) {
      ctx.throw(401, 'Unauthorized');
    }
    const result = this.auth.verifyToken(accessToken);
    if (E.isLeft(result)) {
      ctx.throw(401, 'Unauthorized');
    }
    ctx.state.jwtPayload = result.right;
    await next();
  };

  private attachAccount: Koa.Middleware = async (ctx: Context, next: Next) => {
    const { accountId } = ctx.state.jwtPayload;

    ctx.state.account = await this.db.prisma.accounts.findFirst({ where: { id: accountId } });
    await next();
  };

  constructor(
    private readonly auth: AuthHelper<any>,
    private readonly db: PrismaDatabase
  ) {

  }

  attach(app: Koa) {
    app.use(this.attachToken);
    app.use(this.verifyJwtToken);
    app.use(this.attachAccount);
  }
}
