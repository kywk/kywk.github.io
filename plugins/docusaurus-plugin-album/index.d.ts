import type { LoadContext, Plugin } from '@docusaurus/types';
import type { PluginOptions as BlogPluginOptions } from '@docusaurus/plugin-content-blog';

export interface AlbumPluginOptions extends Partial<BlogPluginOptions> {
  // 可擴充自訂相簿參數
}

declare function pluginAlbum(
  context: LoadContext,
  options?: AlbumPluginOptions
): Promise<Plugin<any>>;

export default pluginAlbum;
