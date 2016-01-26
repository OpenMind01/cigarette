'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:GuestListCtrl
 * @description
 * # GuestListCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('GuestListCtrl', function ($scope, GuestService, $filter, ModalService) {
            // Now update the guest list
            $scope.$scope = $scope;
            $scope.filterObj = {};

            $scope.gridOptions = {
                totalItems: 0,
                isPagination: true,
                limit: '10',
                columns: [
                    {field: '', display: '', class: 'table_sp', cellTemplate: "{{''}}"},
                    {field: '', display: '', class: 'tab_w10', cellTemplate: "<i class='fa fa-star f_yellow'></i>"},
                    {field: 'name', display: 'Guest', class: 'clickable', cellTemplate: "<a ng-click='getExternalScope().updateGuest(row)'>{{ row.name | abbreviate:false:25:'...' }}</a>"},
                    {field: 'email', display: 'Email', class: 'clickable', cellTemplate: "<a ng-click='getExternalScope().updateGuest(row)'>{{ row.primaryemail | abbreviate:false:25:'...' }}</a>"},
                    {field: 'phone', display: 'Telephone', class: 'clickable', cellTemplate: "{{ row.phone ? row.phone : '....' }}"},
                    {field: 'country', display: 'Country', class: 'clickable', cellTemplate: "{{ guest.country ? guest.country : '....' }}"},
                    {field: 'lastmessage', display: 'Last Message', class: 'clickable align_c', cellTemplate: "{{ row.lastmessage ? row.lastmessage : row.created * 1000 | date:'MMMM dd, hh:mm a' }}"},
                    {field: '', display: '', class: 'table_sp', cellTemplate: "{{''}}"}
                ],
                advancedColumns: 'aboutme',
                data: []
            };

            /**
             * Loading data;
             */
            $scope.AllGuest = [];

            $scope.loadData = function () {
                $scope.gridOptions.loading = true;
                GuestService.getAllGuests().then(function (data) {
                    $scope.gridOptions.loading = false;
                    $scope.gridOptions.data = data;
                    $scope.AllGuest = data;
                }, function (response) {
                    $scope.gridOptions.loading = false;
                });
            };
            
            $scope.reloadData = function () {
                $scope.gridOptions.data = [];
                $scope.filterObj = {tab:'all'};
                $scope.loadData();
            }
            
            
            $scope.loadData();

            /**
             * Filter             
             */
            $scope.gridClearSearch = function () {
                $scope.filterObj.serachStr = '';
            };

            $scope.$watch("filterObj", function (newValue) {
                var ary = $scope.AllGuest;
                ary = $filter('filter')(ary, $scope.filterObj.serachStr);
                if ($scope.filterObj.tab == 'all') {
                    ary = ary;
                } else if ($scope.filterObj.tab == 'ae') {
                    ary = $filter('regex')(ary, 'name', '^[a-eA-E]');
                } else if ($scope.filterObj.tab == 'fj') {
                    ary = $filter('regex')(ary, 'name', '^[f-jF-J]');
                } else if ($scope.filterObj.tab == 'ko') {
                    ary = $filter('regex')(ary, 'name', '^[k-oK-O]');
                } else if ($scope.filterObj.tab == 'pt') {
                    ary = $filter('regex')(ary, 'name', '^p-tP-T]');
                } else if ($scope.filterObj.tab == 'uz') {
                    ary = $filter('regex')(ary, 'name', '^[u-zU-Z]');
                }
                ;
                $scope.gridOptions.data = ary;
            }, true);



            /**
             * Add Guest
             */
            $scope.addGuest = function () {
                ModalService.showModal({
                    templateUrl: 'views/partials/add_guest.html',
                    controller: 'AddGuestCtrl',
                    inputs: {parentScope: $scope}
                }).then(function (modal) {
                });
            };
            /**
             * Update Guest
             */
            $scope.updateGuest = function (row) {                
                ModalService.showModal({
                    templateUrl: 'views/partials/edit_guest.html',
                    controller: 'EditGuestCtrl',
                    inputs: {parentScope: $scope, guest:angular.copy(row)}
                }).then(function (modal) {
                });
            }
        });