// Import after Docusaurus hydration: the StoryMap client starts an observer on
// import, which must not mutate server-rendered markup before React hydrates.
export async function onRouteDidUpdate() {
  if (typeof document !== 'undefined' && document.querySelector('[data-story-map-config]')) {
    const { mountStoryMaps } = await import('@story-map/remark-story-map/client');
    mountStoryMaps(document);
  }
}
