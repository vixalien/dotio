import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";

import { external, getInputFromGlobs, resolveRoot } from "./config/plugins/index";

// No code-splitting
let globs = Object.entries(getInputFromGlobs('views/**/*.js', '.'))
.map(([key, value]) => {
	return {
		input: { [key]: value },
		output: [
			{
				dir: '.build/views/',
				format: 'umd',
				name: 'JSH',
				exports: 'auto',
				sourcemap: 'inline',
				sourcemapExcludeSources: true,
				globals: {
					react: "React"
				}
			}
		],
		plugins: [
			resolve(),
			resolveRoot(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			inject({ React: 'react' }),
		]
	}
});


export default [
	// Build hydrate function
	{
		input: './config/lib/react/hydrate.js',
		output: [
			{
				globals: {
					react: "React",
					"react-dom": "ReactDOM"
				},
				file: '.build/lib/hydrate.js',
				format: 'iife',
				name: 'hydrate',
			},
		],
		plugins: [
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			commonjs(),
		]
	},
	// Build wrapper
	{
		input: './config/lib/react/wrapper.js',
		output: [
			{
				file: '.build/lib/wrapper.js',
				format: 'umd',
				name: 'wrapper',
				globals: {
					react: "React"
				}
			},
		],
		plugins: [
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			commonjs(),
		]
	},
	// Build Javascript bundles and prepend import React (for Server consumption)
	{
		input: './index.js',
		output: [
			{
				file: '.build/server/index.js',
				format: 'cjs',
				sourcemap: 'inline',
				sourcemapExcludeSources: true
			},
		],
		plugins: [
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			resolveRoot(),
		]
	},
	...globs,
]