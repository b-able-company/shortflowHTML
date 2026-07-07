const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');
const { execFileSync } = require('child_process');
const Babel = require('../login/vendor/babel-standalone.min.js');

const ROOT = path.resolve(__dirname, '..');
const SOURCE_ROOT = 'assets/js/unbundled/src';
const BUILD_ROOT = 'assets/js/unbundled';

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function write(file, contents) {
  const target = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, contents.endsWith('\n') ? contents : `${contents}\n`);
}

function parseBundle(file, sourceOverride) {
  const source = sourceOverride || read(file);
  const manifestMatch = source.match(
    /<script type="__bundler\/manifest">\s*([\s\S]*?)\s*<\/script>/
  );
  const templateMatch = source.match(
    /<script type="__bundler\/template">\s*([\s\S]*?)\s*<\/script>/
  );

  if (!manifestMatch || !templateMatch) {
    throw new Error(`${file}: bundle manifest or template not found`);
  }

  return {
    file,
    source,
    manifest: JSON.parse(manifestMatch[1]),
    template: JSON.parse(templateMatch[1]),
  };
}

function readFromGit(file) {
  return execFileSync('git', ['show', `HEAD:${file}`], {
    cwd: ROOT,
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
}

function decodeAsset(entry) {
  const bytes = Buffer.from(entry.data, 'base64');
  return (entry.compressed ? zlib.gunzipSync(bytes) : bytes).toString('utf8');
}

function compile(source, filename) {
  return Babel.transform(source, {
    filename,
    presets: ['env', 'react'],
    sourceType: 'script',
    comments: true,
    compact: false,
  }).code;
}

function writeModule(relativeName, source) {
  const sourceFile = `${SOURCE_ROOT}/${relativeName}.jsx`;
  const buildFile = `${BUILD_ROOT}/${relativeName}.js`;
  write(sourceFile, source);
  write(buildFile, compile(source, sourceFile));
  return buildFile;
}

function extractFunction(source, name) {
  const scriptPattern = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi;
  const scripts = [];
  let scriptMatch;
  while ((scriptMatch = scriptPattern.exec(source))) {
    if (scriptMatch[1].includes(`function ${name}`)) scripts.push(scriptMatch[1]);
  }

  for (const script of scripts) {
    let ast;
    try {
      ast = Babel.packages.parser.parse(script, {
        sourceType: 'script',
        plugins: ['jsx'],
      });
    } catch (error) {
      continue;
    }

    let found = null;
    const visit = (node) => {
      if (!node || found) return;
      if (
        node.type === 'FunctionDeclaration' &&
        node.id &&
        node.id.name === name
      ) {
        found = node;
        return;
      }
      Object.keys(node).forEach((key) => {
        if (key === 'loc') return;
        const value = node[key];
        if (Array.isArray(value)) {
          value.forEach(visit);
        } else if (value && typeof value === 'object' && value.type) {
          visit(value);
        }
      });
    };
    visit(ast.program);
    if (found) return script.slice(found.start, found.end);
  }

  throw new Error(`Function ${name} not found`);
}

function extractConstExpression(source, name) {
  const marker = `const ${name} =`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`Constant ${name} not found`);

  const expressionStart = start + marker.length;
  let quote = null;
  let escaped = false;
  let lineComment = false;
  let blockComment = false;
  let paren = 0;
  let bracket = 0;
  let brace = 0;

  for (let index = expressionStart; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === '\n') lineComment = false;
      continue;
    }
    if (blockComment) {
      if (char === '*' && next === '/') {
        blockComment = false;
        index += 1;
      }
      continue;
    }
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }
    if (char === '/' && next === '/') {
      lineComment = true;
      index += 1;
      continue;
    }
    if (char === '/' && next === '*') {
      blockComment = true;
      index += 1;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }
    if (char === '(') paren += 1;
    if (char === ')') paren -= 1;
    if (char === '[') bracket += 1;
    if (char === ']') bracket -= 1;
    if (char === '{') brace += 1;
    if (char === '}') brace -= 1;
    if (char === ';' && paren === 0 && bracket === 0 && brace === 0) {
      return source.slice(expressionStart, index).trim();
    }
  }

  throw new Error(`Constant ${name} is incomplete`);
}

