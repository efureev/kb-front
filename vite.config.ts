import { resolve } from 'path'
import dayjs from 'dayjs'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
// import eslintPlugin from 'vite-plugin-eslint'
// import vuePlugin from '@vitejs/plugin-vue'
// import Components from 'unplugin-vue-components/vite'
// import Pages from 'vite-plugin-pages'
// import Layouts from 'vite-plugin-vue-layouts'
// import Icons from 'unplugin-icons/vite'
// import IconsResolver from 'unplugin-icons/resolver'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import visualizer from 'rollup-plugin-visualizer'
// import Unocss from 'unocss/vite'
// import presetMini from '@unocss/preset-mini'
// import presetUno from '@unocss/preset-uno'
// import presetWebFonts from '@unocss/preset-web-fonts'
// import AutoImport from 'unplugin-auto-import/vite'
// import Inspect from 'vite-plugin-inspect'
import setupVitePlugins from './build/plugins'
import { wrapperEnv } from './build/utils'
import pkg from './package.json'
// import mkcert from 'vite-plugin-mkcert'

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }: ConfigEnv) => {
  const isProd = mode === 'production'
  const isDev = mode === 'development'
  const isBuild = command === 'build'

  // const isTest = mode === 'test'
  // const isReport = mode === 'report'
  // const root = process.cwd()
  const env = loadEnv(mode, resolve(__dirname, './env'))
  const viteEnv = wrapperEnv(env)

  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_DROP_CONSOLE }
    = viteEnv

  const config: UserConfig = {
    base: VITE_PUBLIC_PATH,
    envDir: resolve(__dirname, './env'),
    plugins: setupVitePlugins(viteEnv, isBuild),
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '#\/': resolve(__dirname, 'types'),
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    // additionalData: `@use "@/assets/styles/element/index.scss" as *;`
    // }
    // }
    // }
    server: {
      // Listening on all local IPs
      host: true,
      open: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      // proxy: createProxy(VITE_PROXY),
    },

    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },

    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
  }

  if (isProd) {
    config.build = {
      target: 'esnext',
      minify: 'esbuild',
      manifest: true,
    }
  }

  if (isDev) {
    config.optimizeDeps = {
      include: [
        'vue',
        'vue-router',
        '@vueuse/core',
        '@iconify/iconify',
      ],
      exclude: [
        // 'vue-demi'
      ],
    }
  }

  return config
}

