// Adapt the installed package to the app's existing React UMD runtime.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(require.resolve('border-beam'), 'utf8');
const output = `/* border-beam 1.4.1 | MIT | Jakub Antalik | https://libraries.dev/beam */
(function () {
  const exports = {};
  const jsx = (type, props, key) => window.React.createElement(type, key === undefined ? props : { ...props, key });
  const jsxs = (type, props, key) => {
    const { children, ...rest } = props;
    return window.React.createElement(type, key === undefined ? rest : { ...rest, key }, ...children);
  };
  const require = (name) => {
    if (name === 'react') return window.React;
    if (name === 'react/jsx-runtime') return { jsx, jsxs, Fragment: window.React.Fragment };
    throw new Error('Unsupported Beam dependency: ' + name);
  };
  ${source}
  window.BorderBeam = exports.BorderBeam;
})();
`;
fs.mkdirSync(path.join(root, 'assets/vendor'), { recursive: true });
fs.writeFileSync(path.join(root, 'assets/vendor/border-beam.js'), output);
