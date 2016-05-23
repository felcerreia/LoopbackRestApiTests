(function () {
    'use strict';

    angular
        .module('app')
        .controller('clientesUiGrid', ControllerController);

    ControllerController.$inject = ['$scope', 'Cliente', 'uiGridConstants', '$uibModal'];
    function ControllerController($scope, Cliente, uiGridConstant, $uibModal) {
        var vm = this;

        function getClientes() {
            Cliente
                .find()
                .$promise
                .then(function (results) {
                    $scope.gridOptions.data = results;
                });
        }
        getClientes();

        $scope.addCliente = function () {
            Cliente
                .create($scope.newCliente)
                .$promise
                .then(function (cliente) {
                    $scope.gridOptions.data.push(cliente);
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

        $scope.cancelUpdate = function () {

        }

        $scope.editModal = function (item) {
            //$scope.editCliente = item;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'editModal.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function () {
                        return item;
                    }
                }
            });
            
            modalInstance.result.then(function (editedItem) {
               var fallback = angular.copy(item);
               editedItem.$save().then(function () {
                   angular.copy(editedItem, item);
                   console.log('salvo')
               }, function() {
                   console.log('erro');
               })
            });
        }

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
                { name: 'Actions', cellTemplate: '<a class="btn btn-primary" ng-click="grid.appScope.remove(row.entity)">Apagar</a><a class="btn btn-primary" ng-click="grid.appScope.editModal(row.entity)">Editar</a>', enableFiltering: false },
            ]
        };
    }
})();

angular.module('app').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

  $scope.editCliente = angular.copy(items);

  $scope.ok = function () {
    $uibModalInstance.close($scope.editCliente);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});