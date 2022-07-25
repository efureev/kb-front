interface CookieRecord {
  [key: string]: string
}

export function getCookies(): CookieRecord {
  return document.cookie.split('; ').reduce((c, x) => {
    const splitted: string[] = x.split('=')
    c[splitted[0]] = splitted[1]
    return c
  }, <CookieRecord>{})
}
