import fs from 'fs';
import path from 'path';
import { minify } from 'html-minifier';

let resolve = id => fs.existsSync(id) && fs.statSync(id).isFile()

export default function resolveHTML (options = {}) {
	let alwaysOutput = options.alwaysOutput;
	let html = '';
	return {
		name: 'resolve-html', // this name will show up in warnings and errors
		load ( id ) {
			if(!resolve(id)) return;
			return minify(fs.readFileSync(id).toString(), {
				collapseBooleanAttributes: true,
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				decodeEntities: true,
				removeAttributeQuotes: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttribute: true,
				removeStyleLinkTypeAttributes: true,
			})
		},
		transform(code, id) {
			if (!resolve(id)) return;

			html = code;

			return {
					code: ``,
					map: { mappings: "" }
			};
		},
		/* output an html file with all html that was imported without being assigned a variable */
		writeBundle(options, bundle) {
			for (let file in bundle) {
				let output = options.output || path.join(path.dirname(options.file), path.basename(file, path.extname(options.file)) + ".html");
				/* write the css content to a file */
				fs.writeFileSync(output, html);
			}
		}
	};
}