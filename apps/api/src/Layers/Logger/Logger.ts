import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import winston from 'winston';

import type { IConfig } from '~/Layers/Config';

export interface ILogger {
  info(message: string, meta?: never): void;

  debug(message: string, meta?: never): void;

  warn(message: string, meta?: never): void;

  error(message: string, meta?: never): void;
}

const formatToPrettyJson = winston.format.printf((info) => {
  if (
    typeof info.message.constructor === 'object' ||
    typeof info.message.constructor === 'function'
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
  const transports = [
    new winston.transports.Console({
      level: config.isDev ? 'debug' : 'info',
      stderrLevels: ['emerg', 'alert', 'crit', 'error']
    })
  ];

  return winston.createLogger({
    exitOnError: false,
    transports,
    format: getFormat(config.isDev)
  });
};

@injectable()
export class Logger implements ILogger {
  private logger: winston.Logger;

  constructor(@inject('Config') config: IConfig) {
    this.logger = winstonLoggerFactory(config);
  }

  debug(message: string, meta?: never[]): void {
    this.logger.debug(message, meta);
  }

  error(message: string, meta?: never[]): void {
    this.logger.error(message, meta);
  }

  info(message: string, meta?: never[]): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: never[]): void {
    this.logger.warn(message, meta);
  }
}
