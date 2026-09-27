/**
 * Native ESM loader for @story-map/remark-story-map.
 *
 * Docusaurus loads docusaurus.config.ts through jiti, and jiti's CJS interop of
 * story-map-core's `import { z } from "zod"` drops zod v4's named exports
 * (`z` becomes undefined, so `z.object` crashes at config load). Loading the
 * ESM plugin through Node's own require(esm) keeps the package graph on the
 * native loader instead.
 *
 * Use with: `const remarkStoryMap = require("./plugins/remark-story-map-loader.cjs");`
 */
const { createRequire } = require('node:module');

const nativeRequire = createRequire(__filename);
const mod = nativeRequire('@story-map/remark-story-map');

module.exports = mod.default ?? mod;
