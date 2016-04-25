function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x,
      forEach = __helpers.f;

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <title>Marko Templating Engine - Loopback Rest Api</title> </head> <body> <h1> Hello " +
      escapeXml(data.name) +
      "! </h1> ");

    if (notEmpty(data.clientes)) {
      out.w("<ul> ");

      forEach(data.clientes, function(cliente) {
        out.w("<li class=\"color\"> <p>" +
          escapeXml(cliente.Nome) +
          " - " +
          escapeXml(cliente.Email) +
          "</p> </li>");
      });

      out.w(" </ul>");
    } else {
      out.w("<div> Nenhum cliente encontrado! </div>");
    }

    out.w(" </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
