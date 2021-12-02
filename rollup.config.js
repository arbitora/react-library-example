/* eslint-disable no-undef */
import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import external from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import { babel } from "@rollup/plugin-babel"

import packageJson from "./package.json"

import path from "path"
/*
import fs from "fs"
const externals = fs.readdirSync(path.join(__dirname, "./node_modules"))
fs.writeFileSync("externals.json", JSON.stringify(externals, null, 4))
*/

const rollupConfig = {
    preserveModules: false,
    input: {
        index: path.join(__dirname, "./src/index.js")
    },
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
    /*
    external: (id, parent, isResolved) => {
        const isExternal = parent != null && id.includes("node_modules")
        console.log(`Resolving: ${id} - ${parent} - ${isResolved} - ${isExternal}`)
        return isExternal
    },
    */
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
