export * from './public';
import type Koa from 'koa';

export interface Routes {
  attach(app: Koa): void;
}
