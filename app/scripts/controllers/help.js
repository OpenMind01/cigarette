'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:BookingCtrl
 * @description
 * # HelpCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
.controller('HelpCtrl', function (Restangular, $scope, $stateParams, $location, $state, ModalService, $aside) 
{
    // Declare controller variables here.
    var contextHelp;
    
    $scope.initialize = function ()
    {   
        $( "#launcher" ).hide();
        // Pre-fetch an external template populated with a custom scope
        contextHelp = $aside({scope: $scope, template: 'views/templates/context_help.tpl.html', contentTemplate: '', show: false});
    };
    $scope.initialize();
    $scope.setHelpTopic = function () { $scope.helpTopic = $state.current.data.title; };
    $scope.goTo         = function (uri) { $location.path(uri); };
    $scope.goToHC       = function () { window.open('https://tokeet.zendesk.com/hc/en-us'); };
    
    /**
     * Add Guest
    **/
    $scope.feedback = function () 
    {
        ModalService.showModal({
            templateUrl: 'views/partials/feedback.html',
            controller: 'FeedbackCtrl',
            inputs: {parentScope: $scope}
        }).then(function (modal) {
            $scope.helpMenuState = 'close';
        });
    };

    // Show when some event occurs (use $promise property to ensure the template has been loaded)
    $scope.showHelp = function () 
    {    
        contextHelp.$promise.then(function() {
            contextHelp.show();
            $scope.helpMenuState = 'close';
        });
    }
    $scope.closeHelpMenu = function() { $scope.helpMenuState = 'close'; }
});
