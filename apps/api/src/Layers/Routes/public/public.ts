import KoaAppRouter from "@koa/router";
import { IRoutes } from "Layers/Routes";
import Koa from "koa";

const healthCheckRouter = new KoaAppRouter();

healthCheckRouter.get("/health", (ctx) => {
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
