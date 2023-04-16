import z from 'zod';

import {
  createDemoConfig,
  createDevelopmentConfig,
  createProductionConfig,
  createStagingConfig,
} from './env';

const configSchema = z.object({
  env: z.enum(['development', 'staging', 'demo', 'production']),
  isDev: z.boolean(),
  app: z.object({
    mongoConnectionString: z.string().min(1),
    port: z.number(),
  }),
});

export type IConfig = z.infer<typeof configSchema>;

export const defineConfig = (config: IConfig): IConfig => {
  return configSchema.parse(config);
};

export const createConfig: () => IConfig = () => {
  const env = process.env.NODE_ENV;

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
