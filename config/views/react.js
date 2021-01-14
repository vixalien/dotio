const fs = require('fs');
const path = require('path');

const babel = require('@babel/core');
const React = require('react');
const { renderToString } = require('react-dom/server');

let buildPath = path.join(process.cwd(), '.build');
let templatePath = path.join(buildPath, 'lib', 'template.html');
let wrapperPath = path.join(buildPath, 'lib', 'wrapper.js');
let hydratePath = path.join(buildPath, 'lib', 'hydrate.js');

export default async (filePath, options, callback) => { // define the template engine
	try {
		// Load required files
		let template = fs.readFileSync(templatePath).toString();
		let Wrapper = require(wrapperPath);
		let hydrate = fs.readFileSync(hydratePath).toString();	

		// Load the file
		let src = path.relative(process.cwd(), filePath);
		let buildSrc = path.join(buildPath, 'views', src);
		let Content = await import(buildSrc).then(e => e.default);

		console.log('Content', Content);

		// Build props
		let props = options;

		let deploy_url = process.env.VERCEL_URL || process.env.URL || 'vixaliendotio.vercel.app';
		deploy_url.startsWith('localhost') ? deploy_url = "http://" + deploy_url : deploy_url = "https://" + deploy_url

		// Build the file
		let rendered = renderToString(Wrapper(Content, props));
		rendered = template
			.replace('<!-- canonical-url -->', deploy_url)
			.replace('<!-- server-props -->', JSON.stringify(props))
			.replace('<!-- component-placeholder -->', rendered)
			.replace('<!-- hydrate-path -->', src);

		return callback(null, rendered);
	} catch (err) {
		return callback(err);
	}
}