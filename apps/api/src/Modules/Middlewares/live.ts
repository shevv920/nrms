import Koa from 'koa';
import { InfraMiddlewares } from '~/Modules/Middlewares/infra';
import { IMiddlewares } from '~/Modules/Middlewares/Middlewares';

export class Middlewares implements IMiddlewares {
  constructor(
    private readonly infra: InfraMiddlewares = new InfraMiddlewares(),
  ) {}

  public attachInfra(app: Koa) {
    this.infra.attach(app);
  }
}
