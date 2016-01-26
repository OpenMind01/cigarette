'use strict';

/**
 * @ngdoc service
 * @name tokeetApp.guestService
 * @description
 * # main
 * guestService in the tokeetApp.
 */
angular.module('tokeetApp.services')
        .service('InquiryService', function ($q, Restangular) {
            var Service = this;
            this.getAllInquires = function () {
                var defer = $q.defer();
                Restangular.all('inquiry/all/').getList().then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.getInquires = function (limit, offset) {
                var defer = $q.defer();
                limit = limit || 1000;
                offset = offset || 0;
                Restangular.all('inquiry/all/?limit=' + limit + '&skip=' + offset).getList().then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.addInquiry = function (guest) {
                var defer = $q.defer();
                var saveG = Restangular.all('inquiry/');
                saveG.customPOST(guest).then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
            this.updateInquiry = function (pkey, guest) {
                var defer = $q.defer();
                var saveG = Restangular.all('inquiry/update/' + pkey);
                saveG.customPUT(guest).then(function (data) {
                    defer.resolve(data);
                }, function (response) {
                    defer.reject(response);
                });
                return defer.promise;
            };
        });