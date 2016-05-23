angular
  .module('app', [
    'lbServices',
    'ngRoute',
    'ui.grid', 'ui.grid.edit','ui.grid.rowEdit', 'ui.grid.cellNav', 'ui.grid.pagination',
    'ui.bootstrap'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/clientes', {
        templateUrl: 'views/clientes.html',
        controller: 'SampleController'
      }).when('/grid', {
        templateUrl: 'views/clientes-ui-grid.html',
        controller: 'clientesUiGrid'
      }).when('/jtable', {
        templateUrl: 'views/clientes-jtable.html',
        controller: 'clientesJtable'
      }).when('/inicio', {
        templateUrl: 'views/index.html',
      }).otherwise({
        redirectTo: "/inicio"
        });
  }]);