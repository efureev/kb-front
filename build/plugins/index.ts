import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { splitVendorChunkPlugin } from 'vite'
import setupIcons from './icons'
import setupAutoImport from './auto-import'
import setupVueComponents from './vue-components'
import setupPagesAndLayouts from './pages'
import setupDevPlugins from './setupDevPlugins'

export default function setupVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    vue({ reactivityTransform: true }),
    splitVendorChunkPlugin(),
    Unocss(),
  ]

  // vite-plugin-pages vite-plugin-vue-layouts
  vitePlugins.push(setupPagesAndLayouts())

  // unplugin-auto-import
  vitePlugins.push(setupAutoImport())

  // unplugin-vue-components
  vitePlugins.push(setupVueComponents())

  // unplugin-icons
  vitePlugins.push(setupIcons())

  vitePlugins.push(setupDevPlugins(viteEnv, isBuild))

  return vitePlugins
}
