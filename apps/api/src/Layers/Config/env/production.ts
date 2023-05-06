import { defineConfig } from '../Config';
import { IConfig } from "~/Interfaces";

export const createProductionConfig = (): IConfig => {
  return defineConfig({
    isDev: false,
    env: 'production',
    app: {
      secretKey: process.env.SECRET_KEY || '',
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING || '',
      port: 2000,
    },
  });
};
