import { defineConfig, IConfig } from '../Config';

export const createStagingConfig = (): IConfig => {
  return defineConfig({
    isDev: false,
    env: "staging",
    app: {
      mongoConnectionString: process.env.MONGO_CONNECTION_STRING!,
      port: 2000,
    },
  });
};
