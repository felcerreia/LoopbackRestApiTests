module.exports = function(server) {
  var webPage = require('webpage');
  var router = server.loopback.Router();
  
  router.get('/Pdf', function (req, res){
        
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        
        try{
            var page = webPage.create();

            page.viewportSize = { width: 1920, height: 1080 };
            
            page.open("/Clientes", function start(status) {
                page.render('clientes.pdf', {format: 'pdf', quality: '100'});
                phantom.exit();
            });    
        }
        catch (err){
            var templateErrorPath = require.resolve('../../client/error.marko');
            template = require('marko').load(templateErrorPath);
            template.stream({name: 'Visitante', error: err}).pipe(res);
        }
        
        
  });
  
  server.use(router);
};