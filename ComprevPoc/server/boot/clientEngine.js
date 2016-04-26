module.exports = function(server) {
   
  var router = server.loopback.Router();
  
  router.get('/Clientes', function (req, res) {
      var templatePath = require.resolve('../../client/clientes/index.marko');
      var template = require('marko').load(templatePath);

      server.models.Cliente.find( {limit: 100},  function(err, returned_instances) {  
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          template.stream({name: 'Visitante', clientes: returned_instances}).pipe(res);    
      });
    });
  
  server.use(router);  
};