function evaluateStringExpression(source, name) {
  const expression = extractConstExpression(source, name);
  return vm.runInNewContext(`(${expression})`);
}

function stripScriptWrapper(source) {
  return source
    .replace(/^\s*<script[^>]*>/i, '')
    .replace(/<\/script>\s*$/i, '');
}

function stripEmbeddedFonts(template) {
  return template
    .replace(
      /<link rel="preconnect" href="https:\/\/fonts\.googleapis\.com">\s*/g,
      ''
    )
    .replace(
      /<link rel="preconnect" href="https:\/\/fonts\.gstatic\.com"[^>]*>\s*/g,
      ''
    )
    .replace(/<style>\/\* cyrillic-ext \*\/[\s\S]*?<\/style>\s*/i, '');
}

function replaceBundleScripts(template, bundle, scriptMap) {
  return template.replace(
    /<script([^>]*)\ssrc="([^"]+)"([^>]*)><\/script>/g,
    (whole, before, source, after) => {
      const entry = bundle.manifest[source];
      if (!entry) return whole;

      const replacement = scriptMap[source];
      if (replacement === null) return '';
      if (!replacement) {
        throw new Error(`${bundle.file}: no script mapping for ${source}`);
      }
      return `<script src="${replacement}"></script>`;
    }
  );
}

function replaceInlineBabel(template, outputFile) {
  let inlineSource = null;
  const html = template.replace(
    /<script type="text\/babel"[^>]*>\s*([\s\S]*?)\s*<\/script>/,
    (whole, source) => {
      inlineSource = source;
      return `<script src="${outputFile}"></script>`;
    }
  );

  if (inlineSource === null) {
    throw new Error(`Inline Babel entry not found for ${outputFile}`);
  }

  const relativeName = outputFile
    .replace(`${BUILD_ROOT}/`, '')
    .replace(/\.js$/, '');
  writeModule(relativeName, inlineSource);
  return html;
}

function addToHead(html, markup) {
  return html.replace(/<head([^>]*)>/i, (match) => `${match}\n${markup}`);
}

function addToBodyStart(html, markup) {
  return html.replace(/<body([^>]*)>/i, (match) => `${match}\n${markup}`);
}

function addBeforeBodyEnd(html, markup) {
  return html.replace(/<\/body>/i, `${markup}\n</body>`);
}

function cleanHtml(html) {
  return html
    .replace(/\s+integrity="[^"]*"/gi, '')
    .replace(/\s+crossorigin="[^"]*"/gi, '')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function hasBundlePayload(source) {
  return (
    source.includes('type="__bundler/manifest"') &&
    source.includes('type="__bundler/template"')
  );
}

function parseWorkingBundle(file) {
  const source = read(file);
  return hasBundlePayload(source) ? parseBundle(file, source) : null;
}

const bundles = {
  // Keep one immutable bundle source for shared assets even after the page has
  // already been converted in the working tree.
  create: parseBundle('content-create2.html', readFromGit('content-create2.html')),
  detail: parseWorkingBundle('content-detail.html'),
  producerDetail: parseWorkingBundle('my-content-detail.html'),
  performance: parseWorkingBundle('performance.html'),
};

const sharedSources = {
  tokens: decodeAsset(
    bundles.create.manifest['70d91226-a59b-4879-a356-4735a1df8d70']
  ),
  primitives: decodeAsset(
    bundles.create.manifest['dac38525-7678-49d9-88b3-b3e83f7137dc']
  ),
};

writeModule('shared/tokens', sharedSources.tokens);
writeModule('shared/primitives', sharedSources.primitives);

