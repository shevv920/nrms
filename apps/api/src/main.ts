import { HttpApp } from 'Layers/App';
import { Database } from 'Layers/Database';
import { container } from 'inversify.config';

async function main() {
  const app = container.get(HttpApp);
  const db = container.get<Database>('Database');
  await db.connect();
  await app.start();
}

await main();
