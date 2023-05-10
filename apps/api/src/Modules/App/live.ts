import Koa from 'koa';
import { Config, createConfig } from '~/Modules/Config';
import { Logger } from '~/Modules/Logger';
import { PublicRoutes } from '~/Modules/Routes/public/live';
import { PrivateRoutes } from '~/Modules/Routes/private/live';
import { HttpApp } from '~/Modules/App/App';
import { Middlewares } from '~/Modules/Middlewares/live';
import { ConsoleLogger } from '~/Modules/Logger/live';

export class KoaHttpApp implements HttpApp {
  private readonly koa: Koa;

  constructor(
    private readonly config: Config = createConfig(),
    private readonly logger: Logger = new ConsoleLogger(config),
    private readonly publicRoutes: PublicRoutes = new PublicRoutes(),
    private readonly privateRoutes: PrivateRoutes = new PrivateRoutes(),
    private readonly middlewares: Middlewares = new Middlewares()
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
