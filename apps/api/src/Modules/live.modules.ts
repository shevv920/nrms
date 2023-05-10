import { ConsoleLogger} from '~/Modules/Logger/live';
import config from '~/Modules/Config/live';
import { KoaHttpApp } from '~/Modules/App/live';
import { PrismaDatabase } from '~/Modules/Database/Prisma';
import { Middlewares } from '~/Modules/Middlewares/live';


export default {
  config,
  logger: new ConsoleLogger(config),
  httpApp: new KoaHttpApp(),
  db: new PrismaDatabase(),
  middlewares: new Middlewares(),
}
