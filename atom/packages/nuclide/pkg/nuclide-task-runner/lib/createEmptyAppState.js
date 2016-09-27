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

exports.createEmptyAppState = createEmptyAppState;

function createEmptyAppState() {
  return {
    activeTaskId: null,
    previousSessionActiveTaskId: null,
    taskRunners: new Map(),
    projectRoot: null,
    taskLists: new Map(),
    runningTaskInfo: null,
    visible: false
  };
}