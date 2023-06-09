import Koa from 'koa';
import { injectable } from 'inversify';

import { publicRoutes } from './public';

export interface IRoutes {
  attach: (app: Koa) => void;
}

@injectable()
export class PublicRoutes implements IRoutes {
  public attach(app: Koa) {
    publicRoutes.attach(app);
  }
}
