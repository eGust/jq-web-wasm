declare module 'jq-web-wasm/jq.wasm' {
  export const json: <R, T = object>(data: T, filter: string) => R;
  export const raw: (data: string, filter: string) => string;
  export const promised: {
    json: <R, T = object>(data: T, filter: string) => Promise<R>,
    raw: (data: string, filter: string) => Promise<string>,
  };
}
