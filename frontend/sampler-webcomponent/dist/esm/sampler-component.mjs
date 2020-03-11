import { p as patchBrowser, b as bootstrapLazy } from './core-3bd9b574.js';

patchBrowser().then(options => {
  return bootstrapLazy([["my-component",[[0,"my-component"]]]], options);
});
