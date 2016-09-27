Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.proxyFilename = proxyFilename;
exports.createProxyFactory = createProxyFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _fs2;

function _fs() {
  return _fs2 = _interopRequireDefault(require('fs'));
}

var _commonsNodeNuclideUri2;

function _commonsNodeNuclideUri() {
  return _commonsNodeNuclideUri2 = _interopRequireDefault(require('../../commons-node/nuclideUri'));
}

var _assert2;

function _assert() {
  return _assert2 = _interopRequireDefault(require('assert'));
}

var _module2;

function _module() {
  return _module2 = _interopRequireDefault(require('module'));
}

var _proxyGenerator2;

function _proxyGenerator() {
  return _proxyGenerator2 = require('./proxy-generator');
}

var _serviceParser2;

function _serviceParser() {
  return _serviceParser2 = require('./service-parser');
}

// Proxy dependencies

var _rxjsBundlesRxMinJs2;

function _rxjsBundlesRxMinJs() {
  return _rxjsBundlesRxMinJs2 = require('rxjs/bundles/Rx.min.js');
}

var _nuclideAnalytics2;

function _nuclideAnalytics() {
  return _nuclideAnalytics2 = require('../../nuclide-analytics');
}

/** Cache for remote proxies. */
var proxiesCache = new Map();

function proxyFilename(definitionPath) {
  (0, (_assert2 || _assert()).default)((_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.isAbsolute(definitionPath), '"' + definitionPath + '" definition path must be absolute.');
  var dir = (_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.dirname(definitionPath);
  var name = (_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.basename(definitionPath, (_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.extname(definitionPath));
  var filename = (_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.join(dir, name + 'Proxy.js');
  return filename;
}

function createProxyFactory(serviceName, preserveFunctionNames, definitionPath, predefinedTypes) {
  if (!proxiesCache.has(definitionPath)) {
    var filename = proxyFilename(definitionPath);

    var code = undefined;
    if ((_fs2 || _fs()).default.existsSync(filename)) {
      code = (_fs2 || _fs()).default.readFileSync(filename, 'utf8');
    } else {
      var definitionSource = (_fs2 || _fs()).default.readFileSync(definitionPath, 'utf8');
      var defs = (0, (_serviceParser2 || _serviceParser()).parseServiceDefinition)(definitionPath, definitionSource, predefinedTypes);
      code = (0, (_proxyGenerator2 || _proxyGenerator()).generateProxy)(serviceName, preserveFunctionNames, defs);
    }

    var m = loadCodeAsModule(code, filename);
    m.exports.inject((_rxjsBundlesRxMinJs2 || _rxjsBundlesRxMinJs()).Observable, (_nuclideAnalytics2 || _nuclideAnalytics()).trackOperationTiming);

    proxiesCache.set(definitionPath, m.exports);
  }

  var factory = proxiesCache.get(definitionPath);
  (0, (_assert2 || _assert()).default)(factory != null);

  return factory;
}

function loadCodeAsModule(code, filename) {
  (0, (_assert2 || _assert()).default)(code.length > 0, 'Code must not be empty.');
  var m = new (_module2 || _module()).default(filename);
  m.filename = filename;
  m.paths = []; // Disallow require resolving by removing lookup paths.
  m._compile(code, filename);
  m.loaded = true;

  return m;
}

// Export caches for testing.
var __test__ = {
  proxiesCache: proxiesCache
};
exports.__test__ = __test__;