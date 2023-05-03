import type { PageLoad } from './$types';

export const load = (async (args) => {
  const data = await fetch(`https://wttr.in/?format=j1`).then(r => r.json());

  return data;
}) satisfies PageLoad;
