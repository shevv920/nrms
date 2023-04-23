import Koa from 'koa';
import { inject, injectable } from 'inversify';

import type { IConfig } from '~/Layers/Config';
import type { ILogger } from '~/Layers/Logger';
import { Logger } from '~/Layers/Logger';
import { PublicRoutes } from '~/Layers/Routes';
import type { IMiddlewares } from '~/Layers/Middlewares';
import { PrivateRoutes } from '~/Layers/Routes/private';

export interface IHttpApp {
  start: () => void;
}

@injectable()
export class HttpApp implements IHttpApp {
  private readonly koa: Koa;

  constructor(
    @inject('Config') private readonly config: IConfig,
    @inject(Logger) private readonly logger: ILogger,
    @inject(PublicRoutes) private readonly publicRoutes: PublicRoutes,
    @inject(PrivateRoutes) private readonly privateRoutes: PrivateRoutes,
    @inject('Middlewares') private readonly middlewares: IMiddlewares
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
