import z from 'zod';
import mount from 'koa-mount';
import Koa from 'koa';
import Router from '@koa/router';
import { inject, injectable } from 'inversify';
import compose from 'koa-compose';

import { BaseResource } from '~/Interfaces';
import { baseResourceZodSchema } from '~/Resources/base';
import { AuthMiddlewares } from '~/Layers/Middlewares/auth';
import publicEndpoints from '~/Resources/Account/public';


const accountSchema = baseResourceZodSchema.extend({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email()
});

export type Account = z.infer<typeof accountSchema>;

@injectable()
export class AccountResource extends BaseResource<'accounts', Account> {
  readonly root: 'accounts' = 'accounts';

  constructor(@inject(AuthMiddlewares) private readonly authMiddlewares: AuthMiddlewares) {
    super();
  }

  public publicRoutes(): Router.Middleware {
    const router = new Router();

    publicEndpoints.forEach((endpoint) => endpoint.attach(router));

    return router.routes();
  }

  public protectedRoutes(): Router.Middleware {
    const router = new Router();

    router.get('/', async (ctx) => {
      ctx.body = await ctx.state.account;
    });

    return router.routes();
  }

  mount(app: Koa): void {
    app.use(mount(`/${this.root}`, this.publicRoutes()));
    const protectedRoutes = compose([this.authMiddlewares.composed, this.protectedRoutes()]);
    app.use(mount(`/${this.root}`, protectedRoutes));
  }
}
