import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import type { IConfig } from 'Layers/Config';
import type { ILogger } from 'Layers/Logger';
import { Logger } from 'Layers/Logger';

export interface IDatabase {
  connect: () => void;
}

@injectable()
export class Database implements IDatabase {
  private mongoose: mongoose.Mongoose = mongoose;
  constructor(
    @inject('Config') private readonly config: IConfig,
    @inject(Logger) private readonly logger: ILogger,
  ) {
  }

  public async connect() {
    this.mongoose = await mongoose.connect(this.config.app.mongoConnectionString);
    this.logger.info('Database connected');
  }

  public get mongooseInstance() {
    return this.mongoose;
  }
}
