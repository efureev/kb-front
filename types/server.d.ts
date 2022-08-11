export interface ServerCtx {
  modules: Set<string>,
  teleports?: Record<string, string>,
}
