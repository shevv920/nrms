import Koa from 'koa';

import { Config } from '~/Modules/Config';
import { Logger } from '~/Modules/Logger';
import { PublicRoutes } from '~/Modules/Routes';
import { PrivateRoutes } from '~/Modules/Routes/private';

export interface HttpApp {
  start: () => void;
}

