/* eslint-disable no-undef */
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import { babel } from "@rollup/plugin-babel"
import multiInput from "rollup-plugin-multi-input"

import packageJson from "./package.json"

const rollupConfig = {
    preserveModules: false,
    input: ["./src/components/**/*.js", "./src/hooks/**/*.js", "./src/theme/**/*.js"],
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
        multiInput(),
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
                ]
            ],
            presets: ["@babel/preset-env", ["@babel/preset-react"]]
        }),
        commonjs(),
        postcss(),
        terser({
            format: {
                comments: "all"
            }
        })
    ]
}

console.info(rollupConfig)

export default rollupConfig
