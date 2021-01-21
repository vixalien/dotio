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

export default function resolveRoot (list = ['.']) {
	return {
		name: 'resolve-root', // this name will show up in warnings and errors
		resolveId: (id) => {
			let resolved = tryResolve(list, id);
			if (resolved) {
				return resolved;
			}
			return null; // other ids should be handled as usually    
		},
	};
}