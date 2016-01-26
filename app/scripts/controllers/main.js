'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers', [])
        .controller('MainCtrl', function ($scope, $location, AuthService) {
            if(AuthService.isLoggedIn() == false){
                $location.path("/");
            }
        });
		