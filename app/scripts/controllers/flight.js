'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:UserCtrl
 * @description
 * # GuestCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('AddFlightCtrl', function ($scope, $modalInstance, parentScope, notifyService, ItineraryService, airline) {            
            $scope.airlineList = airline;    
            $scope.row = {};
            $scope.createFlight = function(){                
                var ary = {
                    "flight_num": $scope.flight_num,
                    "airline": $scope.row.airline.code,
                    "departure": moment(moment($scope.depart_date).format("YYYY-MM-DD") + ' ' + moment($scope.depart_time).format("HH:mm")).format()
                  };
                var itinerary = parentScope.itinerary;
                if(!itinerary.flights){
                    itinerary.flights = [];
                }
                itinerary.flights.push(ary);                
                $scope.process=true;
                ItineraryService.saveItinerary(itinerary).then(function(){
                    $scope.process=false;
                    notifyService.alert("success", "Flight saved successfuly.");
                    $scope.closeModal();
                }, function(){
                    $scope.process=false;
                    notifyService.alert("error", "Unable to save flight.");
                });
            };
            $scope.closeModal = function () {
                $modalInstance().dismiss();
            };
        })
        .controller('EditFlightCtrl', function ($scope, $modalInstance, parentScope, notifyService, ItineraryService, flight, airline, $filter){
            $scope.airlineList = airline;    
            $scope.flight_num = flight.flight_num;
            $scope.airline = flight.airline;            
            $scope.row = {};
            $scope.row.airline = $filter('filter')(airline, {code:$scope.airline})[0];
            
            $scope.depart_date = moment(flight.departure).format("YYYY-MM-DD");
            $scope.depart_time = moment(flight.departure).toDate();
//            $scope.arrive_date = moment(flight.arrival).format("YYYY-MM-DD")
//            $scope.arrive_time = moment(flight.arrival).toDate();
            
            $scope.editFlight = function(){
                flight.flight_num = $scope.flight_num;
                flight.airline = $scope.row.airline.code,
                flight.departure = moment(moment($scope.depart_date).format("YYYY-MM-DD") + ' ' + moment($scope.depart_time).format("HH:mm")).format();
//                flight.arrival = moment(moment($scope.arrive_date).format("YYYY-MM-DD") + ' ' + moment($scope.arrive_time).format("HH:mm")).format();                
                $scope.process=true;
                var itinerary = parentScope.itinerary;
                ItineraryService.saveItinerary(itinerary).then(function(){
                    $scope.process=false;
                    notifyService.alert("success", "Flight saved successfuly.");
                    $scope.closeModal();
                }, function(){
                    $scope.process=false;
                    notifyService.alert("error", "Unable to save flight.");
                });
            };
            
            $scope.deleteFlight = function(){
                var itinerary = parentScope.itinerary;
                var index = itinerary.flights.indexOf(flight);
                itinerary.flights.splice(index, 1);
                $scope.deleteprocess=true;
                ItineraryService.saveItinerary(itinerary).then(function(){
                    $scope.deleteprocess=false;
                    notifyService.alert("success", "Flight deleted successfuly.");
                    $scope.closeModal();
                }, function(){
                    $scope.deleteprocess=false;
                    notifyService.alert("error", "Unable to save flight.");
                });
            }
            
            $scope.closeModal = function () {
                $modalInstance().dismiss();
            };
        })
        