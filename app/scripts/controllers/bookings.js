'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:BookingCtrl
 * @description
 * # BookingsCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
.controller('BookingsCtrl', function(Restangular, $scope){

    // Get all bookings.
    $scope.bookings = Restangular.all('booking/all/').getList().$object;
});