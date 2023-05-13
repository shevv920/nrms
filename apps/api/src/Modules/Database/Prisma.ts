import { PrismaClient } from '@prisma/client'

import type { Config, Logger } from '~/types';
import { ConsoleLogger } from '~/Modules/Logger/live';
import { Database } from '~/Modules/Database/Database';
import { createConfig } from '~/Modules/Config';
import configLive from '~/Modules/Config/live';

export class PrismaDatabase implements Database {
  public readonly prisma: PrismaClient;
  constructor(
    private readonly config: Config = createConfig(),
    private readonly logger: Logger = new ConsoleLogger(configLive)
  ) {
    this.prisma = new PrismaClient();
  }

  public async connect() {
    await this.prisma.$connect();
    this.logger.info('Database connected');
  }
}
