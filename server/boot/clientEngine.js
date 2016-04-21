module.exports = function(server) {
  // Install a `/` that renders index.marko template
 
  var router = server.loopback.Router();
  
  var templatePath = require.resolve('../../client/index/index.marko');
  var template = require('marko').load(templatePath);
  
  
  router.get('/', function (req, res) {
      template.stream({name: 'Visitante'}).pipe(res);
    });
  
  server.use(router);
};