import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client'

import type { IConfig } from '~/Layers/Config';
import type { ILogger } from '~/Layers/Logger';
import { Logger } from '~/Layers/Logger';
import { IDatabase } from '~/Layers/Database/Database';

@injectable()
export class PrismaDatabase implements IDatabase {
  public readonly prisma: PrismaClient;
  constructor(
    @inject('Config') private readonly config: IConfig,
    @inject(Logger) private readonly logger: ILogger
  ) {
    this.prisma = new PrismaClient();
  }

  public async connect() {
    await this.prisma.$connect();
    this.logger.info('Database connected');
  }
}
