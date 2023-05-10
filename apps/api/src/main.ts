import path from 'path';
import moduleAlias from 'module-alias';
moduleAlias.addPath(path.resolve(__dirname));
moduleAlias.addAlias('~', path.resolve(__dirname))

import liveModules from '~/Modules/live.modules';

async function main() {
  liveModules.db.connect();
  await liveModules.httpApp.start();
}

main();
