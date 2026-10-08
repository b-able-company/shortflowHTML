const fs = require('node:fs');
const path = require('node:path');
const { build } = require('esbuild');
const root = path.resolve(__dirname, '..');
const files = ['mock-data', 'components', 'sidebar', 'screens/home', 'screens/project-overview', 'screens/production-start', 'screens/production', 'screens/episodes', 'screens/opportunities', 'screens/distribution', 'dialogs', 'app'];
(async () => {
  const runtime = `import React from 'react'; import * as ReactDOM from 'react-dom/client'; import { BorderBeam } from 'border-beam'; window.React = React; window.ReactDOM = ReactDOM; window.BorderBeam = BorderBeam;\n`;
  const contents = runtime + files.map(file => fs.readFileSync(path.join(root, 'js', file + '.js'), 'utf8')).join('\n');
  await build({ stdin: { contents, resolveDir: root, loader: 'jsx', sourcefile: 'studio.jsx' }, bundle: true, minify: true, define: { 'process.env.NODE_ENV': '"production"' }, target: ['es2020'], outfile: path.join(root, 'assets/studio.js'), legalComments: 'linked' });
  // Serve icons locally too: no request to a third-party CDN during navigation.
  fs.cpSync(path.join(root, 'node_modules/lucide-static/icons'), path.join(root, 'assets/icons'), { recursive: true });
  fs.copyFileSync(path.join(root, 'node_modules/lucide-static/LICENSE'), path.join(root, 'assets/icons/LICENSE'));
  const dist = path.join(root, 'dist');
  fs.mkdirSync(path.join(dist, 'assets'), { recursive: true });
  for (const folder of ['css', 'public']) fs.cpSync(path.join(root, folder), path.join(dist, folder), { recursive: true });
  fs.cpSync(path.join(root, 'assets/icons'), path.join(dist, 'assets/icons'), { recursive: true });
  for (const file of ['studio.js', 'studio.js.LEGAL.txt']) fs.copyFileSync(path.join(root, 'assets', file), path.join(dist, 'assets', file));
  const hash = require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(root, 'assets/studio.js'))).digest('hex').slice(0, 12);
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').replace(/assets\/studio\.js(?:\?v=[a-f0-9]+)?/, 'assets/studio.js?v=' + hash);
  fs.writeFileSync(path.join(root, 'index.html'), html);
  fs.writeFileSync(path.join(dist, 'index.html'), html);
  console.log('Built production bundle and deployable dist/ directory.');
})().catch(error => { console.error(error); process.exitCode = 1; });
