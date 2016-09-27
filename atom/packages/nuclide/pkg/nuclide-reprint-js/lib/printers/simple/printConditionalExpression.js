

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _constantsMarkers2;

function _constantsMarkers() {
  return _constantsMarkers2 = _interopRequireDefault(require('../../constants/markers'));
}

var _wrappersSimpleWrapExpression2;

function _wrappersSimpleWrapExpression() {
  return _wrappersSimpleWrapExpression2 = _interopRequireDefault(require('../../wrappers/simple/wrapExpression'));
}

function printConditionalExpression(print, node) {
  var wrap = function wrap(x) {
    return (0, (_wrappersSimpleWrapExpression2 || _wrappersSimpleWrapExpression()).default)(print, node, x);
  };
  return wrap([(_constantsMarkers2 || _constantsMarkers()).default.openScope, (_constantsMarkers2 || _constantsMarkers()).default.scopeIndent, print(node.test), (_constantsMarkers2 || _constantsMarkers()).default.scopeSpaceBreak, '?', (_constantsMarkers2 || _constantsMarkers()).default.noBreak, (_constantsMarkers2 || _constantsMarkers()).default.space, print(node.consequent), (_constantsMarkers2 || _constantsMarkers()).default.scopeSpaceBreak, ':', (_constantsMarkers2 || _constantsMarkers()).default.noBreak, (_constantsMarkers2 || _constantsMarkers()).default.space, print(node.alternate), (_constantsMarkers2 || _constantsMarkers()).default.scopeDedent, (_constantsMarkers2 || _constantsMarkers()).default.closeScope]);
}

module.exports = printConditionalExpression;