function buildCreatePage() {
  const bundle = bundles.create;
  const modules = {
    '023830c5-0e1d-4b10-84e3-b7c47f8d15fc': 'create/dashboard-shell',
    '94bc7128-d447-4cff-bc16-b86ba96fa30f': 'create/starter-scaffold',
    '12ec0827-7600-4c07-b46e-5217af910a9b': 'create/content-data',
    'f4be4400-9b3a-46d7-b492-4ed5c2859332': 'create/form-fields',
    '6bfc85e5-d995-4428-b193-6bab45bf7600': 'create/media-upload',
    '78ead52e-62bc-4681-912a-dcda9f3898f6': 'create/language-fields',
    '1cfa160d-f2f3-4dbc-baa8-178d7b188d8a': 'create/create-shell',
    '7195eeba-1d14-4b5e-960e-3a6f7aa77e7d': 'create/form-sections',
    'a206f41d-44b2-4f4b-931d-43e4bd6904d6': 'create/create-app',
  };
  const scriptMap = {
    '8bccce39-dab4-45cc-a723-d1904433bdd7':
      'login/vendor/react.development.js',
    '9ff960be-c6d4-42b1-b255-70d9077cbae1':
      'login/vendor/react-dom.development.js',
    'd4cc3b03-c688-4ba4-9f4e-6eb7057b77cc': null,
    '70d91226-a59b-4879-a356-4735a1df8d70':
      `${BUILD_ROOT}/shared/tokens.js`,
    'dac38525-7678-49d9-88b3-b3e83f7137dc':
      `${BUILD_ROOT}/shared/primitives.js`,
  };

  Object.entries(modules).forEach(([id, relativeName]) => {
    scriptMap[id] = writeModule(relativeName, decodeAsset(bundle.manifest[id]));
  });

  let html = stripEmbeddedFonts(bundle.template);
  html = replaceBundleScripts(html, bundle, scriptMap);
  html = html.replace(
    /새 콘텐츠 등록 \(단계\) — shortflow/g,
    '콘텐츠 생성하기 | shortflow'
  );
  html = addToHead(
    html,
    [
      '<link rel="stylesheet" href="login/styles/fonts.css">',
      '<link rel="stylesheet" href="dashboard-common.css">',
      '<script src="dashboard-nav.js"></script>',
      '<style>',
      '  body { display: block !important; align-items: stretch !important; justify-content: flex-start !important; min-height: 100vh !important; background: #fff !important; }',
      '  #root { width: 100%; height: calc(100vh - 56px); }',
      '  #root > div { height: calc(100vh - 56px) !important; }',
      '  #root > div > div:first-child,',
      '  #root h1,',
      '  #root h1 + span,',
      '  #root section[id^="sec-"] > div:first-child,',
      '  .content-footer { display: none !important; }',
      '</style>',
    ].join('\n')
  );
  html = addToBodyStart(
    html,
    '<div data-shortflow-nav="my-content"></div>'
  );
  write('content-create2.html', cleanHtml(html));
}

const detailModules = {
  '9796097f-f887-46ce-812c-8c6f63146d34': 'detail/content-library-data',
  'f3fe044a-99c4-4dd7-b4d4-a06a47319ff2': 'detail/content-search',
  '5eda10c6-e39f-43dc-97f9-ddc134413c5b': 'detail/cart-data',
  '202c429c-e442-4e2c-8a3f-2ef6e072b2af': 'detail/cart-primitives',
  'e33071ef-7ebf-4b37-88ba-c672c46644da': 'detail/cart-cards',
};

