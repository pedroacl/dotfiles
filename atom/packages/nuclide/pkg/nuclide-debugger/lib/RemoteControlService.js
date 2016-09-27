var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RemoteControlService = (function () {

  /**
   * @param getModel function always returning the latest singleton model.
   *
   * NB: Deactivating and reactivating will result in a new Model instance (and
   * new instances of everything else). This object exists in other packages
   * outside of any model, so objects vended early must still always manipulate
   * the latest model's state.
   */

  function RemoteControlService(getModel) {
    _classCallCheck(this, RemoteControlService);

    this._getModel = getModel;
  }

  _createClass(RemoteControlService, [{
    key: 'startDebugging',
    value: _asyncToGenerator(function* (processInfo) {
      var model = this._getModel();
      if (model == null) {
        throw new Error('Package is not activated.');
      }
      yield model.getActions().startDebugging(processInfo);
    })
  }, {
    key: 'toggleBreakpoint',
    value: function toggleBreakpoint(filePath, line) {
      var model = this._getModel();
      if (model == null) {
        throw new Error('Package is not activated.');
      }
      model.getActions().toggleBreakpoint(filePath, line);
    }
  }, {
    key: 'isInDebuggingMode',
    value: function isInDebuggingMode(providerName) {
      var model = this._getModel();
      if (model == null) {
        throw new Error('Package is not activated.');
      }
      var session = model.getStore().getDebuggerInstance();
      return session != null && session.getProviderName() === providerName;
    }
  }, {
    key: 'killDebugger',
    value: function killDebugger() {
      var model = this._getModel();
      if (model == null) {
        throw new Error('Package is not activated.');
      }
      model.getActions().stopDebugging();
    }
  }]);

  return RemoteControlService;
})();

module.exports = RemoteControlService;