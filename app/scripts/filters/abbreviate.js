'use strict';


/**
 * @ngdoc filter
 * @name tokeetApp.filter:main
 * @function
 * @description Used to abbreviate strings
 * # abbreviate
 * Filter in the tokeetApp.
 */
angular.module('tokeetApp.filters')
    .filter('abbreviate', function () {
        return function (value, wordwise, max, tail) 
        {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) 
            {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });

