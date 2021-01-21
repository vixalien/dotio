import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import { terser } from "rollup-plugin-terser";

import { external, getInputFromGlobs, resolveRoot, resolveHTML, json } from "./src/plugins/index";

// No code-splitting
let globs = Object.entries(getInputFromGlobs('app/views/**/*.js', 'app/views'))
.map(([key, value]) => {
	return {
		input: { [key]: value },
		output: { 
			dir: '.build/views/',
			format: 'umd',
			name: 'JSH',
			exports: 'auto',
			sourcemap: 'inline',
			sourcemapExcludeSources: true,
			globals: {
				react: "React",
				'styled-jsx/style': "_JSXStyle"
			}
		},
		plugins: [
			resolve(),
			resolveRoot(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			inject({ React: 'react' }),
			terser(),
			json()
		]
	}
});


export default [
	// Build hydrate function
	{
		input: 'src/lib/react/hydrate.js',
		output: {
			globals: {
				react: "React",
				"react-dom": "ReactDOM"
			},
			file: '.build/lib/hydrate.js',
			format: 'iife',
			name: 'hydrate',
		},
		plugins: [
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			commonjs(),
			terser()
		]
	},
	// Build wrappers
	{
		input: 'src/lib/react/wrapper.js',
		output: {
			file: '.build/lib/wrapper.js',
			format: 'umd',
			name: 'wrapper',
			globals: {
				react: "React"
			}
		},
		plugins: [
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			commonjs(),
			terser()
		]
	},
	{
		input: 'src/lib/react/wrapper-mdx.js',
		output: {
			file: '.build/lib/wrapper-mdx.js',
			format: 'umd',
			name: 'wrapper',
			globals: {
				react: "React"
			}
		},
		plugins: [
			resolveRoot(),
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			inject({ React: 'react' }),
			commonjs(),
			json()
		]
	},
	// Build Javascript bundles and prepend import React (for Server consumption)
	{
		input: 'src/index.js',
		output: {
			file: '.build/server/index.js',
			format: 'cjs',
			sourcemap: 'inline',
			sourcemapExcludeSources: true
		},
		plugins: [
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			resolveRoot(),
			json(),
			terser()
		]
	},
	{
		input:  'src/lib/react/template.html',
		output: [
			{
				file: '.build/lib/template.html'
			},
		],
		plugins: [
			resolveHTML()
		]
	},
	...globs,
]
