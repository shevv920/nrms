import 'reflect-metadata';
import { Container } from 'inversify';

import { HttpApp } from 'Layers/App';
import { createConfig, IConfig } from 'Layers/Config';
import { ILogger, Logger } from 'Layers/Logger';
import { Routes } from 'Layers/Routes';
import { Middlewares } from 'Layers/Middlewares';
import type { IMiddlewares } from 'Layers/Middlewares';
import { InfraMiddlewares } from 'Layers/Middlewares/infra/infra';
import { Database } from 'Layers/Database';
import type { IDatabase } from 'Layers/Database';

export const container = new Container();

container.bind<ILogger>(Logger).toSelf().inSingletonScope();
container.bind<IConfig>('Config').toConstantValue(createConfig());
container
  .bind<InfraMiddlewares>('InfraMiddlewares')
  .to(InfraMiddlewares)
  .inSingletonScope();
container.bind<IMiddlewares>('Middlewares').to(Middlewares).inSingletonScope();
container.bind<HttpApp>(HttpApp).toSelf().inSingletonScope();
container.bind(Routes).toSelf().inSingletonScope();
container.bind<IDatabase>('Database').to(Database).inSingletonScope();
