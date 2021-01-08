/**
 * Module dependencies.
 */

exports.engine = 'html';

exports.list = function(req, res, next){
  res.render('index');
};