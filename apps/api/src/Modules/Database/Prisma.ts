import { PrismaClient } from '@prisma/client'

import type { Config } from '~/Modules/Config';
import type { Logger } from '~/Modules/Logger';
import { ConsoleLogger } from '~/Modules/Logger/live';
import { IDatabase } from '~/Modules/Database/Database';
import { createConfig } from '~/Modules/Config';

export class PrismaDatabase implements IDatabase {
  public readonly prisma: PrismaClient;
  constructor(
    private readonly config: Config = createConfig(),
    private readonly logger: Logger = new ConsoleLogger(config)
  ) {
    this.prisma = new PrismaClient();
  }

  public async connect() {
    await this.prisma.$connect();
    this.logger.info('Database connected');
  }
}
