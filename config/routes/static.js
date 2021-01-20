var fs = require('fs');
var path = require('path');
var express = require('express');

process.env.NODE_ENV = process.env.VERCEL_ENV || process.env.NODE_ENV || 'production';

export default (app) => {

	// Compiled JS
	app.use(express.static(path.join(process.cwd(), '.build', 'js')));

	// Compiled CSS
	app.use(express.static(path.join(process.cwd(), '.build', 'css')));

	// Public
	app.use(express.static(path.join(process.cwd(), 'public/')));

	// Libraries
	app.use('/lib/', express.static(path.join(process.cwd(), '.build/lib/')));

	// Views
	app.use('/views/', express.static(path.join(process.cwd(), '.build/views/')));
}