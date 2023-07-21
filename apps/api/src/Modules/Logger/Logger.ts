import 'reflect-metadata';

export interface Logger {
  info(message: string, meta?: never): void;
  debug(message: string, meta?: never): void;
  warn(message: string, meta?: never): void;
  error(message: string, meta?: never): void;
}
