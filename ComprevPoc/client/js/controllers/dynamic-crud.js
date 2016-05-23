(function () {
    'use strict';

    angular
        .module('app')
        .controller('clientesUiGrid', ControllerController);

    ControllerController.$inject = ['$scope', 'Cliente', 'uiGridConstants'];
    function ControllerController($scope, Cliente, uiGridConstants) {
        var vm = this;

        $scope.table = false;
        $scope.clientes = [];
        function getClientes() {
            Cliente
                .find()
                .$promise
                .then(function (results) {
                    $scope.gridOptions.data = results;
                    $scope.table = true;
                });
        }

        $scope.teste = function (item) {
            console.log(item);
            console.log();
        }

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
                    var index = $scope.gridOptions.data.indexOf(cliente);
                    $scope.gridOptions.data.splice(index, 1);
                });
        };

        $scope.update = function (cliente) {
            cliente.$save();
        }

        setTimeout(function () {
            console.log("timeout");
            $scope.gridOptions = {
                enableFiltering: true,
                paginationPageSize: 10,
                rowHeight: 40,
                onRegisterApi: function (gridApi) {
                    $scope.gridApi = gridApi;
                },
                columnDefs: [
                    { name: 'id', maxWidth: 50 },
                    { name: 'Nome' },
                    { name: 'Email' },
                    { name: 'Idade', maxWidth: 80 },
                    { name: 'DataNasc', displayName: 'Data de Nascimento', type: 'date', cellFilter: 'date:"dd/MM/yyyy"', maxWidth: 160 },
                    { name: 'Actions', cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.remove(row.entity)">Apagar</a>', enableFiltering: false }
                ]
            };
            getClientes();
        }, 2000)
    }
})();