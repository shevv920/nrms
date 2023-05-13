import Koa from 'koa';
import { Config, HttpApp, Logger, PublicRoutes, PrivateRoutes, Middlewares } from '~/types';
import liveModules from '~/Modules/live.modules';

export class KoaHttpApp implements HttpApp {
  private readonly koa: Koa;

  constructor(
    private readonly config: Config = liveModules.config,
    private readonly logger: Logger = liveModules.logger,
    private readonly publicRoutes: PublicRoutes = liveModules.publicRoutes,
    private readonly privateRoutes: PrivateRoutes = liveModules.privateRoutes,
    private readonly middlewares: Middlewares = liveModules.middlewares,
  ) {
    this.koa = new Koa();
    this.middlewares.attachInfra(this.koa);
  }

  public async start() {
    this.koa.listen(this.config.app.port);
    this.logger.info(`Server started on port ${this.config.app.port}`);
  }
}
