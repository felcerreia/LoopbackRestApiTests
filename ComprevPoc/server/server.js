var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();
app.use('/api', loopback.rest());
app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

bootOptions = { "appRootDir": __dirname, 
                "bootScripts" : ["/boot/root.js", "/boot/DefaultData.js", "/boot/clientEngine.js", "/boot/pdfEngine.js"] };


// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});


app.get('remoting').errorHandler = {
  handler: function(err, req, res, defaultHandler) {
    err = app.buildError(err);

    // send the error back to the original handler
    defaultHandler(err);
  },
  disableStackTrace: true
};

app.buildError = function(err) {
  err.message = err.message;
  err.status = 408; // override the status

  // remove the statusCode property
  delete err.statusCode;

  return err;
};