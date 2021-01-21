const fs = require('fs');
const path = require('path');
import { flushToHTML } from 'styled-jsx/server'
import fm from 'front-matter';

import renderWithReact from './render';

let resolve = (...args) => path.join(process.cwd(), '.build', ...args)
let read = (...args) => fs.readFileSync(...args).toString();

let templatePath = resolve('lib', 'template.html');
let wrapperPath = resolve('lib', 'wrapper-mdx.js');

export default async (filePath, options = {}, callback) => { // define the template engine
	try {
		// Read files
		let Wrapper = require(wrapperPath);
		let template = read(templatePath);
		let Content = read(filePath);

		// Build props
		let props = options;

		// read front-matter
		let frontmatter = fm(Content);

		Content = frontmatter.body;
		props.attributes = frontmatter.attributes || {};

		// Build the file
		let rendered = await renderWithReact(Content, props);
		
		// flush CSS
		const styles = flushToHTML();

		let html = `<html lang="en" ${options.theme == 'dark' ? 'data-dark': ''}>`;

		rendered = template
			.replace('<!-- styles -->', styles)
			.replace(/<!-- start-html -->([\s\S]*)<!-- end-html -->/g, html)
			.replace('<!-- canonical-url -->', process.DEPLOY_URL + props.url)
			.replace('<!-- component-placeholder -->', rendered)
		
		return callback(null, rendered);
	} catch (err) {
		return callback(err);
	}
}