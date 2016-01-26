'use strict';

/**
 * @ngdoc overview
 * @name tokeetApp
 * @description
 * # tokeetApp
 *
 * Main module of the application.
 */
angular
        .module('tokeetApp', [
            'ngAnimate',
            'ngCookies',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'restangular',
            'mgcrea.ngStrap',
            'ui.router',
            'angular-loading-bar',
            'cgNotify',
            'ui.calendar',
            'brantwills.paging',
            'ngColorPicker',
            'ui.select',
            'pikaday',
            'ng-mfb',
            'tokeetApp.constants',
            'tokeetApp.filters',
            'tokeetApp.services',
            'tokeetApp.directives',
            'tokeetApp.controllers'
        ])
        .config(function (RestangularProvider, $alertProvider, $dropdownProvider, cfpLoadingBarProvider, $popoverProvider, $datepickerProvider, pikadayConfigProvider) {
            /**
             * Angular Loading Bar
             */
            cfpLoadingBarProvider.includeBar = true;
            cfpLoadingBarProvider.includeSpinner = false;
            cfpLoadingBarProvider.latencyThreshold = 50;

            RestangularProvider.setBaseUrl('http://api.tokeet.com/');
            RestangularProvider.setMethodOverriders(["patch"]);
            angular.extend($dropdownProvider.defaults, {
                html: true
            });

            // In this case we are mapping the id of each element to the _id field.
            // We also change the Restangular route.
            // The default value for parentResource remains the same.
            RestangularProvider.setRestangularFields({
                pkey: "_id",
                route: "restangularRoute",
                selfLink: "self.href"
            });

            RestangularProvider.setDefaultHttpFields({
                cache: false,
                withCredentials: true
            });

            angular.extend($alertProvider.defaults, {
                animation: 'am-fade-and-slide-top',
                placement: 'top-right',
                container: 'body',
                show: true,
                duration: 3
            });

            // add a response intereceptor to extract the raw array of elements by default.
            /* RestangularProvider.addResponseInterceptor(function(data, operation, what, url, response, deferred) {
             var extractedData;
             // .. to look for getList operations
             if (operation === "customGETLIST") {
             // .. and handle the data and meta data
             extractedData = data.body;
             extractedData.error = data.error;
             extractedData.paging = data.paging;
             } else {
             extractedData = data.data;
             }
             return extractedData;
             });*/

            angular.extend($popoverProvider.defaults, {
                html: true
            });
            angular.extend($datepickerProvider.defaults, {
                dateFormat: 'dd/MM/yyyy',
                startWeek: 1
            });

            pikadayConfigProvider.setConfig({
              format: "DD/MM/YYYY"
            });

        });
