import type { Either } from 'fp-ts/Either';


export interface AuthHelper<T extends object> {
  generateToken: (payload: T) => string;
  generateRefreshToken: (payload: T) => string;
  verifyToken: (token: string) => Either<string, T>;
}

export interface Payload {
  accountId: string;
}


