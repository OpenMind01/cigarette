'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:IndexCtrl
 * @description
 * # IndexCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('IndexCtrl', function ($scope, $location, AuthService) {
            if(AuthService.isLoggedIn()){
				$location.path("/");
			}
        });