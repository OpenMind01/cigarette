'use strict';

/**
 * @ngdoc directive
 * @name tokeetApp.directive:include
 * @description
 * # include
 */
angular.module('tokeetApp.directives')
        .directive('tokeetGrid', function($filter) {
            return {
                restrict: 'A',
                scope: {
                    options: '=tokeetGrid',
                    externalScope: '='
                },
                controller: function($scope) {
                    var defer = null;
                    var defaultOptions = {
                        limit: '10',
                        currentPage: 1,
                        maxVisiblePages: 5,
                        isExpandable: false,
                        isServersidePagenation: false
                    };

                    for (var k in defaultOptions) {
                        if (typeof ($scope.options[k]) === 'undefined') {
                            $scope.options[k] = defaultOptions[k];
                        }
                    }

                    $scope.options.exteralScope = $scope.externalScope;

                    $scope.getExternalScope = function() {
                        return $scope.options.exteralScope;
                    };

                    $scope.$watch('options.limit', function(nValue, oValue) {
                        if (nValue !== oValue && $scope.options.onPageChanged && $scope.options.isServersidePagenation == true) {
                            $scope.options.onPageChanged(nValue);
                        }
                    });
                    $scope.$watch('options.currentPage', function(nValue, oValue) {
                        if (nValue !== oValue && $scope.options.onPageChanged && $scope.options.isServersidePagenation == true) {
                            $scope.options.onPageChanged(nValue);
                        }
                    });
                },
                templateUrl: 'views/partials/tokeetgrid.html',
                replace: true,
                link: function($scope, ele, attrs, c) {
                    return true;
                }
            };
        })
        .directive('empGridRow', function($compile) {
            return {
                restrict: 'AC',
                scope: {
                    gridOptions: '=',
                    row: '='
                },
                controller: function($scope) {
                    $scope.getExternalScope = function() {
                        return $scope.gridOptions.exteralScope;
                    };
                },
                template: '<td emp-grid-cell grid-options="gridOptions" row="row" column="col" ng-repeat="col in gridOptions.columns" class="text-{{col.textAlign}} {{col.class}}">' +
                        '</td>',
                link: function($scope, ele, attrs, c) {
                    if ($scope.gridOptions.rowTemplate) {
                        ele.html($scope.gridOptions.rowTemplate);
                        $compile(ele.contents())($scope);
                    }
                    return true;
                }
            };
        })
        .directive('empGridCell', function($compile) {
            return {
                restrict: 'AC',
                scope: {
                    gridOptions: '=',
                    row: '=',
                    column: '='
                },
                controller: function($scope) {
                    $scope.getExternalScope = function() {
                        return $scope.gridOptions.exteralScope;
                    };
                },
                template: '{{cellValue}}',
                link: function($scope, ele, attrs, c) {
                    $scope.cellValue = $scope.row[$scope.column.field];
                    if ($scope.column.cellTemplate) {
                        ele.html($scope.column.cellTemplate);
                        $compile(ele.contents())($scope);
                    }
                    return true;
                }
            };
        }).filter('gridFilter', function($filter) {
            return function(ary, gridOptions) {
                if (typeof gridOptions.searchText == "string" && gridOptions.searchText != "") {
                    ary = $filter('filter')(ary, gridOptions.searchText);
                }
                if (typeof gridOptions.sortting_colum != "undefined") {
                    var asc = gridOptions.sortting_dir == 0 ? true : false;
                    ary = $filter('orderBy')(ary, gridOptions.sortting_colum, asc);
                }
                if (gridOptions.isPagination == true) {
                    var startIndex = gridOptions.limit * gridOptions.currentPage;
                    var length = -1 * gridOptions.limit;
                    ary = $filter('limitTo')(ary, startIndex);
                    ary = $filter('limitTo')(ary, length);
                }
                return ary;
            }
        });