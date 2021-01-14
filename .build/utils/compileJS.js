'use strict';

var babel = require('@rollup/plugin-babel');
var resolve = require('@rollup/plugin-node-resolve');
var inject = require('@rollup/plugin-inject');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var babel__default = /*#__PURE__*/_interopDefaultLegacy(babel);
var resolve__default = /*#__PURE__*/_interopDefaultLegacy(resolve);
var inject__default = /*#__PURE__*/_interopDefaultLegacy(inject);

const getBuiltins = () => require('builtins');
const readPkg = require('read-pkg');
const safeResolve = require('safe-resolve');
const semver = require('semver');

var external = ({
  builtins = true,
  dependencies = true,
  packagePath,
  peerDependencies = true,
} = {}) => ({
  name: 'auto-external',
  options(opts) {
    const pkg = readPkg.sync(packagePath);
    let ids = [];

    if (dependencies && pkg.dependencies) {
      ids = ids.concat(Object.keys(pkg.dependencies));
    }

    if (peerDependencies && pkg.peerDependencies) {
      ids = ids.concat(Object.keys(pkg.peerDependencies));
    }

    if (builtins) {
      ids = ids.concat(getBuiltins(semver.valid(builtins)));
    }

    ids = ids.map(id => new RegExp(id + "(\/.+)?"));

    let external = ids;

    if (typeof opts.external === 'function') {
      external = id =>
        opts.external(id) ||
        ids
          .map(safeResolve)
          .filter(Boolean)
          .includes(id);
    }

    if (Array.isArray(opts.external)) {
      external = Array.from(new Set(opts.external.concat(ids)));
    }

    return Object.assign({}, opts, { external });
  },
});

var path = require('path');
var fs = require('fs');

let rollup = require('rollup');

let asyncRead = async (path) => {
	try {
		return fs.readFileSync(path).toString();
	} catch (e) {
		throw e;
	}
};


let compile = (src) => {
	let nativePath = path.join(process.cwd(), src);
	let compiledPath = path.join(process.cwd(), '.build', 'views', src);
	let outputDir = path.dirname(path.join(process.cwd(), '.build', 'views', src));

	if (fs.existsSync(compiledPath)) {
		// log
		console.log("using already compiled file compiledPath", compiledPath);

		// Compiled file is present
		return asyncRead(compiledPath);
	} else if (fs.existsSync(nativePath)) {

		let inputOpts = {
			input: nativePath,
			plugins: [
				resolve__default['default'](),
				external(),
				babel__default['default']({
					exclude: "node_modules/**",
					babelHelpers: "bundled",
				}),
				inject__default['default']({ React: 'react' }),
			]
		};

		let outputOpts = {
			format: 'iife',
			name: 'JSH',
			exports: 'auto'
		};
		// log
		console.log("compiling natively nativePath", nativePath);

		// Compile the file
		return rollup.rollup(inputOpts)
		.then(bundle => {
			// console.log
			console.log("outputDir", outputDir, "src", src);
			bundle.write({ dir: outputDir, ...outputOpts });
			return bundle.generate(outputOpts);
		})
		.then(result => result.output[0].code)
	} else {

		// The file is not present
		throw "File not found";
	}
};

module.exports = compile;
