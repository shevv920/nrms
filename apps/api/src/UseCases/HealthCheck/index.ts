import { healthCheck } from './endpoints/get';
import Router from '@koa/router';

export const endpoints = [
  healthCheck,
];

export const router = new Router();

for (const endpoint of endpoints) {
  // @ts-ignore
  endpoint.attach(router);
}
