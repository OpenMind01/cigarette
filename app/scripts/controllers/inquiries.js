'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:InquiryCtrl
 * @description
 * # InquiryCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('InquiryListCtrl', function ($scope, Restangular, InquiryService, $state, $stateParams, $filter, ModalService, $location) {
            $scope.$scope = $scope;
            $scope.rentals = Restangular.all('rental/all/').getList().$object;
            $scope.filterObj = {};
            
            $scope.gridOptions = {
                totalItems: 0,
                isPagination: true,
                limit: '10',
                columns: [
                    {field: '', display: '', class: 'table_sp', cellTemplate: "{{''}}"},
                    {field: '', display: '', class: 'tab_w10', cellTemplate: '<i class="fa fa-star f_yellow"></i>'},
                    {field: 'source', display: 'Source', class: 'clickable', cellTemplate: "<a ng-click=getExternalScope().goTo('/inquiry/{{row.pkey}}')>{{ row.inquiry_source}}</a>"},                    
                    {field: 'received_on', display: 'Received', class: 'clickable', cellTemplate: "<a ng-click=getExternalScope().goTo('/inquiry/{{row.pkey}}')>{{ row.received_on}}</a>"},                    
                    {field: 'contact', display: 'Contact', class: 'clickable', cellTemplate: "<a ng-click=getExternalScope().goTo('/inquiry/{{row.pkey}}')>{{ row.guest_details.name | capitalize:true}}</a>"},
                    {field: 'arrive', display: 'Arrive', class: 'clickable', cellTemplate: "<a ng-click=getExternalScope().goTo('/inquiry/{{row.pkey}}')>{{ row.guest_arrive}}</a>"},                    
                    {field: 'depart', display: 'Depart', class: 'clickable', cellTemplate: "<a ng-click=getExternalScope().goTo('/inquiry/{{row.pkey}}')>{{ row.guest_depart}}</a>"},                    
                    {field: 'nights', display: 'Nights', class: 'clickable align_c', cellTemplate: "<a ng-click=getExternalScope().goTo('/inquiry/{{row.pkey}}')>{{ row.nights}}</a>"},                    
                    {field: 'guests', display: 'Guests', class: 'clickable align_c', cellTemplate: "<a ng-click=getExternalScope().goTo('/inquiry/{{row.pkey}}')>{{ (row.num_adults + row.num_child) | number:0}}</a>"},                    
                    {field: '', display: '', class: 'table_sp', cellTemplate: "{{''}}"}
                ],
                advancedColumns: 'aboutme',
                data: []
            };         
            
            /**
             * Loading data;
             */
            $scope.AllData = [];

            $scope.loadData = function () {
                $scope.gridOptions.loading = true;
                InquiryService.getAllInquires().then(function (data) {
                    $scope.gridOptions.loading = false;
                    $scope.gridOptions.data = data;
                    $scope.AllData = data;
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
            $scope.goTo = function (uri) { $location.path(uri); };
    
            /**
             * Filter             
             */
            $scope.gridClearSearch = function () {
                $scope.filterObj.serachStr = '';
            };

            $scope.$watch("filterObj", function (newValue) {
                var ary = $scope.AllData;
                ary = $filter('filter')(ary, $scope.filterObj.serachStr);
                if ($scope.filterObj.tab == 'all') {
                    ary = ary;
                } else {
                    ary = $filter('filter')(ary, {rental_id:$scope.filterObj.tab});
                }
                $scope.gridOptions.data = ary;
            }, true);            
            
            /**
             * Add Guest
             */
            $scope.addInquery = function () {
                ModalService.showModal({
                    templateUrl: 'views/partials/create_inquiry.html',
                    controller: 'AddInqueryCtrl',
                    inputs: {parentScope: $scope}
                }).then(function (modal) {
                });
            };
    
        });