import KoaAppRouter from '@koa/router';
import Koa from 'koa';

import { IRoutes } from '~/Layers/Routes';
import { injectable } from 'inversify';

const router = new KoaAppRouter();

router.get('/test', async (ctx) => {
  console.log(ctx.state);
  ctx.status = 200;
  ctx.body = { message: 'test' };
});

@injectable()
export class PrivateRoutes implements IRoutes {
  constructor(private routers: KoaAppRouter[] = [router]) {}

  attach(app: Koa): void {
    this.routers.forEach((router) => {
      app.use(router.routes());
    });
  }
}

export default new PrivateRoutes();
