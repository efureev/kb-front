export const authServiceHost = computed<string>(() => import.meta.env.VITE_SERVICE_AUTH_URL)
export const authServicePrefix = 'auth'
export const authEndpoint = `${authServiceHost.value}/${authServicePrefix}`
