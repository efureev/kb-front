import { withoutSuffix } from './route'
import { DEFAULT_LOCALE, extractLocaleFromPath } from '@/i18n'
import type { AppRouteCtx } from '@/types/app'

export function baseUrlFn(url: URL | Location | string) {
  const locale = extractLocaleFromPath(typeof url === 'string' ? url : url.pathname)

  return {
    locale,
    url: locale === DEFAULT_LOCALE ? '/' : `/${locale}/`,
  }
}

export function getAppRouteCtx(url: URL | Location | string): AppRouteCtx {
  const obj = baseUrlFn(url)
  return {
    ...obj,
    route: withoutSuffix(obj.url, '/'),
  }
}
