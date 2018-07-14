const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const sourceMaps = require('rollup-plugin-sourcemaps')
const camelCase = require('lodash.camelcase')
const typescript = require('rollup-plugin-typescript2')
const json = require('rollup-plugin-json')

const pkg = require('./package.json')

const libraryName = 'rfc-facil'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true},
    {file: pkg.module, format: 'es', sourcemap: true},
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({useTsconfigDeclarationDir: true}),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
