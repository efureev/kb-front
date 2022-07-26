import Inspect from 'vite-plugin-inspect'
import eslintPlugin from 'vite-plugin-eslint'
import visualizer from 'rollup-plugin-visualizer'
import setupMockServer from './mock'

export default function setupDevPlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_USE_MOCK } = viteEnv

  return [
    // vite-plugin-mock
    ...(VITE_USE_MOCK ? [setupMockServer(isBuild)] : []),

    eslintPlugin({
      include: ['src/**/*.vue', 'src/**/*.ts', 'src/**/*.tsx'],
    }),
    // Visit http://localhost:3333/__inspect/ to see the inspector
    Inspect(),

    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ]
}
