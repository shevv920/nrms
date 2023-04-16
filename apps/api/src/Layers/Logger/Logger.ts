import { inject, injectable } from "inversify";
import "reflect-metadata";
import winston from "winston";

import type { IConfig } from "Layers/Config";

export interface ILogger {
  info(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, meta?: any): void;
}

const formatToPrettyJson = winston.format.printf((info) => {
  if (
    typeof info.message.constructor === "object" ||
    typeof info.message.constructor === "function"
  ) {
    info.message = JSON.stringify(info.message, null, 2);
  }

  return `${info.level}: ${info.message}`;
});

const getFormat = (isDev: boolean) => {
  if (isDev) {
    return winston.format.combine(
      winston.format.colorize(),
      winston.format.splat(),
      winston.format.simple(),
      formatToPrettyJson
    );
  }

  return winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.json()
  );
};

const winstonLoggerFactory = (config: IConfig) => {
  const transports: any[] = [
    new winston.transports.Console({
      level: config.isDev ? "debug" : "info",
      stderrLevels: ["emerg", "alert", "crit", "error"],
    }),
  ];

  return winston.createLogger({
    exitOnError: false,
    transports,
    format: getFormat(config.isDev),
  });
};

@injectable()
export class Logger implements ILogger {
  private logger: winston.Logger;

  constructor(@inject("Config") config: IConfig) {
    this.logger = winstonLoggerFactory(config);
  }

  debug(message: string, meta?: any[]): void {
    this.logger.debug(message);
  }

  error(message: string, meta?: any[]): void {
    this.logger.error(message);
  }

  info(message: string, meta?: any[]): void {
    this.logger.info(message);
  }

  warn(message: string, meta?: any[]): void {
    this.logger.warn(message);
  }
}
