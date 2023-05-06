import jwt from 'jsonwebtoken';
import { inject, injectable } from 'inversify';
import * as E from 'fp-ts/Either';
import type { Either } from 'fp-ts/Either';

import type { IAuth, IConfig, Payload } from "~/Interfaces";

@injectable()
export class Auth implements IAuth<Payload> {
  private readonly secretKey: string;

  constructor(
    @inject('Config') private readonly config: IConfig
  ) {
    this.secretKey = config.app.secretKey;
  }

  generateRefreshToken(payload: Payload): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: '7d'
    });
  }

  generateToken(payload: Payload): string {
    return jwt.sign(payload, this.secretKey, {
      expiresIn: '1h'
    });
  }

  verifyToken(token: string): Either<string, Payload> {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      if (typeof decoded === 'string') {
        return E.left(decoded);
      }
      const casted = decoded as Payload;
      return E.right(casted);
    } catch (err: any) {
      return E.left(err?.message);
    }
  }
}
