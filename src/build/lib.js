let fs = require('fs');
let path = require('path');

let resolve = link => path.resolve(process.cwd(), 'public', 'lib', link);
let resolveBuild = link => path.resolve(process.cwd(), '.build', 'js', link);

fs.writeFileSync(resolveBuild('bundle.development.js'),
	fs.readFileSync(resolve('react.development.js'), 'utf8') + ';\n// react\n' +
	fs.readFileSync(resolve('react-dom.development.js'), 'utf8') + ';\n// react-dom\n' +
	fs.readFileSync(resolve('sjx.development.js'), 'utf8') + ';\n// sjx\n'
);

fs.writeFileSync(resolveBuild('bundle.production.min.js'),
	fs.readFileSync(resolve('react.production.min.js'), 'utf8') + ';' +
	fs.readFileSync(resolve('react-dom.production.min.js'), 'utf8') + ';' +
	fs.readFileSync(resolve('sjx.production.min.js'), 'utf8') + ';'
);