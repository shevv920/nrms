import { configSchema, IConfig } from "~/Interfaces";

import {
  createDemoConfig,
  createDevelopmentConfig,
  createProductionConfig,
  createStagingConfig,
} from './env';

export const defineConfig = (config: IConfig): IConfig => {
  return configSchema.parse(config);
};

export const createConfig: () => IConfig = () => {
  const env = process.env.APP_ENV;

  switch (env) {
    case 'development':
      return createDevelopmentConfig();
    case 'staging':
      return createStagingConfig();
    case 'demo':
      return createDemoConfig();
    case 'production':
      return createProductionConfig();
    default:
      throw new Error(`Unknown environment: ${env}`);
  }
};
