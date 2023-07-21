import Koa from 'koa';
import type {
  Config,
  HttpApp,
  Logger,
  Middlewares,
} from '~/types';
import type Router from '@koa/router';

export class KoaHttpApp implements HttpApp {
  private readonly koa: Koa;

  constructor(
    private readonly config: Config,
    private readonly logger: Logger,
    private readonly infraMiddlewares: Middlewares,
    private readonly routers: Router[],
  ) {
    this.koa = new Koa();
    this.infraMiddlewares.attach(this.koa);
    this.routers.forEach((router) => {
      this.koa.use(router.routes());
    });
  }

  public use(middleware: Koa.Middleware) {
    this.koa.use(middleware);
  }

  public async start() {
    this.koa.listen(this.config.app.port);
    this.logger.info(`Server started on port ${this.config.app.port}`);
  }
}
