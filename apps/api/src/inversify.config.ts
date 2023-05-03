import 'reflect-metadata';
import { Container } from 'inversify';

import { HttpApp } from '~/Layers/App';
import { createConfig, IConfig } from '~/Layers/Config';
import { ILogger, Logger } from '~/Layers/Logger';
import { PublicRoutes } from '~/Layers/Routes';
import { Middlewares } from '~/Layers/Middlewares';
import type { IMiddlewares } from '~/Layers/Middlewares';
import { InfraMiddlewares } from '~/Layers/Middlewares/infra/infra';
import { PrismaDatabase } from '~/Layers/Database';
import type { IDatabase } from '~/Layers/Database';
import { Auth } from '~/Layers/Auth';
import { AuthMiddlewares } from '~/Layers/Middlewares/auth';
import { PrivateRoutes } from '~/Layers/Routes/private';

export const container = new Container();

container.bind<ILogger>(Logger).toSelf().inSingletonScope();
container.bind<IConfig>('Config').toConstantValue(createConfig());
container
  .bind<InfraMiddlewares>('InfraMiddlewares')
  .to(InfraMiddlewares)
  .inSingletonScope();
container.bind<IMiddlewares>('Middlewares').to(Middlewares).inSingletonScope();
container.bind<HttpApp>(HttpApp).toSelf().inSingletonScope();
container.bind(PublicRoutes).toSelf().inSingletonScope();
container.bind<Auth>(Auth).toSelf().inSingletonScope();
container.bind<AuthMiddlewares>(AuthMiddlewares).toSelf().inSingletonScope();
container.bind(PrivateRoutes).toSelf().inSingletonScope();
container.bind<IDatabase>(PrismaDatabase).toSelf().inSingletonScope();
