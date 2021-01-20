var path = require('path');
var fs = require('fs');

let rollup = require('rollup');

import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import inject from "@rollup/plugin-inject";
import external from '../../plugins/external';

let asyncRead = async (path) => {
	try {
		return fs.readFileSync(path).toString();
	} catch (e) {
		throw e;
	}
}


let compile = (src) => {
	let nativePath = path.join(process.cwd(), src);
	let compiledPath = path.join(process.cwd(), '.build', 'views', src);
	let outputDir = path.dirname(path.join(process.cwd(), '.build', 'views', src))

	if (fs.existsSync(compiledPath)) {

		// Compiled file is present
		return asyncRead(compiledPath);
	} else if (fs.existsSync(nativePath)) {

		let inputOpts = {
			input: nativePath,
			plugins: [
				resolve(),
				external(),
				babel({
					exclude: "node_modules/**",
					babelHelpers: "bundled",
				}),
				inject({ React: 'react' }),
			]
		};

		let outputOpts = {
			format: 'iife',
			name: 'JSH',
			exports: 'auto'
		}
		// log
		console.log("compiling natively nativePath", nativePath);

		// Compile the file
		return rollup.rollup(inputOpts)
		.then(bundle => {
			bundle.write({ dir: outputDir, ...outputOpts });
			return bundle.generate(outputOpts);
		})
		.then(result => result.output[0].code)
	} else {

		// The file is not present
		throw "File not found";
	}
}

export default compile;