import Koa from 'koa';

export interface Middlewares {
  attach: (app: Koa) => void;
}
