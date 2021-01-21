/**
 * Module dependencies.
 */
let path = require('path');

let projects = require(path.resolve('.build/data/projects.json'))

exports.show = function(req, res, next){
	var project = req.params.project_id;
	if (!project) return next('route');
	if (Object.keys(projects).indexOf(project) < 0) return next('route');

	res.customRender(project, 'md', path.resolve('projects'), { project });
};


exports.list = function(req, res){
	res.render('index');
};