import { ConsoleLogger} from '~/Modules/Logger/live';
import config from '~/Modules/Config/live';
import { PrismaDatabase } from '~/Modules/Database/Prisma';
import { Middlewares } from '~/Modules/Middlewares/live';
import { PublicRoutes } from '~/Modules/Routes/public/live';
import { PrivateRoutes } from '~/Modules/Routes/private/live';

export default {
  config,
  logger: new ConsoleLogger(config),
  db: new PrismaDatabase(),
  middlewares: new Middlewares(),
  publicRoutes: new PublicRoutes(),
  privateRoutes: new PrivateRoutes(),
};
