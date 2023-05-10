import { defineConfig, Config } from '~/Modules/Config';

export const createDemoConfig = (): Config => {
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
