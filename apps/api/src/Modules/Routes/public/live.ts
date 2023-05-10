import type Koa from 'koa';
import KoaAppRouter from '@koa/router';

import { Routes } from '~/Modules/Routes';


const healthCheckRouter = new KoaAppRouter();

healthCheckRouter.get('/health', (ctx) => {
  ctx.status = 200;
});

export class PublicRoutes implements Routes {
  constructor(private routers: KoaAppRouter[] = [healthCheckRouter]) {}

  attach(app: Koa): void {
    this.routers.forEach((router) => {
      app.use(router.routes());
    });
  }
}
