'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('UserCtrl', function (Restangular, $scope, $modalInstance, $alert) {
            
            $scope.createUser = function ()
            {
                var payload = { 'firstname': $scope.u_fname,
                                'lastname': $scope.u_lname,
                                'email': $scope.u_email,
                                'phone': $scope.u_phone,
                                'usertype': $scope.u_role,
                                'password1': $scope.u_pass1,
                                'password2': $scope.u_pass2,
                                'address': {'country': $scope.country}};

                var saveU = Restangular.all('user/');
                saveU.customPOST(payload).then(function () {
                    $alert({title: 'Success!', content: 'User saved successfuly.', type: 'success'});
                    $scope.users  = Restangular.all('user/all/').getList().$object;
                    $modalInstance().dismiss();
                    $scope.apply();
                }, function () {
                    $alert({title: 'Ooops!', content: 'Unable to save user.', type: 'error'});
                });
            }
            
            $scope.saveUser = function ()
            {
                var payload = { 'firstname': $scope.u_fname,
                                'lastname': $scope.u_lname,
                                'email': $scope.u_email,
                                'phone': $scope.u_phone,
                                'usertype': $scope.u_role,
                                'password1': $scope.u_pass1,
                                'password2': $scope.u_pass2,
                                'address': {'country': $scope.country}};

                var saveU = Restangular.all('user/');
                saveU.customPOST(payload).then(function () {
                    $alert({title: 'Success!', content: 'User saved successfuly.', type: 'success'});
                    $modalInstance().dismiss();
                }, function () {
                    $alert({title: 'Ooops!', content: 'Unable to save user.', type: 'error'});
                });
            }

            $scope.closeModal = function () {
                $modalInstance().dismiss();
            };
    
            $scope.options = [
                {value: 'admin', label: '<i class="fa fa-users"></i> &nbsp;Administrator'},
                {value: 'manager', label: '<i class="fa fa-users"></i> &nbsp;Property Manager'},
                {value: 'staff', label: '<i class="fa fa-users"></i> &nbsp;House Staff'},
                {value: 'billing', label: '<i class="fa fa-users"></i> &nbsp;Billing & Payments'}
            ];    
    
            $scope.users  = Restangular.all('user/all/').getList().$object;
        });