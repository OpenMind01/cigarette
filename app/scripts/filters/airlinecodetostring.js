'use strict';


/**
 * @ngdoc filter
 * @name tokeetApp.filter:airlinecodetostring
 * @function 
 * # airlinecodetostring
 * Filter in the tokeetApp.
 */

angular.module('tokeetApp.filters')
        .filter('airlinecodetostring', function ($filter, airline) {

            return function (code)
            {
                if (code) {
                    var ary = $filter('filter')(airline, {code: code});
                    if (ary.length > 0) {
                        return ary[0].name
                    } else {
                        return "";
                    }
                }
                return "";
            };
        });

