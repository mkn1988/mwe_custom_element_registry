import { a as patchEsm, b as bootstrapLazy } from './core-3bd9b574.js';
var defineCustomElements = function (win, options) {
    return patchEsm().then(function () {
        bootstrapLazy([["my-component", [[0, "my-component"]]]], options);
    });
};
export { defineCustomElements };
