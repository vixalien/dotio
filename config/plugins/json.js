import path from 'path';

let resolve = (source, root = '.', tolerate = true) => {
	try {
		return require.resolve(path.resolve(process.cwd(), root, source))
	} catch (err) {
		if (!tolerate) throw err;
		return false;
	}
};

let tryResolve = (list, source) => {
	let id = 0;
	let found = false
	while((id != list.length) && !found) {
		let resolved = resolve(source, list[id]);
		if (resolved) found = resolved;
		id++
	}
	return found;
}

export default function json (list = ['.']) {
	return {
		name: 'json', // this name will show up in warnings and errors
		resolveId: (id) => {
			let resolved = tryResolve(list, id);
			if (resolved && id.endsWith('.json')) {
				return resolved;
			}
			return null; // other ids should be handled as usually    
		},
		load: (id) => {
			let resolved = tryResolve(list, id);
			if (resolved && id.endsWith('.json')) {
				let json = require(resolved);
				return `
				let json = ${JSON.stringify(json)};
				export default json;
				${Object.keys(json).map(key => `export let ${key} = ${JSON.stringify(json[key])}`).join('\n')};
				`;
			}
			return null; // other ids should be handled as usually    
		}
	};
}