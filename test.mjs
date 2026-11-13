import fs from 'node:fs';
const body = fs.readFileSync(new URL('./modules/lyrics.js', import.meta.url), 'utf8');
const mod = new Function('AsyncStorage', body)(new Map());
const tracks = [
  { title: 'Instant Crush', artist: 'Daft Punk', duration: 337 },
  { title: 'Runaway', artist: 'Kanye West', duration: 548 },
  { title: 'Blinding Lights', artist: 'The Weeknd', duration: 200 },
];
for (const t of tracks) for (const mode of ['best', 'all', 'manual']) {
  const t0 = Date.now();
  const r = await mod.getLyrics({ album: null, isrc: null, youtubeId: null, ...t, mode });
  console.log(`\n== ${t.title} [${mode}] ${Date.now() - t0}ms -> ${r.length} sheet(s)`);
  for (const s of r) console.log(`  ${s.source.padEnd(10)} ${s.format.padEnd(5)} trans=${!!s.translation} ${JSON.stringify(s.body.slice(0, 80))}`);
}

for (const t of tracks.slice(1)) {
  const m = await mod.getMeanings({ title: t.title, artist: t.artist });
  console.log(`\n== meanings ${t.title}: ${m.length}`);
  for (const r of m.slice(0, 2)) console.log('  ', JSON.stringify(r.fragment.slice(0, 60)), '=>', JSON.stringify(r.meaning.slice(0, 80)));
}
