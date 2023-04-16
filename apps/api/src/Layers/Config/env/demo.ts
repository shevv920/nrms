import { defineConfig, IConfig } from '../Config';

export const createDemoConfig = (): IConfig => {
  return defineConfig({
    isDev: false,
    env: 'demo',
    app: {
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING!,
      port: 2000,
    },
  });
};
