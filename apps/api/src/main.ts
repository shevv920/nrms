import path from 'path';
import moduleAlias from 'module-alias';
moduleAlias.addPath(path.resolve(__dirname));
moduleAlias.addAlias('~', path.resolve(__dirname))
import { PrismaDatabase } from '~/Modules/Database/Prisma';
import { KoaHttpApp } from '~/Modules/App/live';

async function main() {
  const app = new KoaHttpApp();
  const db = new PrismaDatabase();
  db.connect();
  await app.start();
}

main();
