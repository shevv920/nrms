import { Routes } from '~/Modules/Routes';
import KoaAppRouter from '@koa/router';
import Koa from 'koa';

const router = new KoaAppRouter();

router.get('/test', async (ctx) => {
  console.log(ctx.state);
  ctx.status = 200;
  ctx.body = { message: 'test' };
});


export class PrivateRoutes implements Routes {
  constructor(private routers: KoaAppRouter[] = [router]) {}

  attach(app: Koa): void {
    this.routers.forEach((router) => {
      app.use(router.routes());
    });
  }
}

export default new PrivateRoutes();
