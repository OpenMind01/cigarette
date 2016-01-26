'use strict';


/**
 * @ngdoc filter
 * @name tokeetApp.filter:regex
 * @function 
 * # regex
 * Filter in the tokeetApp.
 */

angular.module('tokeetApp.filters')
.filter('dateDiff', function () {
    var magicNumber = (1000 * 60 * 60 * 24);

    return function (toDate, fromDate) 
    {
        if(toDate && fromDate)
        {
            var to      = new Date(toDate);
            var from    = new Date(fromDate);
            var dayDiff = Math.floor((to.getTime() - from.getTime()) / magicNumber);
            
            if (angular.isNumber(dayDiff))
            {
                return dayDiff + 1;
            }
        }
    };
});

