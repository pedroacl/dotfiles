Object.defineProperty(exports, '__esModule', {
  value: true
});

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, 'next'); var callThrow = step.bind(null, 'throw'); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _assert2;

function _assert() {
  return _assert2 = _interopRequireDefault(require('assert'));
}

var _LldbDebuggerInstance2;

function _LldbDebuggerInstance() {
  return _LldbDebuggerInstance2 = require('./LldbDebuggerInstance');
}

var _nuclideDebuggerBase2;

function _nuclideDebuggerBase() {
  return _nuclideDebuggerBase2 = require('../../nuclide-debugger-base');
}

var _nuclideRemoteConnection2;

function _nuclideRemoteConnection() {
  return _nuclideRemoteConnection2 = require('../../nuclide-remote-connection');
}

var _utils2;

function _utils() {
  return _utils2 = require('./utils');
}

var LaunchProcessInfo = (function (_DebuggerProcessInfo) {
  _inherits(LaunchProcessInfo, _DebuggerProcessInfo);

  function LaunchProcessInfo(targetUri, launchTargetInfo) {
    _classCallCheck(this, LaunchProcessInfo);

    _get(Object.getPrototypeOf(LaunchProcessInfo.prototype), 'constructor', this).call(this, 'lldb', targetUri);
    this._launchTargetInfo = launchTargetInfo;
  }

  _createClass(LaunchProcessInfo, [{
    key: 'supportThreads',
    value: function supportThreads() {
      return true;
    }
  }, {
    key: 'debug',
    value: _asyncToGenerator(function* () {
      var rpcService = this._getRpcService();
      if (typeof this.basepath === 'string') {
        this._launchTargetInfo.basepath = this.basepath;
      }

      var debugSession = null;
      var outputDisposable = (0, (_nuclideDebuggerBase2 || _nuclideDebuggerBase()).registerOutputWindowLogging)(rpcService.getOutputWindowObservable().refCount());
      try {
        yield rpcService.launch(this._launchTargetInfo);
        // Start websocket server with Chrome after launch completed.
        (0, (_assert2 || _assert()).default)(outputDisposable);
        debugSession = new (_LldbDebuggerInstance2 || _LldbDebuggerInstance()).LldbDebuggerInstance(this, rpcService, outputDisposable);
        outputDisposable = null;
      } finally {
        if (outputDisposable != null) {
          outputDisposable.dispose();
        }
      }
      return debugSession;
    })
  }, {
    key: 'supportSingleThreadStepping',
    value: function supportSingleThreadStepping() {
      return true;
    }
  }, {
    key: '_getRpcService',
    value: function _getRpcService() {
      var debuggerConfig = {
        logLevel: (0, (_utils2 || _utils()).getConfig)().serverLogLevel,
        pythonBinaryPath: (0, (_utils2 || _utils()).getConfig)().pythonBinaryPath,
        buckConfigRootFile: (0, (_utils2 || _utils()).getConfig)().buckConfigRootFile
      };
      var service = (0, (_nuclideRemoteConnection2 || _nuclideRemoteConnection()).getServiceByNuclideUri)('NativeDebuggerService', this.getTargetUri());
      (0, (_assert2 || _assert()).default)(service);
      return new service.NativeDebuggerService(debuggerConfig);
    }
  }]);

  return LaunchProcessInfo;
})((_nuclideDebuggerBase2 || _nuclideDebuggerBase()).DebuggerProcessInfo);

exports.LaunchProcessInfo = LaunchProcessInfo;