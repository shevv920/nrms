import Koa from 'koa';
import { inject, injectable } from 'inversify';

import { Logger } from '~/Layers/Logger';
import type { IAppMiddlewares, IConfig, ILogger } from "~/Interfaces";
import { Middlewares } from "~/Layers/Middlewares";
import { IHttpApp } from "~/Interfaces";
import { AccountResource } from '~/Resources/Account';
import type { Server } from 'http';

@injectable()
export class HttpApp implements IHttpApp {
  private readonly koa: Koa;
  private server: Server | null = null;

  constructor(
    @inject('Config') private readonly config: IConfig,
    @inject(Logger) private readonly logger: ILogger,
    @inject('Middlewares') private readonly middlewares: IAppMiddlewares,
    @inject('AccountResource') private readonly accountResource: AccountResource,
  ) {
    this.koa = new Koa();
    this.middlewares.attach(this.koa);
    this.accountResource.mount(this.koa);
  }

  public async start() {
    this.server = this.koa.listen(this.config.app.port);

    this.logger.info(`Server listening on: ${this.config.app.port}`);
  }
}
