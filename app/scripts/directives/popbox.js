'use strict';

/**
 * @ngdoc directive
 * @name tokeetApp.directive:include
 * @description
 * # include
 */
angular.module('tokeetApp.directives')
        .directive('popBox', function (ModalService) {
            return {
                restrict: 'A',
                scope: {
                    options: '=popBox',                
                },
                link: function ($scope, $elem, $attributes) {
                    $elem.on('click', function (e) {
                        ModalService.showModal($scope.options)
                        e.preventDefault();
                    });
                },
            };
        })