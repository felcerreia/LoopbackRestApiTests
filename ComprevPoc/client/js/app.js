angular
  .module('app', [
    'lbServices',
    'ngRoute'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/clientes', {
        templateUrl: 'views/clientes.html',
        controller: 'SampleController'
      }).when('/inicio', {
        templateUrl: 'views/index.html',
      }).otherwise({
        redirectTo: "/inicio"
        });
  }]);