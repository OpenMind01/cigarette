'use strict';


/**
 * @ngdoc filter
 * @name tokeetApp.filter:main
 * @function
 * @description Used to capitalize strings
 * # capitalize
 * Filter in the tokeetApp.
 */
angular.module('tokeetApp.filters')
    .filter('emptyField', function() {
        return function(input, all) 
        {
            return (!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) : '';
        }
    });


