// Jank hacks to inject polyfills :))
const { resolve } = require('path');
const coreJs = resolve('../../babel-test262-runner/node_modules/core-js-bundle/index.js');
const regenerator = resolve('../../babel-test262-runner/node_modules/rengerator-runtime/runtime.js');

const polyfills = `[
  'Function("this.globalThis = this;")()',
  fs.readFileSync(${JSON.stringify(coreJs)}, "utf8"),
  fs.readFileSync(${JSON.stringify(regenerator)}, "utf8")
]`;

module.exports = function (code) {
  return code
    .replace('preludes: []', `preludes: ${polyfills}`) // run polyfills in new realms
    .replace('vm.runInESHostContext(', // run polyfills in main
    `
var fs = require("fs");
var polyfills = ${polyfills};
for (var i = 0; i < ${polyfills.length}; i++) {
  vm.runInESHostContext(polyfills[i]);
}

vm.runInESHostContext(
    `);
};