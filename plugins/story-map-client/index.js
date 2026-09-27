/**
 * Registers the StoryMap browser client module.
 *
 * `@story-map/remark-story-map` replaces each ```story-map fence with a
 * `.story-map-host[data-story-map-config]` placeholder at build time. This
 * plugin loads the package's browser entry, which mounts the shared
 * `@story-map/react-story-map` renderer into every host (including after
 * Docusaurus SPA navigation) and lazily imports Leaflet client-side.
 *
 * It also registers this site's `story-map-view.js`, which adds the full-page
 * StoryMap view with a Markdown/StoryMap toggle for `story-map: true` documents.
 * That view is Docusaurus host UI, so it lives here rather than in the package.
 */
module.exports = function storyMapClientPlugin() {
  return {
    name: 'story-map-client',
    getClientModules() {
      return [
        require.resolve('@story-map/remark-story-map/client'),
        require.resolve('./story-map-view.js'),
      ];
    },
  };
};
