const fs = require('fs');
const path = require('path');

const babel = require('@babel/core');
const React = require('react');
const { renderToString } = require('react-dom/server');
import { flushToHTML } from 'styled-jsx/server'

let resolve = (...args) => path.join(process.cwd(), '.build', ...args)
let read = (...args) => fs.readFileSync(...args).toString();
let deploy_url = () => {
	let deploy_url = process.env.VERCEL_URL || process.env.URL || 'vixaliendotio.vercel.app';
	deploy_url.startsWith('localhost') ? deploy_url = "http://" + deploy_url : deploy_url = "https://" + deploy_url
	return deploy_url;
}

let templatePath = resolve('lib', 'template.html');
let wrapperPath = resolve('lib', 'wrapper.js');
let hydratePath = resolve('lib', 'hydrate.js');

export default async (filePath, options, callback) => { // define the template engine
	try {
		// Load required files
		let template = read(templatePath);
		let Wrapper = require(wrapperPath);
		let hydrate = read(hydratePath);	

		// Load the file
		let src = path.relative(process.cwd(), filePath);
		let buildSrc = resolve('views', src);
		let Content = await import(buildSrc).then(e => e.default);

		// Build props
		let props = options;

		// Build the file
		let rendered = renderToString(Wrapper(Content, props));
		
		// flush CSS
		const styles = flushToHTML();

		rendered = template
			.replace('<!-- styles -->', styles)
			.replace('<!-- canonical-url -->', deploy_url + props.url)
			.replace('<!-- server-props -->', JSON.stringify(props))
			.replace('<!-- component-placeholder -->', rendered)
			.replace('<!-- hydrate-path -->', src);

		return callback(null, rendered);
	} catch (err) {
		return callback(err);
	}
}