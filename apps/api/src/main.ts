import path from 'path';
import moduleAlias from 'module-alias';
moduleAlias.addPath(path.resolve(__dirname));
moduleAlias.addAlias('~', path.resolve(__dirname))
import { HttpApp } from '~/Layers/App';
import { IDatabase } from '~/Layers/Database';
import { PrismaDatabase } from '~/Layers/Database';
import { container } from '~/inversify.config';

async function main() {
  const app = container.get(HttpApp);
  const db = container.get<IDatabase>(PrismaDatabase);
  db.connect();
  await app.start();
}

main();
