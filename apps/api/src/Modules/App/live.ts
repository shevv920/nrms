import Koa from 'koa';
import type { Config } from '~/Modules/Config';
import type { Logger } from '~/Modules/Logger';
import type { HttpApp } from '~/Modules/App/App';
import type { Middlewares } from '~/Modules/Middlewares/live';
import type { PrivateRoutes } from '~/Modules/Routes/private/live';
import type { PublicRoutes } from '~/Modules/Routes/public/live';
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
    this.publicRoutes.attach(this.koa);
    this.middlewares.attachAuth(this.koa);
    this.privateRoutes.attach(this.koa);
  }

  public async start() {
    this.koa.listen(this.config.app.port);
    this.logger.info(`Server started on port ${this.config.app.port}`);
  }
}
