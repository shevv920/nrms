import Koa, { Context, Next } from 'koa';
import * as E from 'fp-ts/Either';
import { injectable } from 'inversify';

import { Auth } from '~/Layers/Auth';
import { container } from '~/inversify.config';
import { AccountModel } from '~/Models/Account/Account.mongoose';


const verifyJwtToken: Koa.Middleware = async (ctx: Context, next: Next) => {
  const { accessToken } = ctx.state;
  if (!accessToken) {
    ctx.throw(401, 'Unauthorized');
  }
  const auth = container.get(Auth);
  const result = auth.verifyToken(accessToken);
  if (E.isLeft(result)) {
    ctx.throw(401, 'Unauthorized');
  }
  ctx.state.jwtPayload = result.right;
  await next();
};

const attachAccount: Koa.Middleware = async (ctx: Context, next: Next) => {
  const { accountId } = ctx.state.jwtPayload;
  ctx.state.account = await AccountModel.findById(accountId);
  await next();
}

const defaultMiddlewares: Array<Koa.Middleware> = [
  verifyJwtToken,
  attachAccount,
];

@injectable()
export class AuthMiddlewares {
  constructor(private readonly middlewares: Koa.Middleware[] = defaultMiddlewares) {
    this.middlewares = middlewares;
  }
  attach(app: Koa) {
    this.middlewares.forEach((middleware) => {
      app.use(middleware);
    });
  }
}
