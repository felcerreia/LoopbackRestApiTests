module.exports = function (server) {

    var datastore = server.datasources.mysql;
    
    datastore.automigrate(function(){
        //Users Data for tests
        var clientes = [];
        for (var clientIndex = 0; clientIndex < 100; clientIndex++) {
            var cliente = {
                Nome: "Nome " + clientIndex,
                Email: "email" + clientIndex + "@gmail.com",
                DataNasc: "1900-01-01",
                Idade: clientIndex
            };
            clientes.push(cliente);
        }
        server.models.Cliente.create(clientes, function (err, obj) {
            if (err) throw err;
            console.log('> models [cliente] created successfully');
        });
        
        var enderecos = [];
        for (var enderecoIndex = 0; enderecoIndex < 100; enderecoIndex++) {
            var endereco = {
                Bairro: "bairro " + enderecoIndex,
                Cidade: "cidade " + enderecoIndex,
                Rua: "1900-01-01",
                Tipo: "Comercial",
                Numero: enderecoIndex,
                clienteId: enderecoIndex
            };
            enderecos.push(endereco);
        }
        server.models.Endereco.create(enderecos, function (err, obj) {
            if (err) throw err;
            console.log('> models [endereco] created successfully');
        });
    });

    
    
};