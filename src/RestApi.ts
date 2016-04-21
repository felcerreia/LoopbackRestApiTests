var loopback = require('loopback');
var explorer = require('loopback-explorer');

var app = module.exports = loopback();

var Item = loopback.createModel('Item', {
                                    description: 'string',
                                    completed: 'boolean'
                                });

app.model(Item);
app.use('/api', loopback.rest());
app.use('/explorer', explorer(app, {basePath: '/api'}));
app.listen(8080);
console.log(`Api running ${process.env.NODE_ENV} environment`);