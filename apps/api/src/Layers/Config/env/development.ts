import { defineConfig, IConfig } from '../Config';

export const createDevelopmentConfig = (): IConfig => {
  return defineConfig({
    isDev: true,
    env: "development",
    app: {
      mongoConnectionString: 'mongodb://developmentUsername:developmentPassword@localhost:27017/dev-db?authSource=admin',
      port: 2000,
    },
  });
};
