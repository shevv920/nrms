import Koa, { Next, ParameterizedContext } from 'koa';
import Router from '@koa/router';

export type { Config } from '~/Modules/Config';
export type { Logger } from '~/Modules/Logger';
export type { HttpApp } from '~/Modules/App/App';
export type { Middlewares } from '~/Modules/Middlewares';
export type { AuthHelper } from '~/Modules/Auth/Auth';
export type { PrismaDatabase } from '~/Modules/Database/Prisma';

export interface DefaultState {

}

export interface AppKoaContext<State = DefaultState> extends ParameterizedContext<State> {
  state: DefaultState & State;
}

export type AppKoaNext = Next;
export class AppRouter extends Router<DefaultState, AppKoaContext> {}
export type AppRouterMiddleware = Router.Middleware;
export type HttpAppMiddleware = (app: Koa) => void;
