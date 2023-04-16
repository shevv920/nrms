import { defineConfig, IConfig } from '../Config';

export const createProductionConfig = (): IConfig => {
  return defineConfig({
    isDev: false,
    env: 'production',
    app: {
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING || '',
      port: 2000,
    },
  });
};
