import 'reflect-metadata';
import { Container } from 'inversify';

import { HttpApp } from '~/Layers/App';
import { createConfig } from '~/Layers/Config';
import { Logger } from '~/Layers/Logger';
import { Middlewares } from '~/Layers/Middlewares';
import { InfraMiddlewares } from '~/Layers/Middlewares/infra/infra';
import { PrismaDatabase } from '~/Layers/Database';
import { Auth } from '~/Layers/Auth';
import { AuthMiddlewares } from '~/Layers/Middlewares/auth';
import { IAppMiddlewares, IConfig, IDatabase, ILogger } from "~/Interfaces";
import { AccountResource } from '~/Resources/Account';

export const container = new Container();

container.bind<ILogger>(Logger).toSelf().inSingletonScope();
container.bind<IConfig>('Config').toConstantValue(createConfig());
container
  .bind<InfraMiddlewares>(InfraMiddlewares)
  .toSelf()
  .inSingletonScope();
container.bind<IAppMiddlewares>('Middlewares').to(Middlewares).inSingletonScope();
container.bind<HttpApp>(HttpApp).toSelf().inSingletonScope();
container.bind<Auth>(Auth).toSelf().inSingletonScope();
container.bind<AuthMiddlewares>(AuthMiddlewares).toSelf().inSingletonScope();
container.bind<IDatabase>(PrismaDatabase).toSelf().inSingletonScope();
container.bind<AccountResource>('AccountResource').to(AccountResource).inSingletonScope();