function buildDetailPage({ producer }) {
  const bundle = producer ? bundles.producerDetail : bundles.detail;
  const stripFunction = vm.runInNewContext(
    `(${extractFunction(bundle.source, 'stripDetailLocalNav')})`
  );
  const pageName = producer ? 'producer-detail' : 'platform-detail';
  const detailPageId = '1ee8f249-04e8-4973-8903-192ea2c34868';
  const scriptMap = {
    '298c7154-6d67-4a56-b14f-3695d929ff21':
      'login/vendor/react.development.js',
    '11c58cc7-0826-4acf-aafd-f4983703d0af':
      'login/vendor/react-dom.development.js',
    '584ac5b9-84c8-4753-ab67-cc31ae9f0363': null,
    '18a51042-ab2f-4123-9154-e25a06a0b165':
      `${BUILD_ROOT}/shared/tokens.js`,
    '3a40fee9-46c2-4f88-ab70-7155ab008927':
      `${BUILD_ROOT}/shared/primitives.js`,
  };

  Object.entries(detailModules).forEach(([id, relativeName]) => {
    const transformed = stripFunction(decodeAsset(bundle.manifest[id]));
    scriptMap[id] = `${BUILD_ROOT}/${relativeName}.js`;
    if (!fs.existsSync(path.join(ROOT, scriptMap[id]))) {
      writeModule(relativeName, transformed);
    }
  });

  scriptMap[detailPageId] = writeModule(
    `detail/${pageName}`,
    stripFunction(decodeAsset(bundle.manifest[detailPageId]))
  );

  const runtimeFunctions = producer
    ? [
        'installProducerBackNavigation',
        'installDetailLayoutTweaks',
        'installMyContentActions',
        'installDetailFieldTweaks',
      ]
    : ['installDetailLayoutTweaks', 'installDetailFieldTweaks'];
  const runtimeCalls = runtimeFunctions.map((name) => `  ${name}();`).join('\n');
  const runtimeSource = [
    ...runtimeFunctions.map((name) => extractFunction(bundle.source, name)),
    '',
    "document.addEventListener('DOMContentLoaded', function() {",
    runtimeCalls,
    '});',
  ].join('\n\n');
  const runtimePath = writeModule(`detail/${pageName}-runtime`, runtimeSource);

  let html = stripEmbeddedFonts(bundle.template);
  html = replaceBundleScripts(html, bundle, scriptMap);
  html = replaceInlineBabel(
    html,
    `${BUILD_ROOT}/detail/${pageName}-entry.js`
  );

  const roleScript = producer
    ? ''
    : [
        '<script>',
        '  try {',
        "    window.__SHORTFLOW_DETAIL_ENTRY_ROLE__ = localStorage.getItem('shortflow-view-role') === 'producer' ? 'producer' : 'platform';",
        '  } catch (error) {',
        "    window.__SHORTFLOW_DETAIL_ENTRY_ROLE__ = 'platform';",
        '  }',
        '</script>',
      ].join('\n');
  const activeNav = producer ? 'my-content' : 'content';

  html = addToHead(
    html,
    [
      '<link rel="stylesheet" href="login/styles/fonts.css">',
      '<link rel="stylesheet" href="dashboard-common.css">',
      roleScript,
      '<script src="utility-remote.js"></script>',
      '<script src="dashboard-nav.js"></script>',
    ]
      .filter(Boolean)
      .join('\n')
  );
  const navHtml = producer
    ? [
        '<div data-shortflow-nav="my-content"></div>',
        '<div id="contentManageSubNav"></div>',
        '<script>',
        "  document.getElementById('contentManageSubNav').outerHTML = window.ShortflowNav.renderContentManageSubNav('contents');",
        '</script>',
      ].join('\n')
    : `<div data-shortflow-nav="${activeNav}"></div>`;
  html = addToBodyStart(html, navHtml);
  html = addBeforeBodyEnd(html, `<script src="${runtimePath}"></script>`);
  write(producer ? 'my-content-detail.html' : 'content-detail.html', cleanHtml(html));
}

