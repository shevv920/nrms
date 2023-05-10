import winston from 'winston';
import { Config } from '~/Modules/Config';
import { Logger } from '~/Modules/Logger/Logger';
import configLive from '~/Modules/Config/live';

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

const winstonLoggerFactory = (config: Config) => {
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

export class ConsoleLogger implements Logger {
  private logger: winston.Logger;

  constructor(config: Config = configLive) {
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
