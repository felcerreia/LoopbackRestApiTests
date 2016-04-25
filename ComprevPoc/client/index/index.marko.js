function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <title>Marko Templating Engine - Loopback Rest Api</title> <link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css\" integrity=\"sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7\" crossorigin=\"anonymous\"> </head> <body> <h2> Olá <em>" +
      escapeXml(data.name) +
      "</em>! </h2> <div class=\"table-responsive\" style=\"width: 450px\"> ");

    if (notEmpty(data.clientes)) {
      out.w("<table class=\"table table-hover\"> <thead> <tr> <th>Nome</th> <th>Email</th> </tr> </thead> <tbody> ");

      forEach(data.clientes, function(cliente) {
        out.w("<tr> <td>" +
          escapeXml(cliente.Nome) +
          "</td> <td>" +
          escapeXml(cliente.Email) +
          "</td> </tr>");
      });

      out.w(" </tbody> </table>");
    }

    out.w(" </div> </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
