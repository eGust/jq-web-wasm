# jq-web-wasm

This is a fork of [jq-web](https://www.npmjs.com/package/jq-web) to support Node v18+ and TypeScript.

## Usage

1. Install

    ```bash
    npm i jq-web-wasm
    # or from Github
    npm i github:eGust/jq-web-wasm
    # or
    yarn add jq-web-wasm
    # or
    pnpm i jq-web-wasm
    ```

2. Use with TypeScript

    ```ts
    // demo.ts
    import { assert } from 'node:console';
    import { promised } from 'jq-web-wasm/jq.wasm';

    const demo = async () => {
      const foo = await promised.json({ foo: 'bar' }, '.foo');
      const baz = JSON.parse(await promised.raw(JSON.stringify({ baz: 'bar' }), '.baz'));
      console.debug({ foo, baz });
      assert(foo === 'bar', `foo is not "bar" (got ${foo})`);
      assert(baz === 'bar', `baz is not "bar" (got ${baz})`);
    };

    demo();
    ```

    ```bash
    # run it in shell
    ❯ tsx demo.ts # [tsx](https://www.npmjs.com/package/tsx)
    { foo: 'bar', baz: 'bar' }
    ```

## Motivation

Due to Node v18 introduced `fetch` API, the original [jq-web](https://github.com/fiatjaf/jq-web) uses `fetch` to detect whether it's running in a browser env. Unfortunately, this way no longer works since Node v18.

This package simply replaced `typeof fetch === "function"` with `(typeof global !== 'object' && typeof fetch === "function")` to get it work. In theory it should work for any version that support WASM. However, Node v14 is almost reaches its [EOL](https://endoflife.date/nodejs), so I put the engine to require Node >= 16.

## Compile by yourself

Please check `scripts` in `package.json`:

1. run `pnpm i` to install dependencies.
2. run `pnpm copy-wasm-to-dist` to copy `jq.wasm.wasm` to `dist/`.
3. run `pnpm reformat:jq.wasm.js` to generate readable `dist/reformatted-jq.wasm.js`.
4. update `dist/reformatted-jq.wasm.js` and replace `dist/jq.wasm.js` with it.
5. run `pnpm minify` to create `dist/jq.wasm.min.js`

> Sure you can use `npm` or `yarn` instead.
