/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

if (require("api-utils/xul-app").is("Firefox")) {
  var tabs = require("api-utils/tabs/firefox-tabs");
}
else if (require("api-utils/xul-app").is("Fennec")) {
  var tabs = require("api-utils/tabs/fennec-tabs");
}
else {
  throw new Error([
    "The tabs module currently supports only Firefox & Fennec. In the future",
    " we would like it to support other applications, however."
  ].join(""));
}

// Workaround for bug 674195. Freezing objects from other compartments fail,
// so we use `Object.freeze` from the same component as objects
// `hasOwnProperty`. Since `hasOwnProperty` here will be from other component
// we override it to support our workaround.
module.exports = Object.create(tabs, {
  isPrototypeOf: { value: Object.prototype.isPrototypeOf }
});
