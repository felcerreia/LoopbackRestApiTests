module.exports = function (Cliente) {

    //Registro um novo endpoint
    Cliente.remoteMethod(
        'inserirClienteComEndereco',
        {
            description: 'Insere um cliente e seus endereços atomicamente [transação]',
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
        
        Cliente.beginTransaction({isolationLevel: Cliente.Transaction.READ_COMMITTED}, function(err, tx) {
  
            var tansactionObj = { transaction: tx };
  
            Cliente.create(Cliente, function (err, tansactionObj, obj) {
                if (err) throw err;
                console.log('> Erro durante criação do cliente');
            });

            dto.Enderecos.create(dto.Enderecos, function (err, tansactionObj, obj) {
                if (err) throw err;
                console.log('> Erro durante criação dos endereços do cliente');
            });

            tansactionObj.commit(function (err) {
                console.log('> Erro ao realizar o commit');

                tansactionObj.rollback(function (err) {
                    console.log('> Erro ao realizar o rollback');
                });
            });
  
            return dto; //dto com os Ids após insert
  
        });
        
        
    }

};
