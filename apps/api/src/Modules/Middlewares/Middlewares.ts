import Koa from 'koa';


export interface IMiddlewares {
  attachInfra: (app: Koa) => void;
  attachAuth: (app: Koa) => void;
}
