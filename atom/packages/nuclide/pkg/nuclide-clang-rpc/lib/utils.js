Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isHeaderFile = isHeaderFile;
exports.isSourceFile = isSourceFile;
exports.findIncludingSourceFile = findIncludingSourceFile;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _escapeStringRegexp2;

function _escapeStringRegexp() {
  return _escapeStringRegexp2 = _interopRequireDefault(require('escape-string-regexp'));
}

var _commonsNodeNuclideUri2;

function _commonsNodeNuclideUri() {
  return _commonsNodeNuclideUri2 = _interopRequireDefault(require('../../commons-node/nuclideUri'));
}

var _rxjsBundlesRxMinJs2;

function _rxjsBundlesRxMinJs() {
  return _rxjsBundlesRxMinJs2 = require('rxjs/bundles/Rx.min.js');
}

var _commonsNodeProcess2;

function _commonsNodeProcess() {
  return _commonsNodeProcess2 = require('../../commons-node/process');
}

var HEADER_EXTENSIONS = new Set(['.h', '.hh', '.hpp', '.hxx', '.h++']);
var SOURCE_EXTENSIONS = new Set(['.c', '.cc', '.cpp', '.cxx', '.c++', '.m', '.mm']);

function isHeaderFile(filename) {
  return HEADER_EXTENSIONS.has((_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.extname(filename));
}

function isSourceFile(filename) {
  return SOURCE_EXTENSIONS.has((_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.extname(filename));
}

function processGrepResult(result, headerFile, includeRegex) {
  var splitIndex = result.indexOf('\0');
  if (splitIndex === -1) {
    return null;
  }
  var filename = result.substr(0, splitIndex);
  if (!isSourceFile(filename)) {
    return null;
  }
  var match = includeRegex.exec(result.substr(splitIndex + 1));
  if (match == null) {
    return null;
  }
  // Source-relative includes have to be verified.
  // Relative paths will match the (../)* rule (at index 2).
  if (match[2] != null) {
    var includePath = (_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.normalize((_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.join((_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.dirname(filename), match[1]));
    if (includePath !== headerFile) {
      return null;
    }
  }
  return filename;
}

/**
 * Search all subdirectories of the header file for a source file that includes it.
 * We handle the two most common types of include statements:
 *
 * 1) Includes relative to the project root (if supplied); e.g. #include <a/b.h>
 * 2) Includes relative to the source file; e.g. #include "../../a.h"
 *
 * Note that we use an Observable here to enable cancellation.
 * The resulting Observable fires and completes as soon as a matching file is found;
 * 'null' will always be emitted if no results are found.
 */

function findIncludingSourceFile(headerFile, projectRoot) {
  var basename = (0, (_escapeStringRegexp2 || _escapeStringRegexp()).default)((_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.basename(headerFile));
  var relativePath = (0, (_escapeStringRegexp2 || _escapeStringRegexp()).default)((_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.relative(projectRoot, headerFile));
  var pattern = '^\\s*#include\\s+["<](' + relativePath + '|(../)*' + basename + ')[">]\\s*$';
  var regex = new RegExp(pattern);
  var spawnGrepProcess = function spawnGrepProcess() {
    // We need both the file and the match to verify relative includes.
    // Relative includes may not always be correct, so we may have to go through all the results.
    return (0, (_commonsNodeProcess2 || _commonsNodeProcess()).safeSpawn)('grep', ['-RE', // recursive, extended
    '--null', // separate file/match with \0
    pattern, (_commonsNodeNuclideUri2 || _commonsNodeNuclideUri()).default.dirname(headerFile)]);
  };
  return (0, (_commonsNodeProcess2 || _commonsNodeProcess()).observeProcess)(spawnGrepProcess).flatMap(function (message) {
    switch (message.kind) {
      case 'stdout':
        var file = processGrepResult(message.data, headerFile, regex);
        return file == null ? (_rxjsBundlesRxMinJs2 || _rxjsBundlesRxMinJs()).Observable.empty() : (_rxjsBundlesRxMinJs2 || _rxjsBundlesRxMinJs()).Observable.of(file);
      case 'error':
        throw new Error(message.error);
      case 'exit':
        return (_rxjsBundlesRxMinJs2 || _rxjsBundlesRxMinJs()).Observable.of(null);
      default:
        return (_rxjsBundlesRxMinJs2 || _rxjsBundlesRxMinJs()).Observable.empty();
    }
  }).take(1);
}