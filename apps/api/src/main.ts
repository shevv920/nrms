import path from 'path';
import moduleAlias from 'module-alias';
moduleAlias.addPath(path.resolve(__dirname));
moduleAlias.addAlias('~', path.resolve(__dirname))
import { HttpApp } from '~/Layers/App';
import { Database } from '~/Layers/Database';
import { container } from '~/inversify.config';

async function main() {
  const app = container.get(HttpApp);
  const db = container.get<Database>('Database');
  db.connect();
  await app.start();
}

main();
