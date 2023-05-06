import { inject, injectable } from 'inversify';
import { PrismaClient } from '@prisma/client'

import { Logger } from '~/Layers/Logger';
import type { IDatabase, IConfig, ILogger } from '~/Interfaces';

@injectable()
export class PrismaDatabase implements IDatabase {
  public readonly prisma: PrismaClient;
  constructor(
    @inject('Config') private readonly config: IConfig,
    @inject(Logger) private readonly logger: ILogger
  ) {
    this.prisma = new PrismaClient({ errorFormat: 'minimal' });
  }

  public async connect() {
    await this.prisma.$connect();
    this.logger.info('Database connected');
  }
}
