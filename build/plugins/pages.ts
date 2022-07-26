import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

export default function setupPagesAndLayouts() {
  return [
    Pages({
      extensions: ['vue', 'md'],
      resolver: 'vue',
    }),
    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),
  ]
}
