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
    secretKey: z.string().min(16),
    mongoConnectionString: z.string().min(1),
    port: z.number(),
  }),
});

export type Config = z.infer<typeof configSchema>;

export const defineConfig = (config: Config): Config => {
  return configSchema.parse(config);
};

export const createConfig: () => Config = () => {
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
