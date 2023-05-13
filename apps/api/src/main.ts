import path from 'path';
import moduleAlias from 'module-alias';
moduleAlias.addPath(path.resolve(__dirname));
moduleAlias.addAlias('~', path.resolve(__dirname))

import liveModules from '~/Modules/live.modules';
import { KoaHttpApp } from '~/Modules/App/live';

async function main() {
  const httpApp = new KoaHttpApp();
  await liveModules.db.connect();
  await httpApp.start();
}

main();
