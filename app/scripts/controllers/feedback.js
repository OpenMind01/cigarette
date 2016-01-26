'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:BookingCtrl
 * @description
 * # HelpCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
.controller('FeedbackCtrl', function (Restangular, $scope, $modalInstance, ModalService) 
{
    $scope.initialize = function ()
    {
    };
    $scope.initialize();

    $scope.closeModal   = function(){ $modalInstance().dismiss(); };

    $scope.sendFeedback = function () 
    {
        $scope.closeModal();
    };
});
