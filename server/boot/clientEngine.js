module.exports = function(server) {
  // Install a `/` router that renders index.marko template
 
  var router = server.loopback.Router();
  
  var templatePath = require.resolve('../../client/index/index.marko');
  var template = require('marko').load(templatePath);
  
  router.get('/Clientes', function (req, res) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      template.stream({name: 'Fabio Farzat'}).pipe(res);
    });
  
  server.use(router);
};