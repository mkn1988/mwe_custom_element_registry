'use strict';

const core = require('./core-401f9276.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["my-component.cjs",[[0,"my-component"]]]], options);
});
