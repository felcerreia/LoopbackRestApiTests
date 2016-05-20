(function() {
'use strict';

    angular
        .module('app')
        .controller('clientesUiGrid', ControllerController);

    ControllerController.$inject = ['$scope', 'Cliente', 'uiGridConstants'];
    function ControllerController($scope, Cliente, uiGridConstants) {
        var vm = this;
        
        $scope.clientes = [];
        function getClientes() {
            Cliente
                .find()
                .$promise
                .then(function (results) {
                    $scope.gridOptions.data = results;
                });
        }
        getClientes();
        
        $scope.teste = function (item) {
            console.log(item);
        }
        
  $scope.gridOptions = {
    data: $scope.clientes,
    enableFiltering: true,
    paginationPageSize: 10,
    rowHeight: 40,
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    },
    columnDefs: [
    { name:'id', maxWidth:50 },
    { name:'Nome' },
    { name:'Email' },
    { name:'Idade', maxWidth:80 },
    { name:'DataNasc', displayName: 'Data de Nascimento', type: 'date', cellFilter: 'date:"dd/MM/yyyy"', maxWidth: 160 },
    { name:'Actions', cellTemplate:'<a class="btn btn-primary" ng-click="grid.appScope.teste(row.entity)">Fazer algo</a>', enableFiltering: false}
    ]
  };
        
        
        
        
    }
})();