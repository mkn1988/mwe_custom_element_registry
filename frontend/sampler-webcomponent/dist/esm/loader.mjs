import { a as patchEsm, b as bootstrapLazy } from './core-3bd9b574.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["my-component",[[0,"my-component"]]]], options);
  });
};

export { defineCustomElements };
