let fs = require('fs');
let path = require('path');
let glob = require('glob');
let clean = new (require('clean-css'));

let js = glob.sync('css/**/*.css')
	.map(path => [
		path,
		path.replace(/^css\//, '')
	]);

let resolve = link => path.resolve(process.cwd(), link);
let resolveBuild = link => path.resolve(process.cwd(), '.build', 'css', link);

if(!fs.existsSync(resolveBuild('css'))) fs.mkdirSync(resolveBuild('css'))

js.map(([src, dest]) => {
	let code = clean.minify(fs.readFileSync(resolve(src), 'utf8'));
	if (code.errors.length > 0) throw new Error(code.errors);
	if (code.warnings.length > 0) console.warn(code.warnings);
	fs.writeFileSync(resolveBuild(dest), code.styles)
});