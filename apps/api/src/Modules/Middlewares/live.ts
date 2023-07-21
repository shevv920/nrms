import requestLogger from 'koa-logger';
import Koa from 'koa';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import bodyParser from 'koa-bodyparser';

import { Logger, Middlewares, Config } from '~/types';
import { errorHandler } from '~/Modules/Middlewares/error-handler';


export class InfraMiddlewares implements Middlewares {
  private readonly errorHandler: Koa.Middleware;
  private readonly corsMiddleware: Koa.Middleware;
  private readonly bodyParserMiddleware: Koa.Middleware;
  private readonly helmetMiddleware: Koa.Middleware;
  private readonly requestLoggerMiddleware: Koa.Middleware;

  constructor(
    private readonly logger: Logger,
    private readonly config: Config,
  ) {
    this.corsMiddleware = cors({ credentials: true });
    this.bodyParserMiddleware = bodyParser();
    this.helmetMiddleware = helmet();
    this.requestLoggerMiddleware = requestLogger();
    this.errorHandler = errorHandler(logger, config);
  }

  attach(app: Koa) {
    app.use(this.corsMiddleware);
    app.use(this.helmetMiddleware);
    app.use(this.bodyParserMiddleware);
    app.use(this.errorHandler);
    app.use(this.requestLoggerMiddleware);
  }
}
