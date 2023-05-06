import { defineConfig } from '../Config';
import { IConfig } from "~/Interfaces";

export const createDevelopmentConfig = (): IConfig => {
  return defineConfig({
    isDev: true,
    env: 'development',
    app: {
      secretKey: 'developmentSecretKey',
      mongoConnectionString: 'mongodb://developmentUsername:developmentPassword@localhost:27017/dev-db?authSource=admin',
      port: 2000,
    },
  });
};
