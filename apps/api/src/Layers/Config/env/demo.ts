import { defineConfig, IConfig } from '~/Layers/Config';

export const createDemoConfig = (): IConfig => {
  return defineConfig({
    isDev: false,
    env: 'demo',
    app: {
      secretKey: process.env.SECRET_KEY || '',
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING || '',
      port: 2000,
    },
  });
};
