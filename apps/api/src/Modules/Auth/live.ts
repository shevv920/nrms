import { Config, createConfig } from '~/Modules/Config';
import jwt from 'jsonwebtoken';
import { Either } from 'fp-ts/Either';
import * as E from 'fp-ts/Either';
import { AuthHelper } from '~/Modules/Auth/Auth';
import type { Payload } from '~/Modules/Auth/Auth';

export class Auth implements AuthHelper<Payload> {
  private readonly secretKey: string;

  constructor(
    private readonly config: Config = createConfig(),
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