function buildPerformancePage() {
  const bundle = bundles.performance;
  const modules = {
    '5c252cde-36c2-4d27-8915-2f4b6334cf51': 'performance/data',
    '4d4c124d-c4a9-45ef-939a-c37fe92ef2bd': 'performance/dashboard',
    '5226db6f-e564-4023-b32f-fd374d973d6e': 'performance/variants',
    'a9fe6e8f-2d92-4f2f-addd-fe360e241f6f': 'performance/detail',
  };
  const scriptMap = {
    '3f3c13c8-3b43-4989-9ae2-9a854e2ffa8c':
      'login/vendor/react.development.js',
    'afb50934-a1fc-42ae-b777-35a1946a126e':
      'login/vendor/react-dom.development.js',
    'e9645a0d-bafa-495b-ae0b-d2998544b19e': null,
    'b575e27b-e8e3-4d08-9051-f07837acda0f':
      `${BUILD_ROOT}/shared/tokens.js`,
    '3562cf8d-d44d-4ff6-802d-8c6e51c0fe85':
      `${BUILD_ROOT}/shared/primitives.js`,
  };

  Object.entries(modules).forEach(([id, relativeName]) => {
    scriptMap[id] = writeModule(relativeName, decodeAsset(bundle.manifest[id]));
  });

  const overrideMarkup = evaluateStringExpression(
    bundle.source,
    'removeBundledNavScript'
  );
  const overridePath = writeModule(
    'performance/overrides',
    stripScriptWrapper(overrideMarkup)
  );
  const runtimeSource = [
    extractFunction(bundle.source, 'installPerformancePosterImages'),
    '',
    "document.addEventListener('DOMContentLoaded', function() {",
    '  installPerformancePosterImages();',
    '});',
  ].join('\n');
  const runtimePath = writeModule('performance/runtime', runtimeSource);

  let html = stripEmbeddedFonts(bundle.template);
  html = replaceBundleScripts(html, bundle, scriptMap);
  html = replaceInlineBabel(
    html,
    `${BUILD_ROOT}/performance/entry.js`
  );
  html = html.replace(
    `<script src="${BUILD_ROOT}/performance/entry.js"></script>`,
    `<script src="${overridePath}"></script>\n<script src="${BUILD_ROOT}/performance/entry.js"></script>`
  );
  html = addToHead(
    html,
    [
      '<link rel="stylesheet" href="login/styles/fonts.css">',
      '<link rel="stylesheet" href="dashboard-common.css">',
      '<script src="dashboard-nav.js"></script>',
      '<style>',
      '  #performance-dashboard-chrome { width: 100%; }',
      '  #root { width: min(960px, calc(100vw - 48px)); margin: 0 auto; }',
      '  #root > div > header:first-child { display: none !important; }',
      '  #root > div > main { max-width: none !important; padding: 32px 0 80px !important; }',
      '  @media (max-width: 920px) {',
      '    #root { width: calc(100vw - 32px); }',
      '    #root > div > main { padding: 24px 0 40px !important; }',
      '  }',
      '</style>',
    ].join('\n')
  );
  html = addToBodyStart(
    html,
    [
      '<div id="performance-dashboard-chrome"></div>',
      '<script>',
      "  document.getElementById('performance-dashboard-chrome').innerHTML =",
      "    window.ShortflowNav.renderTopNav('producer-dashboard') +",
      "    window.ShortflowNav.renderDashboardSubNav('performance', 'producer');",
      '</script>',
    ].join('\n')
  );
  html = addBeforeBodyEnd(html, `<script src="${runtimePath}"></script>`);
  write('performance.html', cleanHtml(html));
}

if (hasBundlePayload(read('content-create2.html'))) buildCreatePage();
if (bundles.detail) buildDetailPage({ producer: false });
if (bundles.producerDetail) buildDetailPage({ producer: true });
if (bundles.performance) buildPerformancePage();

[
  'content-create2.html',
  'content-detail.html',
  'my-content-detail.html',
  'performance.html',
].forEach((file) => write(file, cleanHtml(read(file))));

write(
  `${BUILD_ROOT}/README.md`,
  [
    '# Unbundled page scripts',
    '',
    'The readable JSX sources live in `src/`. The sibling `.js` files are',
    'precompiled browser-ready copies so the HTML pages also work when opened',
    'directly from the filesystem.',
    '',
    '- `shared/`: tokens and primitives reused by multiple pages',
    '- `create/`: content creation flow',
    '- `detail/`: platform and producer content detail flows',
    '- `performance/`: performance list/detail dashboard',
  ].join('\n')
);

console.log('Unbundled content-create2, content-detail, my-content-detail, and performance.');
