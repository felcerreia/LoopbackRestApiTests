angular.module('app').directive('clienteRow', function() {
    return {
        restrict: 'A',
        templateUrl: 'cliente.html',
        link: function(scope, element, attrs) {
            scope.isEditing = false;
            scope.editCliente = function() {
                scope.original = angular.copy(scope.cliente);
                scope.isEditing = true;
            };
            scope.deleteCliente = function() {
                scope.remove(scope.cliente);
            };
            scope.updateCliente = function() {
                scope.update(scope.cliente);
                scope.isEditing = false;
            };
            scope.cancelEdit = function() {
                scope.isEditing = false;
                angular.copy(scope.original, scope.cliente);
            };
        }
    };
});