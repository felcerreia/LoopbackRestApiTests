//Global error handler
module.exports = function() {
  return function(err, req, res, next) {
    err = req.app.buildError(err);
    
    var templateErrorPath = require.resolve('../../client/error.marko');
    var template = require('marko').load(templateErrorPath);
    template.stream({name: 'Visitante', error: err}).pipe(res);
    res.status(404);
    res.setHeader('Content-Type', 'text/html; charset=utf-8'); 
  }
}