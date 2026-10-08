const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');
const bundle = fs.readFileSync(path.join(root, 'assets/studio.js'), 'utf8');
const wait = (ms = 30) => new Promise(resolve => setTimeout(resolve, ms));
async function boot(route, { blockedStorage = false, corrupt = false } = {}) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', error => errors.push(String(error)));
  vc.on('error', (...args) => errors.push(args.join(' ')));
  const dom = new JSDOM('<!doctype html><div id="app"></div>', { url: 'https://studio.test/shortflow-ai-studio/', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
  const w = dom.window;
  const intervals = new Set();
  const setInterval = w.setInterval.bind(w), clearInterval = w.clearInterval.bind(w);
  w.setInterval = (...args) => { const id = setInterval(...args); intervals.add(id); return id; };
  w.clearInterval = id => { intervals.delete(id); clearInterval(id); };
  w.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  w.IntersectionObserver = class { observe() {} disconnect() {} unobserve() {} };
  w.ResizeObserver = class { observe() {} disconnect() {} unobserve() {} };
  w.HTMLCanvasElement.prototype.getContext = () => null;
  w.HTMLMediaElement.prototype.play = () => Promise.resolve();
  w.HTMLMediaElement.prototype.pause = () => {};
  w.fetch = async url => {
    const file = path.join(root, String(url));
    if (!fs.existsSync(file)) throw Error('Missing local fetch: ' + url);
    return { ok: true, text: async () => fs.readFileSync(file, 'utf8') };
  };
  w.localStorage.setItem('sf-studio-route', corrupt ? '{bad json' : JSON.stringify(route));
  if (blockedStorage) {
    w.Storage.prototype.setItem = () => { throw new w.DOMException('Blocked', 'SecurityError'); };
  }
  w.eval(bundle);
  await wait(60);
  const check = () => {
    assert.equal(errors.length, 0, errors.join('\n'));
    assert(w.document.querySelector('.app-shell'), 'App failed to mount: ' + JSON.stringify(route));
    assert(w.document.querySelector('main').textContent.trim().length > 0, 'Blank route');
  };
  const click = async text => {
    const button = [...w.document.querySelectorAll('button')].find(el => el.textContent.trim() === text || (text === 'Opportunities' && el.textContent.trim().startsWith('Opportunities')) || el.getAttribute('aria-label') === text);
    assert(button, 'Button not found: ' + text);
    button.click(); await wait(); check();
  };
  check();
  return { dom, w, check, click, intervals, errors };
}
(async () => {
  let count = 0;
  const initial = await boot({ name: 'home' });
  const projects = initial.w.SF.projects;
  assert(initial.w.document.querySelector('.home-new-project-beam[data-beam]'), 'Beam missing');
  await initial.click('New project');
  assert(initial.w.document.querySelector('[role="dialog"]'), 'New project dialog missing');
  await initial.click('Create project');
  await initial.click('Upload script');
  const dropzone = initial.w.document.querySelector('.upload-dropzone');
  assert(dropzone, 'Upload screen missing'); dropzone.click(); await wait();
  await initial.click('Prepare production');
  await wait(7000); initial.check();
  assert(initial.w.document.querySelector('.production-layout'), 'Preparation did not finish');
  const createSeries = [...initial.w.document.querySelectorAll('button')].find(b => /Create.*series/i.test(b.textContent));
  assert(createSeries, 'Create series action missing'); createSeries.click(); await wait(); initial.check();
  assert(initial.w.document.querySelector('.episodes-layout'), 'Series creation failed');
  for (let i = 0; i < 20; i++) {
    await initial.click('Home'); await initial.click('Projects'); await initial.click('Opportunities');
  }
  assert.equal(initial.intervals.size, 1, 'Intervals leaked after navigation');
  initial.dom.window.close(); count++;
  const routes = ['projects', 'opportunities', 'distribution'].map(name => ({ name }));
  for (const p of projects) for (const name of ['overview', 'production', 'episodes', 'pdist']) routes.push({ name, projectId: p.id });
  for (const oppId of ['orig-revenge', 'gp-fantasy', 'challenge', 'open-thriller']) routes.push({ name: 'opportunity', oppId });
  for (const route of routes) {
    const t = await boot(route);
    if (route.name === 'production') {
      const tabs = [...t.w.document.querySelectorAll('.production-tabs button')];
      for (const tab of tabs) { tab.click(); await wait(); t.check(); }
    }
    if (route.name === 'episodes') {
      for (const button of t.w.document.querySelectorAll('.episode-rail__item')) { button.click(); await wait(5); t.check(); }
    }
    t.dom.window.close(); count++;
  }
  for (const route of [null, 42, [], { name: 'overview', projectId: 'deleted' }, { name: 'unknown' }]) { const t = await boot(route); t.dom.window.close(); count++; }
  const corrupt = await boot(null, { corrupt: true }); corrupt.dom.window.close(); count++;
  const blocked = await boot({ name: 'home' }, { blockedStorage: true }); await blocked.click('Projects'); blocked.dom.window.close(); count++;
  const fault = await boot({ name: 'overview', projectId: 'nightstore' });
  fault.w.SF.projects[0].production.characters = null;
  const productionButton = fault.w.document.querySelectorAll('.sidebar__nav--project button')[1];
  productionButton.click(); await wait();
  assert(fault.w.document.querySelector('[role="alert"]'), 'Runtime error must show recovery UI');
  fault.dom.window.close(); count++;
  // Verify each declared image/video is actually present in the deployment folder.
  const data = fs.readFileSync(path.join(root, 'js/mock-data.js'), 'utf8');
  const assets = [...new Set([...data.matchAll(/public\/[\w\p{L}\p{M}/.\-]+(?:\?[^'"\s]+)?/gu)].map(m => m[0].split('?')[0]))];
  for (const asset of assets) assert(fs.existsSync(path.join(root, asset)), 'Missing asset: ' + asset);
  console.log(`PASS: ${count} route/storage cases, all production tabs and episode selections, new-project/upload/prepare/create flow, 60 repeated navigations with no interval leaks, error recovery + Beam, ${assets.length} local media paths.`);
})().catch(error => { console.error(error); process.exit(1); });
