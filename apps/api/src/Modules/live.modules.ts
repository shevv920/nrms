import { ConsoleLogger} from '~/Modules/Logger/live';
import { createConfig } from '~/Modules/Config';
import { PrismaDatabase } from '~/Modules/Database/Prisma';
import { InfraMiddlewares } from '~/Modules/Middlewares/live';

const config = createConfig();
const logger = new ConsoleLogger(config);
const infraMiddlewares = new InfraMiddlewares();
const db = new PrismaDatabase(config, logger);

export default {
  config,
  logger,
  db,
  infraMiddlewares,
};
