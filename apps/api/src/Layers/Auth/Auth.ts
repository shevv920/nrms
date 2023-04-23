import jwt from 'jsonwebtoken';
import type { IConfig } from 'Layers/Config';
import { inject } from 'inversify';
import * as E from 'fp-ts/Either';
import type { Either } from 'fp-ts/Either';


export interface IAuth<T extends object> {
  generateToken: (payload: T) => string;
  generateRefreshToken: (payload: T) => string;
  verifyToken: (token: string) => Either<string, T>;
}

interface Payload {
  accountId: string;
  exp: number;
}

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
