import { PrismaClient } from '@prisma/client'

import type { Config, Logger } from '~/types';
import { Database } from '~/Modules/Database/Database';

export class PrismaDatabase implements Database {
  public readonly prisma: PrismaClient;
  constructor(
    private readonly config: Config,
    private readonly logger: Logger
  ) {
    this.prisma = new PrismaClient();
  }

  public async connect() {
    await this.prisma.$connect();
    this.logger.info('Database connected');
  }
}
