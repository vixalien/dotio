var fs = require('fs');
var path = require('path');

import react from './views/react';
import markdown from './views/mdx/index';

let serve = (filePath, options, callback) => { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)
    // this is an extremely simple template engine
    var rendered = content.toString()
    return callback(null, rendered)
  })
}

export default (app) => {
	// set our default template engine to "ejs"
	// which prevents the need for using file extensions
	app.engine('html', serve);
	app.engine('ejs', serve);
	app.engine('hbs', serve);

	// react
	app.engine('js', react);
	app.engine('jsx', react);

	// markdown
	app.engine('md', markdown);
	app.engine('mdx', markdown);

	app.set('view engine', 'js');

	// set views for error and 404 pages
	app.set('views', path.join(process.cwd(), 'views', 'default'));
}