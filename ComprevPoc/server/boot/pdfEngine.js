module.exports = function(server) {
  var router    =  server.loopback.Router();
  var phantom = require('phantom');
  var path = require('path');
  var mime = require('mime');
  
  router.get('/Pdf', function (req, res){

        //res.setHeader('Content-Type', 'text/html; charset=utf-8');
        try{
            
            phantom.create()
                .then(instance => {
                    phInstance = instance;
                    return instance.createPage();
                })
                .then(page => {
                    sitepage = page;
                    return page.open('http://localhost:3000/Clientes');
                })
                .then(status => {
                    console.log('result:', status);
                    //sitepage.set("paperSize", { format: "A4", orientation: 'portrait', margin: '1cm' });
                    //console.log('page.set');
                    sitepage.render("D:/GitHub/LoopbackRestApiTests/ComprevPoc/client/pdfs/clientes.pdf");
                    //console.log('page.render');
                    sitepage.close();
                    //console.log('page.close');
                    phInstance.exit();
                    console.log('phantom.exit');
                                        
                    var file = 'D:/GitHub/LoopbackRestApiTests/ComprevPoc/client/pdfs/clientes.pdf';

                    var filename = path.basename(file);
                    var mimetype = mime.lookup(file);

                    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                    res.setHeader('Content-type', mimetype);

                    var filestream = fs.createReadStream(file);
                    filestream.pipe(res);
                    
                    
                })
                .catch(error => {
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    var templateErrorPath = require.resolve('../../client/error.marko');
                    template = require('marko').load(templateErrorPath);
                    template.stream({name: 'Visitante', error: err}).pipe(res);
                    console.log(error);
                    phInstance.exit();
                });
            }
        catch (err){
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            var templateErrorPath = require.resolve('../../client/error.marko');
            template = require('marko').load(templateErrorPath);
            template.stream({name: 'Visitante', error: err}).pipe(res);
        }
        
        
  });
  
  server.use(router);
};