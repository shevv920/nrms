import type Router from '@koa/router';
import type Koa from 'koa';

import { Endpoint } from '~/Interfaces';
import { container } from '~/inversify.config';
import { Auth } from '~/Layers/Auth';

export class SignInRoute extends Endpoint {
  handler = async (ctx: Koa.Context) => {
    const auth = container.get<Auth>(Auth);
    const token = auth.generateToken({
      accountId: '1',
    });
    ctx.body = { token };
  };

  attach = (router: Router) => {
    router.post('/sign-in', this.handler);
  };
}

export default new SignInRoute();
