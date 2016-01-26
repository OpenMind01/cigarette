'use strict';
/*global $:false */
angular.module('tokeetApp.services')
        .factory('AuthService', function ($location, Restangular, $window, $q, $filter) {
            var user = {};
            var lastPath = '/';
            function setLastPath(p) {
                if (p === '/login') {
                    lastPath = '/';
                } else {
                    lastPath = p;
                }
            }

            function clearSession() {
                $window.sessionStorage.isLoggedIn = 0;
                $window.sessionStorage.removeItem("token");
                $window.sessionStorage.removeItem("currentUser");
            }

            function initUser() {
                if ($window.sessionStorage.currentUser) {
                    user = JSON.parse($window.sessionStorage.currentUser);
                } else {
                    user = {};
                }
            }
            return {
                user: user,
                getUser: function () {
                    return user;
                },
                isLoggedIn: function () {
                    return  $window.sessionStorage.isLoggedIn == "1";
                },
                getCurrentUser: function () {
                    initUser();
                    return user;
                },
                doLogin: function (email_address, password) {
                    var defer = $q.defer();
                    var loginUser = Restangular.all('user/login/');
                    loginUser.customPOST({'username': email_address, 'password': password}).then(function (row) {
                        if (row && row.username) {
                            $window.sessionStorage.isLoggedIn = 1;
                            $window.sessionStorage.token = row.token;
                            $window.sessionStorage.currentUser = row
                            user = row;
                            defer.resolve(row);
                            $location.path(lastPath);
                        } else {
                            clearSession();
                            defer.reject(row);
                        }
                    }, function () {
                        clearSession();
                        defer.reject(row);
                    });
                    return defer.promise;
                },
                doLogout: function () {
                    clearSession();
                    var loginUser = Restangular.all('user/logout/').get();
                    setLastPath('/');
                    $location.path('/');
                },
                redirectToLogin: function () {
                    clearSession();
                    setLastPath('' + $location.path());
                    $location.path('/');
                }
            };
        })
        .factory('authInterceptor', function ($rootScope, $q, $window, $location) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if ($window.sessionStorage.token) {
                        config.headers.Authorization = $window.sessionStorage.token;
                    }
                    return config;
                },
                response: function (response) {
                    if (response.status === 401) {
                        $location.path('/');
                    }
                    return response || $q.when(response);
                },
                responseError: function (response) {
                    if (response.status === 401) {
                        $location.path('/');
                    }
                    return response || $q.when(response);
                }
            };
        })
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        });