module.exports = function (Cliente) {

    var app = require('../../server/server.js');
    var Endereco;

    Cliente.observe('loaded', function (ctx, next) {
        Endereco = app.models.Endereco;
        next();
    });


    //Registro um novo endpoint
    Cliente.remoteMethod(
        'inserirClienteComEndereco',
        {
            description: 'Insere um cliente e seus endereços atomicamente [em uma transação de banco]',
            accepts: {
                arg: 'dto',
                type: 'inserirClienteComEndereco',
                required: true,
                http: {
                    source: 'body'
                }
            },
            http: { path: '/:inserirClienteComEndereco', verb: 'post' },
            returns: { arg: 'dto', type: 'DtoInserirCliente' }
        });

    //Agora insiro a lógica       
    Cliente.inserirClienteComEndereco = function (dto, callback) {

        Cliente.beginTransaction({ isolationLevel: Cliente.Transaction.READ_COMMITTED }, function (err, tx) {
            var options = { transaction: tx };
            if (err) {
                tx.rollback(function (err) {
                    if (err) console.log(err);
                });
                throw err;
            }

            Cliente.create(dto.cliente, function (err, options, newCliente) {
                if (err) {
                    tx.rollback(function (err) {
                        if (err) console.log(err);
                    });
                    throw err;
                }

                Endereco.create(dto.enderecos, function (err, options, newEnderecos) {
                    if (err) {
                        tx.rollback(function (err) {
                            if (err) console.log(err);
                        });
                        throw err;
                    }

                    tx.commit(function (err) {
                        if (err) {
                            throw err;
                        }

                        //console.log(JSON.stringify(dto));

                        callback(null, JSON.stringify(dto));
                    });
                });
            });
        });
    }
};
