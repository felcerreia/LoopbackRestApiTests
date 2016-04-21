/// <reference path="../src/typings/tsd.d.ts" />

import expect = require('expect.js');

var loopback = require('loopback');

describe('ASTExplorer Tests', function () {
    
    
    it('Should power up an API using LoopBack', function () {
        
        var app = module.exports = loopback();
        
        var Item = loopback.createModel(
        'Item',
        {
            description: 'string',
            completed: 'boolean'
        }
        );
        
        app.model(Item);
        app.use('/api', loopback.rest());
        app.listen(8080);
        
        expect(true).to.be(true);
    });
});