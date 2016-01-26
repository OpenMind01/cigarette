'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('LoginCtrl', function ($scope, $location, $modalInstance, AuthService, notifyService){
            $scope.closeModal = function(){
                $modalInstance().dismiss();
            };
            $scope.doLogin = function(){
                // Login the users
                $scope.loginProcess = true;
                AuthService.doLogin($scope.username, $scope.password).then(function(user){                    
                    $scope.loginProcess = false;
                    $modalInstance().dismiss();
                    $location.path('/guest');
                }, function(){
                    $scope.loginProcess = false;
                    notifyService.alert("error", notifyService.getAlertText('LoginError'));
                });
            };
        });