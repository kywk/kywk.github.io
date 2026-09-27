/**
 * Registers the StoryMap browser client module.
 *
 * `@story-map/remark-story-map` replaces each ```story-map fence with a
 * `.story-map-host[data-story-map-config]` placeholder at build time. This
 * plugin loads the package's browser entry, which mounts the shared
 * `@story-map/react-story-map` renderer into every host (including after
 * Docusaurus SPA navigation) and lazily imports Leaflet client-side.
 */
module.exports = function storyMapClientPlugin() {
  return {
    name: 'story-map-client',
    getClientModules() {
      return [require.resolve('@story-map/remark-story-map/client')];
    },
  };
};
