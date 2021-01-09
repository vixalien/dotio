var fs = require('fs');
var path = require('path');
var express = require('express');

export default (app) => {
	// React and his sister
	app.use('/lib/react.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
		res.status(200);
		res.send(fs.readFileSync(require.resolve('react/umd/react.production.min.js')).toString());
	});

	app.use('/lib/react-dom.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=UTF-8')
		res.status(200)
		res.send(fs.readFileSync(require.resolve('react-dom/umd/react-dom.production.min.js')).toString());
	});

	// Public
	app.use(express.static(path.join(process.cwd(), 'public/')));

	// Libraries
	app.use('/lib/', express.static(path.join(process.cwd(), '.build/lib/')));

	// Views
	app.use('/views/', express.static(path.join(process.cwd(), '.build/views/')));
}