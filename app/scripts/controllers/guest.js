'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:UserCtrl
 * @description
 * # GuestCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('AddGuestCtrl', function ($scope, $modalInstance, parentScope, notifyService, GuestService) {
            $scope.createGuest = function(){
                var ary = {
                    "name": $scope.name,
                    "phone": $scope.phone,
                    "email": $scope.email,
                    "address": {'country': $scope.country, 'address':$scope.address},
                    "notes": $scope.notes
                  };
                $scope.process=true;
                GuestService.addGuest(ary).then(function(){
                    $scope.process=false;
                    notifyService.alert("success", "Guest saved successfuly.");
                    parentScope.reloadData();
                    $scope.closeModal();
                }, function(){
                    $scope.process=false;
                    notifyService.alert("error", "Unable to save guest.");
                });
            };
            $scope.closeModal = function () {
                $modalInstance().dismiss();
            };
        })
        .controller('EditGuestCtrl', function ($scope, $modalInstance, parentScope, notifyService, GuestService, guest) {
            $scope.guest=guest;
            $scope.saveGuest = function(){                
                var ary = {
                    "name": $scope.guest.name,
                    "phone": $scope.guest.phone,
                    "email": $scope.guest.email,
                    "address": {'country': $scope.guest.country, 'address':$scope.guest.address},
                    "notes": $scope.guest.notes
                  };
                $scope.process=true;
                GuestService.updateGuest($scope.guest.pkey, ary).then(function(){
                    $scope.process=false;
                    notifyService.alert("success", "Guest saved successfuly.");
                    parentScope.reloadData();
                    $scope.closeModal();
                }, function(){
                    $scope.process=false;
                    notifyService.alert("error", "Unable to save guest.");
                });
            };
            $scope.closeModal = function () {
                $modalInstance().dismiss();
            };
        });