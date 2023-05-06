import path from 'path';
import moduleAlias from 'module-alias';
moduleAlias.addPath(path.resolve(__dirname));
moduleAlias.addAlias('~', path.resolve(__dirname))

import { HttpApp } from '~/Layers/App';
import { PrismaDatabase } from '~/Layers/Database';
import { container } from '~/inversify.config';
import type { IDatabase } from '~/Interfaces';

async function main() {
  const app = container.get(HttpApp);
  const db = container.get<IDatabase>(PrismaDatabase);
  await db.connect();
  await app.start();
}

main();
