let fs = require('fs');
let path = require('path');
let glob = require('glob');
let terser = require('terser');

let js = glob.sync('app/assets/js/*.js')
	.map(path => [
		path,
		path.replace(/^app\/assets\/js\//, '')
	]);

let single = glob.sync('app/assets/js/single/**/*.js')
	.map(path => [
		path,
		path.replace(/^app\/assets\/js\/single\//, '')
	]);

let resolve = link => path.resolve(process.cwd(), link);
let resolveBuild = link => path.resolve(process.cwd(), '.build', 'js', link);

if(!fs.existsSync(resolveBuild('..'))) fs.mkdirSync(resolveBuild('..'))
if(!fs.existsSync(resolveBuild('.'))) fs.mkdirSync(resolveBuild('.'))

single.map(async ([src, dest]) => {
	fs.writeFileSync(resolveBuild(dest),
		await terser.minify(fs.readFileSync(resolve(src), 'utf8')).then(data => data.code)
	)
});

Promise.all(js.map(async ([src]) => {
	return await terser.minify(fs.readFileSync(resolve(src), 'utf8')).then(data => data.code)
})).then(codes => {
	fs.writeFileSync(resolveBuild('bundle.js'),
		codes.join(';\n')
	);
})