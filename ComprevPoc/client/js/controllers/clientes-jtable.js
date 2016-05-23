(function () {
    'use strict';

    angular
        .module('app')
        .controller('clientesJtable', ControllerController);

    ControllerController.$inject = ['$scope', 'Cliente'];
    function ControllerController($scope, Cliente) {
        var vm = this;

        $scope.jtable = function () {
            $('#myjtable').jtable({
                title: 'Clientes',
                paging: true,
                pageSize: 10,
                sorting: true,
                actions: {
                    listAction: function (postData, jtParams) {
                        return $.Deferred(function ($dfd) {
                            Cliente.find().$promise.then(function (results) {
                                var t = { Result: "OK", Records: results, TotalRecordCount: 100 };
                                $dfd.resolve(t);
                            })
                        });
                    }
                },
                fields: {
                    id: {
                        key: true,
                        list: false
                    },
                    Nome: {
                        title: 'Nome',
                    },
                    Email: {
                        title: 'Email',
                        width: '20%'
                    },
                    Idade: {
                        title: 'Idade',
                        width: '30%',
                    },
                    DataNasc: {
                        title: 'Data de Nascimento',
                        width: '30%',
                    }
                }
            });
            $('#myjtable').jtable('load');
        }




    }
})();