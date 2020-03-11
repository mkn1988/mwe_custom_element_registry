'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-401f9276.js');

const defineCustomElements = (win, options) => {
  return core.patchEsm().then(() => {
    core.bootstrapLazy([["my-component.cjs",[[0,"my-component"]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
