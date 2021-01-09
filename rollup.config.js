import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";

import { external, getInputFromGlobs} from "./config/plugins/index";

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
			},
		],
		plugins: [
			resolve(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
		]
	},
	{
		input: getInputFromGlobs('views/**/*.js', '.'),
		output: [
			{
				dir: '.build/views/',
				format: 'umd',
				name: 'JSH',
				exports: 'auto'
			}
		],
		plugins: [
			resolve(),
			external(),
			babel({
				exclude: "node_modules/**",
				babelHelpers: "bundled",
			}),
			inject({ React: 'react' }),
		]
	}
]