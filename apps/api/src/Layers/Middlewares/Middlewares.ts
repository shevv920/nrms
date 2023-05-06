import Koa from 'koa';
import { inject, injectable } from 'inversify';

import { IAppMiddlewares } from "~/Interfaces";

import { InfraMiddlewares } from './infra';

@injectable()
export class Middlewares implements IAppMiddlewares {
  constructor(
    @inject(InfraMiddlewares) private readonly infra: InfraMiddlewares,
  ) {}

  public attach(app: Koa) {
    this.infra.attach(app);
  }
}
