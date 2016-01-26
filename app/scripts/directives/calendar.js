'use strict';

/**
 * @ngdoc directive
 * @name tokeetApp.directive:include
 * @description
 * # include
 */
angular.module('tokeetApp.directives')
.directive('viewportWidth', function() {

    return {
      link: function(scope, elm, attrs) {
        function getViewport() 
        {

          var e = window, a = 'inner';
          if (!('innerWidth' in window)) 
          {
            a = 'client';
            e = document.documentElement || document.body;
          }

          var w = e[a + 'Width'];
          var h = e[a + 'Height'];
          var ret =     { 'width': w, 'height': h };

          return ret;
        }

        elm.css('maxWidth', getViewport().width + 'px');
      }
    };
});