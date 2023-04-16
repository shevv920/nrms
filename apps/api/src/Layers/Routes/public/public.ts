import KoaAppRouter from '@koa/router';
import Koa from 'koa';

import { IRoutes } from '~/Layers/Routes';

const healthCheckRouter = new KoaAppRouter();

healthCheckRouter.get('/health', (ctx) => {
  ctx.status = 200;
});

export class PublicRoutes implements IRoutes {
  constructor(private routers: KoaAppRouter[] = [healthCheckRouter]) {}

  attach(app: Koa): void {
    this.routers.forEach((router) => {
      app.use(router.routes());
    });
  }
}

export default new PublicRoutes();
