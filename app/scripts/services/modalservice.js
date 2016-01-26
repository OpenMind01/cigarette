'use strict';

/**
 * @ngdoc service
 * @name tokeetApp.main
 * @description
 * # main
 * Service in the tokeetApp.
 */
(function(){
var $$modalInstance = null;
angular.module('tokeetApp.services')
        .controller('modalCtrl', function () {

        })
        .factory('ModalService', ['$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateCache',
            function ($document, $compile, $controller, $http, $rootScope, $q, $templateCache) {
                var body = $document.find('body');
                function ModalService() {
                    var self = this;
                    var getTemplate = function (template, templateUrl) {
                        var deferred = $q.defer();
                        if (template) {
                            deferred.resolve(template);
                        } else if (templateUrl) {
                            var cachedTemplate = $templateCache.get(templateUrl);
                            if (cachedTemplate !== undefined) {
                                deferred.resolve(cachedTemplate);
                            }
                            else {
                                $http({method: 'GET', url: templateUrl, cache: true})
                                        .then(function (result) {
                                            // save template into the cache and return the template
                                            $templateCache.put(templateUrl, result.data);
                                            deferred.resolve(result.data);
                                        }, function (error) {
                                            deferred.reject(error);
                                        });
                            }
                        } else {
                            deferred.reject("No template or templateUrl has been specified.");
                        }
                        return deferred.promise;
                    };

                    self.showModal = function (options) {
                        var deferred = $q.defer();
                        var controllerName = options.controller;
                        if (!controllerName) {
                            controllerName = 'modalCtrl';
                        }
                        if (options.controllerAs) {
                            controllerName = controllerName + " as " + options.controllerAs;
                        }

                        getTemplate(options.template, options.templateUrl)
                                .then(function (template) {
                                    var modalScope = $rootScope.$new();
                                    var closeDeferred = $q.defer();
                                    var inputs = {
                                        $scope: modalScope,
                                        close: function (result, delay) {
                                            if (delay === undefined || delay === null)
                                                delay = 0;
                                            window.setTimeout(function () {
                                                $('#shadow').unbind();
                                                $('#popWrap').fadeOut();
                                                $("#popcont").empty();
                                                closeDeferred.resolve(result);
                                                modalScope.$destroy();
                                                modalElement.remove();
                                                inputs.close = null;
                                                deferred = null;
                                                closeDeferred = null;
                                                modal = null;
                                                inputs = null;
                                                modalElement = null;
                                                modalScope = null;
                                            }, delay);
                                        }
                                    };

                                    //  If we have provided any inputs, pass them to the controller.
                                    if (options.inputs) {
                                        for (var inputName in options.inputs) {
                                            inputs[inputName] = options.inputs[inputName];
                                        }
                                    }

                                    //  Parse the modal HTML into a DOM element (in template form).
                                    var modalElementTemplate = angular.element(template);

                                    //  Compile then link the template element, building the actual element.
                                    //  Set the $element on the inputs so that it can be injected if required.
                                    var linkFn = $compile(modalElementTemplate);
                                    var modalElement = linkFn(modalScope);
                                    inputs.$element = modalElement;

                                    //  Create the controller, explicitly specifying the scope to use.
                                    var modalController = $controller(controllerName, inputs);

                                    //  Finally, append the modal to the dom.
                                    if (options.appendElement) {
                                        // append to custom append element			  
                                        options.appendElement.append(modalElement);
                                        options.appendElement.append(modalElement);
                                    } else {
                                        // append to body when no custom append element is specified              
                                        $document.find('#popcont').empty();
                                        $document.find('#popcont').append(modalElement);
                                    }

                                    //  We now have a modal object...
                                    var modal = {
                                        controller: modalController,
                                        scope: modalScope,
                                        element: modalElement,
                                        dismiss: function () {
                                            inputs.close();
                                        },
                                        close: closeDeferred.promise
                                    };
                                    $$modalInstance = modal;                                    
                                    //  ...which is passed to the caller via the promise.
                                    $('#popWrap').fadeIn();
                                    $('#shadow').bind("click", function () {
                                        inputs.close();
                                    });
                                    deferred.resolve(modal);
                                })
                                .then(null, function (error) { // 'catch' doesn't work in IE8.
                                    deferred.reject(error);
                                });
                        return deferred.promise;
                    };
                }
                return new ModalService();
            }])
        .factory('$modalInstance', ['$document', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateCache',
            function ($document, $compile, $controller, $http, $rootScope, $q, $templateCache) {
                return function(){
                    return $$modalInstance;
                };
            }])
        ;
 })()