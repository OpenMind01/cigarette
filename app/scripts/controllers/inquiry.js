'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:InquiryCtrl
 * @description
 * # InquiryCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
.controller('AddInqueryCtrl', function ($scope, $modalInstance, parentScope, notifyService, Restangular, source, InquiryService) {
    $scope.inqury = {};
    $scope.rentals = Restangular.all('rental/all/').getList().$object;
    $scope.guests = Restangular.all('guest/all/').getList().$object;
    $scope.source = source;

    $scope.createInquery = function () {
        var ary = {
            "guest": $scope.inqury.guest.pkey,
            "inquiry_source": $scope.inqury.source,
            "guest_arrive": $scope.inqury.enddate.getDate(),
            "guest_depart": $scope.inqury.startdate.getDate(),
            "replyto": $scope.inqury.email,
            "ental_id": $scope.inqury.rental.pkey,                    
        };
        $scope.process = true;
        InquiryService.addInquiry(ary).then(function () {
            $scope.process = false;
            notifyService.alert("success", "Inquery saved successfuly.");
            parentScope.reloadData();
            $scope.closeModal();
        }, function () {
            $scope.process = false;
            notifyService.alert("error", "Unable to save guest.");
        });
    };
    $scope.closeModal = function () {
        $modalInstance().dismiss();
    };
})
.controller('InquiryCtrl', function (Restangular, $scope, $state, $stateParams, notifyService) 
{
    $scope.initialize = function ()
    {
        var inquiry_id = $stateParams.inquiryId;
        var inquiry_req = Restangular.one('inquiry', inquiry_id).get();
        inquiry_req.then(function (inquiry)
        {
            $scope.inquiry = inquiry;
            $scope.messages = inquiry.messages;                    
        }, function () {
            $alert({title: 'Ooops!', content: 'Unable to retrieve inquiry detail.', type: 'error'});
        });

    };
    $scope.initialize();
    
    $scope.goTo = function (uri) {
        $location.path(uri);
    };
    
    $scope.bookInquiry = function () 
    {
        var payload = 
        {
            'guest_arrive': $scope.inquiry.guest_arrive,
            'guest_depart': $scope.inquiry.guest_depart,
            'inquiry_id': $scope.inquiry.pkey,
            'rental_id': $scope.inquiry.rental.pkey,
            'guest_id': $scope.guest_id.guest.pkey
        };

        var saveE = Restangular.all('booking/');
        saveE.customPOST(payload).then(function (response) 
        {
            notifyService.alert("success", 'Booking created successfully.');
            $scope.closeModal();
        }, function () {
            notifyService.alert("error", 'Unable to create a new booking.');
        });

        $scope.events.push(payload);
    };
    
    $scope.saveInquiry = function ()
    {
        var payload = {'firstname': $scope.firstname,
            'lastname': $scope.lastname,
            'email': $scope.email,
            'phone': $scope.phone,
            'usertype': $scope.role,
            'address': {'country': $scope.country}};

        var saveU = Restangular.all('user/');
        saveU.customPOST(payload).then(function () {
            $alert({title: 'Success!', content: 'User saved successfuly.', type: 'success'});
        }, function () {
            $alert({title: 'Ooops!', content: 'Unable to save user.', type: 'error'});
        });
    }

    $scope.closeModal = function () {
        $modalInstance().dismiss();
    };
});