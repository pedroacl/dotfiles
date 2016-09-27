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

// Add more trigger types here as use cases are developed

// Represents the 'viewed' state of a NUX

/**
 * An optional gatekeeper ID to to pass in with this NUX.
 * If omitted, the NUX will always show.
 * If supplied, the NUX will show iff both this and the global `nuclide_all_nuxes` pass.
 */

/**
  * WARNING:  DO NOT COMMIT with this value set to true! The flow type ensures
  * that an error will occur if you do so. Setting to true will always show the
  * NUX every session, which is useful during development.
  */