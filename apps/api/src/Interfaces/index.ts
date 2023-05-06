import Router from '@koa/router';
import { Either } from "fp-ts/Either";
import z from "zod";
import type Koa from "koa";
import { injectable } from 'inversify';

export interface IHttpApp {
  start: () => void;
}

export interface IAuth<T extends object> {
  generateToken: (payload: T) => string;
  generateRefreshToken: (payload: T) => string;
  verifyToken: (token: string) => Either<string, T>;
}

export interface Payload {
  accountId: string;
}

export const configSchema = z.object({
  env: z.enum(["development", "staging", "demo", "production"]),
  isDev: z.boolean(),
  app: z.object({
    secretKey: z.string().min(16),
    mongoConnectionString: z.string().min(1),
    port: z.number()
  })
});

export type IConfig = z.infer<typeof configSchema>;

export interface IDatabase {
  connect: () => Promise<void>;
}

export interface ILogger {
  info(message: string, meta?: never): void;
  debug(message: string, meta?: never): void;
  warn(message: string, meta?: never): void;
  error(message: string, meta?: never): void;
}

export interface IAppMiddlewares {
  attach: (app: Koa) => void;
}

@injectable()
export abstract class BaseResource<Root extends string, T> {
  abstract readonly root: Root;
  abstract mount(app: Koa): void;
}

export abstract class Endpoint {
  abstract handler: (ctx: Koa.Context, next?: Koa.Next) => Promise<void>;
  abstract attach: (router: Router) => void;
}
