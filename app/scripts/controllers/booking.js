'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:BookingCtrl
 * @description
 * # BookingCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('BookingCtrl', function (Restangular, $scope, $stateParams, $location, ModalService) {
            $scope.initialize = function ()
            {
                var booking_id = $stateParams.bookingId;
                var booking_req = Restangular.one('booking', booking_id).get();
                booking_req.then(function (booking)
                {
                    $scope.booking = booking;
                    $scope.messages = booking.messages;                    
                    Restangular.one('itinerary/booking', $scope.booking.pkey).get().then(function(data){
                        if(data.length > 0){
                            $scope.itinerary = data[0];
                        }else{
                            $scope.itinerary = {booking_id:$scope.booking.pkey}
                        }                        
                    });
                }, function () {
                    $alert({title: 'Ooops!', content: 'Unable to retrieve booking detail.', type: 'error'});
                });

            };
            $scope.initialize();
            $scope.goTo = function (uri) {
                $location.path(uri);
            };            
            
            $scope.addFlight = function(){
                ModalService.showModal({
                    templateUrl: 'views/partials/add_flight.html',
                    controller: 'AddFlightCtrl',
                    inputs: {parentScope: $scope}
                }).then(function (modal) {
                });
            };
            
            $scope.editFlight = function(flight){
                ModalService.showModal({
                    templateUrl: 'views/partials/edit_flight.html',
                    controller: 'EditFlightCtrl',
                    inputs: {
                        parentScope: $scope,
                        flight:flight
                    }
                }).then(function (modal) {
                });
            }
        });
