let fs = require('fs');
let path = require('path');
let glob = require('glob');
let terser = require('terser');

let js = glob.sync('js/**/*.js')
	.map(path => [
		path,
		path.replace(/^js\//, 'js/')
	]);

let resolve = link => path.resolve(process.cwd(), link);
let resolveBuild = link => path.resolve(process.cwd(), '.build', link);

if(!fs.existsSync(resolveBuild('js'))) fs.mkdirSync(resolveBuild('js'))

js.map(async ([src, dest]) => {
	fs.writeFileSync(resolveBuild(dest),
		await terser.minify(fs.readFileSync(resolve(src), 'utf8')).then(data => data.code)
	)
});