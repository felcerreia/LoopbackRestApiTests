function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <title>Lista de Clientes</title> <script src=\"https://code.jquery.com/jquery-1.12.0.min.js\"></script> <script src=\"https://cdn.datatables.net/1.10.11/js/jquery.dataTables.min.js\"></script> <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdn.datatables.net/1.10.11/css/jquery.dataTables.min.css\"> <link rel=\"stylesheet\" type=\"text/css\" href=\"https://datatables.net/media/css/site-examples.css?_=d9c2c842fd3bd3ec7e90423dc6c620c1\"> <script>\r\n            $(document).ready(function() {\r\n                $('#example').DataTable();\r\n            } );\r\n        </script> </head> <body class=\"wide comments example\"> <div class=\"fw-container\"> <div class=\"nav-main\">&nbsp;</div> <div class=\"fw-body\"> <div class=\"content\"> <h1 class=\"page_title\">Lista de Clientes</h1> <div class=\"info\"> <a href=\"/Pdf\">Gerar pdf</a> </div> ");

    if (notEmpty(data.clientes)) {
      out.w("<table id=\"example\" class=\"display\" cellspacing=\"0\" width=\"80%\"> <thead> <tr> <th>Nome</th> <th>Email</th> </tr> </thead> <tbody> ");

      forEach(data.clientes, function(cliente) {
        out.w("<tr> <td>" +
          escapeXml(cliente.Nome) +
          "</td> <td>" +
          escapeXml(cliente.Email) +
          "</td> </tr>");
      });

      out.w(" </tbody> </table>");
    }

    out.w(" </div> </div> </div> </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
