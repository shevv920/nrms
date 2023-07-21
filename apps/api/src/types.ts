import Koa, { DefaultContextExtends, DefaultState, Next, ParameterizedContext } from 'koa';
import Router from '@koa/router';

export type { Config } from '~/Modules/Config';
export type { Logger } from '~/Modules/Logger';
export type { HttpApp } from '~/Modules/App/App';
export type { Middlewares } from '~/Modules/Middlewares';
export type { AuthHelper } from '~/Modules/Auth/Auth';
export type { PrismaDatabase } from '~/Modules/Database/Prisma';

export interface AppKoaContext<State = DefaultState> extends ParameterizedContext<State> {
  state: DefaultState & State;
}

export type AppKoaNext = Next;
export interface AppRouterContext<T extends object> extends DefaultContextExtends {
  params: T;
}

export class AppRouter<State = DefaultState, Context = AppRouterContext<object>> extends Router<State, Context> {}

export type AppRouterMiddleware = Router.Middleware;
export type HttpAppMiddleware = (app: Koa) => void;
