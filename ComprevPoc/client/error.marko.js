function create(__helpers) {
  var str = __helpers.s,
      empty = __helpers.e,
      notEmpty = __helpers.ne,
      escapeXml = __helpers.x;

  return function render(data, out) {
    out.w("<!DOCTYPE html> <html lang=\"en\"> <head> <title>Página de erro</title> <link href=\"http://getbootstrap.com/2.3.2/assets/css/bootstrap.css\" rel=\"stylesheet\"> <link href=\"http://getbootstrap.com/2.3.2/assets/css/bootstrap-responsive.css\" rel=\"stylesheet\"> <link href=\"http://getbootstrap.com/2.3.2/assets/css/docs.css\" rel=\"stylesheet\"> <link href=\"http://getbootstrap.com/2.3.2/assets/js/google-code-prettify/prettify.css\" rel=\"stylesheet\"> </head> <body> <div class=\"jumbotron masthead\"> <div class=\"container\"> <h1> Caramba! </h1> </div> <p> Olá " +
      escapeXml(data.name) +
      "!, infelizmente houve erro ao processar seu pedido. Desculpe.</p> <div class=\"alert alert-danger bs-alert-old-docs\">" +
      escapeXml(data.error) +
      "</div> </div> </body> </html>");
  };
}

(module.exports = require("marko").c(__filename)).c(create);
