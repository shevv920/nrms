import type { LayoutLoad } from './$types';

export const load = (async (args) => {
  const data = await fetch('http://localhost:3000').then(r => r.text());

  return { data };
}) satisfies LayoutLoad;
