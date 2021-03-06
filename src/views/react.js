const fs = require('fs');
const path = require('path');

const babel = require('@babel/core');
const React = require('react');
const { renderToString } = require('react-dom/server');
import { flushToHTML } from 'styled-jsx/server'

let resolve = (...args) => path.join(process.cwd(), '.build', ...args)
let read = (...args) => fs.readFileSync(...args).toString();

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
		let src = path.relative(path.join(process.cwd(), '.build'), filePath);
		let Content = await import(filePath).then(e => e.default);

		// Build props
		let props = options;

		// Build the file
		let rendered = renderToString(Wrapper(Content, props));
		
		// flush CSS
		const styles = flushToHTML();

		let html = `<html lang="en" ${options.theme == 'dark' ? 'data-dark': ''}>`;

		rendered = template
			.replace('<!-- styles -->', styles)
			.replace(/<!-- start-html -->([\s\S]*)<!-- end-html -->/g, html)
			.replace('<!-- canonical-url -->', process.DEPLOY_URL + props.url)
			.replace('<!-- server-props -->', JSON.stringify(props))
			.replace('<!-- component-placeholder -->', rendered)
			.replace('<!-- hydrate-path -->', src);

		return callback(null, rendered);
	} catch (err) {
		return callback(err);
	}
}