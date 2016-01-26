'use strict';

/**
 * @ngdoc service
 * @name tokeetApp.guestService
 * @description
 * # main
 * guestService in the tokeetApp.
 */
angular.module('tokeetApp.services')
        .service('GuestService', function ($q, Restangular) {
            var Service = this;
            this.getAllGuests = function () {
                var defer = $q.defer();
                Restangular.all('guest/all/').getList().then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.getGuests = function (limit, offset) {
                var defer = $q.defer();
                limit = limit || 1000;
                offset = offset || 0;
                Restangular.all('guest/all/?limit=' + limit + '&skip=' + offset).getList().then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.addGuest = function (guest) {
                var defer = $q.defer();
                var saveG = Restangular.all('guest/');
                saveG.customPOST(guest).then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.updateGuest = function (pkey, guest) {
                var defer = $q.defer();
                var saveG = Restangular.all('guest/update/' + pkey);
                saveG.customPUT(guest).then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
        });