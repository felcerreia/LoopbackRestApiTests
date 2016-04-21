//Required Modules
var loopback = require('loopback');                 //API
var explorer = require('loopback-explorer');        //Documentation
var boot = require('loopback-boot');                //Boot scripts


var app = module.exports = loopback();              //new app();



var Item = loopback.createModel('Item', {
                                    description: 'string',
                                    completed: 'boolean'
                                });

app.model(Item);

//Starting Rest Api
app.use('/api', loopback.rest());
//Starting Explorer Documentation
app.use('/explorer', explorer(app, {basePath: '/api'}));


//Setting port and Ready for use
app.listen(8080);
console.log(`Api running ${process.env.NODE_ENV} environment`);