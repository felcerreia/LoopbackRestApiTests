angular
  .module('app', [
    'lbServices',
    'ngRoute',
    'ui.grid', 'ui.grid.edit','ui.grid.rowEdit', 'ui.grid.cellNav', 'ui.grid.pagination'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/clientes', {
        templateUrl: 'views/clientes.html',
        controller: 'SampleController'
      }).when('/grid', {
        templateUrl: 'views/clientes-ui-grid.html',
        controller: 'clientesUiGrid'
      }).when('/inicio', {
        templateUrl: 'views/index.html',
      }).otherwise({
        redirectTo: "/inicio"
        });
  }]);