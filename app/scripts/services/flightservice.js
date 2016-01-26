'use strict';

/**
 * @ngdoc service
 * @name tokeetApp.FlightService
 * @description
 * # main
 * FlightService in the tokeetApp.
 */
angular.module('tokeetApp.services')
        .service('ItineraryService', function ($q, Restangular) {
            var Service = this;            
            this.addItinerary = function (row) {
                var defer = $q.defer();
                var saveG = Restangular.all('itinerary/');
                saveG.customPOST(row).then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.updateItinerary = function (pkey, row) {
                var defer = $q.defer();
                var saveG = Restangular.all('itinerary/update/' + pkey);
                saveG.customPUT(row).then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.saveItinerary = function(ary){
                if(ary.pkey){
                    return Service.updateItinerary(ary.pkey,ary)
                }else{
                    return Service.addItinerary(ary)
                }
            }
        });