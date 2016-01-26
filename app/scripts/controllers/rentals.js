'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:UserListCtrl
 * @description
 * # RentalCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('RentalCtrl', function(Restangular, $scope){

            $scope.initialize = function ()
            {
                $scope.rentals  = Restangular.all('rental/all/').getList().$object;
                $scope.action_heading = 'Add New Rental';
                $scope.v_delete = 1; // When this value is truthy then the element is hidden.
                
                $scope.quants   = [ {label: 'Select', index:0}, 
                                    {label: 'One', index:1}, 
                                    {label: 'Two', index:2},
                                    {label: 'Three', index:3}, 
                                    {label: 'Four', index:4}, 
                                    {label: 'Five', index:5}, 
                                    {label: 'Six', index:6}, 
                                    {label: 'Seven', index:7}, 
                                    {label: 'Eight', index:8}, 
                                    {label: 'Nine', index:9},
                                    {label: 'Ten', index:10},
                                    {label: 'Eleven', index:11},
                                    {label: 'Twelve', index:12},
                                    {label: 'Thirteen', index:13},
                                    {label: 'Fourteen', index:14},
                                    {label: 'Fifteen', index:15},
                                    {label: 'Sixteen', index:16},
                                    {label: 'Seventeen', index:17},
                                    {label: 'Eighteen', index:18},
                                    {label: 'Nineteen', index:19},
                                    {label: 'Twenty', index:20},
                                    {label: 'Twenty One', index:21},
                                    {label: 'Twenty Two', index:22},
                                    {label: 'Twenty Three', index:23},
                                    {label: 'Twenty Four', index:24}];

                $scope.v_sleep_min  = $scope.quants[0];
                $scope.v_sleep_max  = $scope.quants[0];
                $scope.v_bedrooms   = $scope.quants[0];
                $scope.v_bathrooms  = $scope.quants[0];
                
                $scope.colors = [   '#7bd148',
                                    '#5484ed',
                                    '#a4bdfc',
                                    '#46d6db',
                                    '#7ae7bf',
                                    '#51b749',
                                    '#fbd75b',
                                    '#ffb878',
                                    '#ff887c',
                                    '#dc2127',
                                    '#dbadff',
                                    '#e1e1e1' ];
                $scope.v_color = '#e1e1e1';
            }
            
            $scope.saveRental = function ()
            {
                var saveR;
                var payload = { 'name':         $scope.v_name,
                                'description':  $scope.v_desc,
                                'email':        $scope.v_email,
                                'phone':        $scope.v_phone,
                                'color':        $scope.v_color,
                                'bedrooms':     $scope.v_bedrooms.index,
                                'bathrooms':    $scope.v_bathrooms.index,
                                'sleep_min':    $scope.v_sleep_min.index,
                                'sleep_max':    $scope.v_sleep_max.index,
                                'size':         $scope.v_size,
                                'type':         $scope.v_type,
                                'address':      { 'address': $scope.v_address,
                                                    'city': $scope.v_city,
                                                    'state': $scope.v_state,
                                                    'country': $scope.v_country }
                              };

                if ($scope.v_pkey)
                {
                    saveR = Restangular.all('rental/update/'+$scope.v_pkey).customPUT(payload);
                }
                else
                {
                    saveR = Restangular.all('rental/').customPOST(payload);
                }

                saveR.then(function () 
                {
                    $alert({title: 'Success!', content: 'Rental deleted successfuly.', type: 'success'});
                }, function () {
                    $alert({title: 'Ooops!', content: 'Unable to delete rental.', type: 'error'});
                });
                
                $scope.initialize();
                $scope.prepareCreate();
                $scope.apply();
            };
    
            
            $scope.deleteRental = function()
            {
                Restangular.one('rental/delete/'+$scope.v_pkey).remove().then(function () 
                {
                    $alert({title: 'Success!', content: 'Rental saved successfuly.', type: 'success'});
                }, function () {
                    $alert({title: 'Ooops!', content: 'Unable to save rental.', type: 'error'});
                });
                
                $scope.initialize();
                $scope.prepareCreate();
                $scope.apply();
            }
    
            $scope.prepareSave = function (rental)
            {
                
                $scope.action_heading = 'Edit Existing Rental';
                $scope.v_pkey   = rental.pkey;
                $scope.v_delete = 0; // When this value is truthy then the element is hidden.
                
                $scope.v_name   = rental.name;
                $scope.v_phone  = rental.phone;
                $scope.v_email  = rental.email;
                $scope.v_color  = rental.color;
                $scope.v_address= rental.address.address;
                $scope.v_city   = rental.address.city;
                $scope.v_state  = rental.address.state;
                $scope.v_country= rental.address.country;
                $scope.v_desc   = rental.description;
                $scope.v_name   = rental.name;
                $scope.v_size   = rental.size;
                $scope.v_type   = rental.type;
                $scope.v_bedrooms       = $scope.quants[rental.bedrooms];
                $scope.v_bathrooms      = $scope.quants[rental.bathrooms];
                $scope.v_sleep_min      = $scope.quants[rental.sleep_min];
                $scope.v_sleep_max      = $scope.quants[rental.sleep_max];
            };
    
            $scope.prepareCreate = function ()
            {
                $scope.v_delete = 1; // When this value is truthy then the element is hidden.
                $scope.v_pkey   = 0;
                $scope.v_name   = '';
                $scope.v_phone  = '';
                $scope.v_email  = '';
                $scope.v_color  = '';
                $scope.v_address= '';
                $scope.v_city   = '';
                $scope.v_state  = '';
                $scope.v_country= '';
                $scope.v_desc   = 'Enter a description of the rental property.';
                $scope.v_name   = '';
                $scope.action_heading = 'Add New Rental';
                $scope.size     = '';
                
            }

            $scope.closeModal = function () {
                $modalInstance().dismiss();
            };
    
            $scope.initialize();
		});