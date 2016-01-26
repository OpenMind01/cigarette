'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
    .controller('SettingsCtrl', function ($scope){
        $scope.dropdown = [
            {text: '<i class="fa fa-home"></i>&nbsp;&nbsp;Rental Settings', href: '/rentals'}, 
            {text: '<i class="fa fa-user"></i>&nbsp;&nbsp;User Settings', href: '/users'},
            {text: '<i class="fa fa-random"></i>&nbsp;&nbsp;Channel Settings', href: '/channels'},
            {divider: true},
            {text: '<i class="fa fa-refresh"></i>&nbsp;&nbsp;Auto-responders', href: '/autoresponders'}
          ];
    });