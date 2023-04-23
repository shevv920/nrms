import Koa from 'koa';
import { inject, injectable } from 'inversify';

import { InfraMiddlewares } from './infra';
import { AuthMiddlewares} from './auth';

export interface IMiddlewares {
  attachInfra: (app: Koa) => void;
  attachAuth: (app: Koa) => void;
}

@injectable()
export class Middlewares implements IMiddlewares {
  constructor(
    @inject('InfraMiddlewares') private readonly infra: InfraMiddlewares,
    @inject(AuthMiddlewares) private readonly auth: AuthMiddlewares
  ) {}

  public attachInfra(app: Koa) {
    this.infra.attach(app);
  }

  public attachAuth(app: Koa) {
    this.auth.attach(app);
  }
}
