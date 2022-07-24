declare module '@feugene/mu/src/object/toQueryString.js' {
  interface toQueryStringOptions {
    encodeName: boolean;
  }

  export function toQueryString(object: Record<string, any>, recursive: boolean, options: toQueryStringOptions): string;
}
