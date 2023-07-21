import { defineConfig, Config } from '../Config';

export const createStagingConfig = (): Config => {
  return defineConfig({
    isDev: false,
    env: 'staging',
    app: {
      secretKey: process.env.SECRET_KEY || '',
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING || '',
      port: 2000,
    },
  });
};
