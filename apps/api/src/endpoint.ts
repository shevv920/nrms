import { Endpoint } from 'shared/protocol/Endpoint';
import { HttpMethod } from 'shared/types';
import { AppKoaContext, AppRouter, AppRouterMiddleware } from '~/types';

export class EndpointServerImplementation<Input, Output> {
  private readonly handler: (input: Input) => Promise<Output>;
  private readonly path: string;
  private readonly method: HttpMethod;
  private readonly middlewares: AppRouterMiddleware[];

  private constructor(path: string, method: HttpMethod, middlewares: AppRouterMiddleware[] = [], handler: (input: Input) => Promise<Output>) {
    this.handler = handler;
    this.path = path;
    this.method = method;
    this.middlewares = middlewares;
  }

  public static fromEndpoint<I, O>(
    endpoint: Endpoint<I, O>,
    handler: (input: I) => Promise<O>,
    middlewares: AppRouterMiddleware[] = [],
  ): EndpointServerImplementation<I, O> {

    return new EndpointServerImplementation<I, O>(endpoint.path, endpoint.method, middlewares, handler);
  }

  public async koaHandler(ctx: AppKoaContext<Input>) {
    const input = ctx.input;
    ctx.body = await this.handler(input);
  }

  public attach(router: AppRouter) {
    router[this.method](this.path, ...this.middlewares, this.koaHandler.bind(this));
  }
}
