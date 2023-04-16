import Koa from "koa";
import { inject, injectable } from "inversify";

import { InfraMiddlewares } from "./infra";

export interface IMiddlewares {
  attach: (app: Koa) => void;
}

@injectable()
export class Middlewares implements IMiddlewares {
  constructor(
    @inject("InfraMiddlewares") private readonly middlewares: InfraMiddlewares
  ) {}

  public attach(app: Koa) {
    this.middlewares.attach(app);
  }
}
