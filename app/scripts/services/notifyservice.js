'use strict';

/**
 * @ngdoc service
 * @name tokeetApp.notifyService
 * @description
 * # main
 * Service in the tokeetApp.
 */
angular.module('tokeetApp.services')
        .factory('notifyService', function($timeout, $rootScope, $interpolate, notify, $filter) {
            var alerts = [];
            var defaultDuration = 2500;
            var lockFlag  = false;
            var messages = {
                'LoginError': 'Incorrect username or password!'                
            };
            return {
                /**
                 returns all alerts
                 @function
                 @name alerts
                 @return {Array} alerts array
                 */
                alerts: function() {
                    return messages;
                },

                alert: function(messageType, msgText, cssClass, scope, duration) {
                    var msg = { message:msgText,templateUrl:'views/partials/alert_' + messageType.toLowerCase() + '.html'};
                    if(scope !== null){
                        msg.scope = scope;
                    }
                    if(cssClass !== null){
                        msg.classes = cssClass;
                    }
                    duration = duration||defaultDuration;
                    notify.config({duration:duration})
                    notify(msg);
                },
                
                /**
                 gets the text for a message and fills the template with data
                 Example:
                 @function
                 @name getAlertText
                 @param {String} key
                 */
                getAlertText: function(key, data) {
                    data = data || {};
                    var template = $interpolate(messages[key]);
                    var message = template({data: data});
                    return message;
                }
            };
        });
