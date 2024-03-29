import test from 'ava';
import { Auth } from '~/Modules/Auth/live';
import { Config } from '~/Modules/Config';
import * as E from 'fp-ts/Either';

test('Test Auth token generate', async (ec) => {
  const auth = new Auth({ app: { secretKey: 'secretKey' } } as Config);
  const payload = { accountId: 'id' };

  const token = auth.generateToken(payload);
  const decoded = auth.verifyToken(token);
  ec.assert(decoded._tag === 'Right');
  if (E.isRight(decoded)) {
    ec.assert(decoded.right.accountId === payload.accountId);
  }
});
