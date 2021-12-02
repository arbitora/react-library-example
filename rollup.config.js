/* eslint-disable no-undef */
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import { babel } from "@rollup/plugin-babel"

import packageJson from "./package.json"
import fs from "fs"

const chunkArray = fs
    .readFileSync("./src/index.js", "utf8")
    .split("\n") // -> all lines
    .filter((line) => line.includes(" from ")) // -> lines which export something
    .map((line) => "src/" + /.* from ('|")(\.\/|~)?(.*)('|").*/g.exec(line)[3]) // -> module paths

console.log(chunkArray)
const input = {
    index: "src/index.js"
}
chunkArray.forEach((path) => {
    const name = path // 'yolo/FooBar'
        .split("/") // -> ['yolo', 'FooBar']
        .pop() // -> 'FooBar'
    //.replace(/^\w/, c => c.toLowerCase()) // -> 'fooBar'
    input[name] = path
})

const rollupConfig = {
    preserveModules: false,
    input,
    output: [
        {
            dir: "dist/",
            format: "cjs",
            sourcemap: true,
            name: packageJson.name,
            entryFileNames: "[name].js",
            exports: "auto"
        },
        {
            dir: "dist/",
            format: "esm",
            sourcemap: true,
            entryFileNames: "esm-[name].js"
        }
    ],
    plugins: [
        external(),
        resolve({ preferBuiltins: true, mainFields: ["browser"] }),
        babel({
            babelrc: false,
            babelHelpers: "runtime",
            exclude: "node_modules/**",
            plugins: [
                [
                    "@babel/plugin-transform-runtime",
                    {
                        absoluteRuntime: false,
                        corejs: false,
                        helpers: true,
                        regenerator: true,
                        useESModules: false
                    }
                ],
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator"
            ],
            presets: [
                "@babel/preset-env",
                [
                    "@babel/preset-react",
                    {
                        runtime: "automatic"
                    }
                ]
            ]
        }),
        commonjs(),
        postcss(),
        terser()
    ]
}

console.info(rollupConfig)

export default rollupConfig
