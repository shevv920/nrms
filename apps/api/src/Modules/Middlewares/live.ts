import Koa from 'koa';
import { InfraMiddlewares } from '~/Modules/Middlewares/infra';
import { AuthMiddlewares } from '~/Modules/Middlewares/auth';
import { IMiddlewares } from '~/Modules/Middlewares/Middlewares';

export class Middlewares implements IMiddlewares {
  constructor(
    private readonly infra: InfraMiddlewares = new InfraMiddlewares(),
    private readonly auth: AuthMiddlewares = new AuthMiddlewares(),
  ) {}

  public attachInfra(app: Koa) {
    this.infra.attach(app);
  }

  public attachAuth(app: Koa) {
    this.auth.attach(app);
  }
}
