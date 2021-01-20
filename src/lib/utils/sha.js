let fs = require('fs');
let path = require('path');

let file = path.join(process.cwd(), '.build', 'var', 'sha.js');

let ensure = () => {
	// Ensure file is created
	if(!fs.existsSync(file)) fs.closeSync(fs.openSync(file, 'w'));
	if(fs.readFileSync(file).toString().length < 3) write({}, true);
}

let write = (object, noEnsure = false) => {
	if(!noEnsure) ensure();
	return fs.writeFileSync(file, JSON.stringify(object))
}

let read = () => {
	ensure();
	return JSON.parse(fs.readFileSync(file).toString());
}

let get = (attr) => read()[attr];

let set = (attr, value) => {
	let sha = read();
	sha[attr] = value;
	write(sha);
}

export {write, read, file, get, set, reset};