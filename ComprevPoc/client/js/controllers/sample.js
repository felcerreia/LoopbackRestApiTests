angular.module('app').controller('SampleController', ['$scope', 'Cliente', function ($scope, Cliente) {
    $scope.clientes = [];
    function getClientes() {
        Cliente
            .find()
            .$promise
            .then(function (results) {
                $scope.clientes = results;
            });
    }
    getClientes();

    $scope.addCliente = function () {
        Cliente
            .create($scope.newCliente)
            .$promise
            .then(function (cliente) {
                $scope.clientes.push(cliente);
                $scope.newCliente = {};
            });
    };

    $scope.remove = function (cliente) {
        Cliente
            .deleteById(cliente)
            .$promise
            .then(function () {
                var index = $scope.clientes.indexOf(cliente);
                $scope.clientes.splice(index, 1);
            });
    };
    
    $scope.update = function (cliente) {
        cliente.$save();
    }
}]);