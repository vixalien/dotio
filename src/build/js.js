let fs = require('fs');
let path = require('path');
let glob = require('glob');
let terser = require('terser');

let js = glob.sync('app/assets/js/**/*.js')
	.map(path => [
		path,
		path.replace(/^app\/assets\/js\//, '')
	]);

let resolve = link => path.resolve(process.cwd(), link);
let resolveBuild = link => path.resolve(process.cwd(), '.build', 'js', link);

if(!fs.existsSync(resolveBuild('.'))) fs.mkdirSync(resolveBuild('.'))

js.map(async ([src, dest]) => {
	fs.writeFileSync(resolveBuild(dest),
		await terser.minify(fs.readFileSync(resolve(src), 'utf8')).then(data => data.code)
	)
});