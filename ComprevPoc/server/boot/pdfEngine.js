/**
 * https://www.npmjs.com/package/html-pdf
 * 
 * Seria um get com parametros. Exemplo:
 * 
 * Qual view renderizar
 * Quais opções (ler um json talvez)
 */

module.exports = function (server) {
    var router = server.loopback.Router();
    var pdf = require('html-pdf');

    var options = {
        format: 'A4',
        header: {
            "height": "45mm",
            "contents": '<div style="text-align: center;">TOPO</div>'
        },
        "footer": {
            "height": "28mm",
            "contents": '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>'
        }
    };

    router.get('/Pdf', function (req, res) {
        //Renderiza a própria view
        var templatePath = require.resolve('../../client/clientes/index.marko');
        var template = require('marko').load(templatePath);

        server.models.Cliente.find({ limit: 100 }, function (err, returned_instances) {
            //ao invés de escrever na stream de saída, compila o html
            var html = template.renderSync({ name: 'Visitante', clientes: returned_instances });
            
            //passa o html para o criador com as opções preciamente definidas
            pdf.create(html, options).toFile("D:/GitHub/LoopbackRestApiTests/ComprevPoc/client/pdfs/clientes.pdf", function (err, response) {
                //console.log(response.filename);
                res.redirect('/pdfs/clientes.pdf');
            });
        });
    });

    server.use(router);
};