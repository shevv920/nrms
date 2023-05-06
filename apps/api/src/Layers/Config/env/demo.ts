import { defineConfig } from '~/Layers/Config';
import { IConfig } from "~/Interfaces";

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
