'use strict';

/**
 * @ngdoc function
 * @name tokeetApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the tokeetApp
 */
angular.module('tokeetApp.controllers')
        .controller('CalendarCtrl', function ($scope, $compile, uiCalendarConfig, Restangular, $popover, $modalInstance, $http, ModalService, notifyService, $state) {
            $scope.Title = 'Title';
            $scope.currentView = 'month';
            $scope.myCalendar = 'myCalendar1';

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];

            $scope.calendarMonth = monthNames[m];
            $scope.calendarRange = monthNames[m] + ', ' + y;
            $scope.currentView = 'month';

            $scope.yearPicker = [
                {text: '<i class="fa fa-calendar"></i>&nbsp;&nbsp;2015', click: 'gotoYear(2015)'},
                {text: '<i class="fa fa-calendar"></i>&nbsp;&nbsp;2016', click: 'gotoYear(2016)'},
                {text: '<i class="fa fa-calendar"></i>&nbsp;&nbsp;2017', click: 'gotoYear(2017)'},
                {text: '<i class="fa fa-calendar"></i>&nbsp;&nbsp;2018', click: 'gotoYear(2018)'}
            ];

            $scope.start = function () {
                $scope.filteredEvents = [];
                Restangular.all('calendar/all/').getList().then(function (res) {
                    $scope.events = res;
                    filterEvents();
                });
                $scope.rentals = Restangular.one('rental/all/').getList().$object;
                $scope.initialized = 1;
            };
            if (!$scope.initialized) {
                $scope.start();
            }
            // filter all events
            function filterEvents() {
                var filteredEvents = runAllStatusFilters($scope.events);
                // remove all filtered events
                $scope.filteredEvents.splice(0, $scope.filteredEvents.length);
                // add filtered events
                Array.prototype.push.apply($scope.filteredEvents, filteredEvents);
            }

            // event filters
            $scope.eventStatusFilter = {};
            function runAllStatusFilters(events) {
                var filteredEvents = [];
                angular.forEach(events, function (event, i) {
                    //if (!$scope.eventStatusFilter.hold && !event.booking_id){ return; } // don't display it
                    //TODO add other filter here

                    // add event after filters
                    filteredEvents.push(event);
                });
                // return filtered events
                return filteredEvents;
            }

            // run this after filter change
            $scope.filterChange = function () {
                filterEvents();
            };

            $scope.clearDates = function () {
                $scope.selectedDate = null;
            };

            /*  on day click event */
            $scope.onDayClick = function (date, jsEvent, view) {
                $scope.fromDate = date.format('MMM D, YYYY');
                $scope.selectedDate = $scope.fromDate;
                $scope.untilDate = moment(new Date()).format('MMM D, YYYY');
                $scope.guest = null;
                $scope.inquiry = null;
                $scope.rental = null;

                // Get the event target.
                var targ;
                if (jsEvent.target) {
                    targ = jsEvent.target;
                }
                else if (jsEvent.srcElement) {
                    targ = jsEvent.srcElement;
                }
                if (targ.nodeType === 3) { // defeat Safari bug
                    targ = targ.parentNode;
                }

                // Create a jQuery event object from this target.
                var angTarget = angular.element(targ);

                var asAServiceOptions =
                {
                    title: 'Create New Event',
                    content: 'Hello Popover<br />This is a multiline message!',
                    trigger: 'manual',
                    animation: 'am-flip-x',
                    html: 'true',
                    contentTemplate: 'views/partials/calendar_pop.html',
                    autoClose: true,
                    container: 'body',
                    scope: $scope
                };

                var myPopover = $popover(angTarget, asAServiceOptions);
                myPopover.$promise.then(myPopover.toggle);
                $scope.myPopover = myPopover;
            };

            /* add and removes an event source of choice */
            $scope.addRemoveEventSource = function (sources, source) {
                var canAdd = 0;
                angular.forEach(sources, function (value, key) {
                    if (sources[key] === source) {
                        sources.splice(key, 1);
                        canAdd = 1;
                    }
                });
                if (canAdd === 0) {
                    sources.push(source);
                }
            };

            // Change the calendar specific view
            $scope.changeView = function (view) {
                uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('changeView', view);
                $scope.currentView = view;
                getDateRange(uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('getDate'), view);
            };

            // Move the calendar forward one unit of the specific view
            $scope.next = function () {
                uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('next');
                getDateRange(uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('getDate'),
                        $scope.currentView);
            };

            // Move the calendar back one unit of the specific view
            $scope.previous = function () {
                uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('prev');
                getDateRange(uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('getDate'),
                        $scope.currentView);
            };
            $scope.today = function () {
                uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('today');
                getDateRange(uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('getDate'));
            };

            // Move the calendar to a specific year
            $scope.gotoYear = function (year) {
                var currentDate = uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('getDate');
                var currentYear = currentDate.year();
                var deltaYears = year - currentYear;

                currentDate.add(deltaYears, 'y');
                uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('gotoDate', currentDate);
                getDateRange(uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('getDate'),
                        $scope.currentView);

            };

            /* render the calendar */
            $scope.renderCalender = function (calendar) {
                if (uiCalendarConfig.calendars[$scope.myCalendar]) {
                    uiCalendarConfig.calendars[$scope.myCalendar].fullCalendar('render');
                }
            };

            /* Render Tooltip */
            $scope.onEventRender = function (event, element, view) {
                function getRental(id) {
                    for(var i= 0, len=$scope.rentals.length; i<len; i++) {
                        var rental = $scope.rentals[i];
                        if (rental.pkey === id) return rental;
                    }
                }
                var rental = getRental(event.rental_id);
                var color = (rental && rental.color) || '#ddd';
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true,
                    'style': 'border-left-color:' + color
                });
                $compile(element)($scope);
            };
            /* config object */
            $scope.uiConfig = {
                calendar: {
                    //height: 500,
                    aspectRatio: 1.8,
                    editable: true,
                    header: false,
                    columnFormat: {day: false},
                    eventClick: $scope.onEventClick,
                    eventRender: $scope.onEventRender,
                    dayClick: $scope.onDayClick,
                    events: $scope.filteredEvents,  // event source
                    eventAfterAllRender: function () { $('.fc-widget-header').remove(); }
                }
            };

            $scope.changeLang = function () {
                $scope.uiConfig.calendar.dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                $scope.uiConfig.calendar.dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                $scope.changeTo = 'Hungarian';
            };

            $scope.addEventDropdown = [
                {text: 'Add Booking', click: 'addBooking()'},
                {text: 'Add Hold Event', click: 'addHoldEvent()'}
            ];
            $scope.addBooking = function () {
                ModalService.showModal({
                    templateUrl: 'views/partials/add_event.html',
                    controller: 'CalendarCtrl',
                    inputs: {parentScope: $scope}
                }).then(function (modal) {
                    modal.scope.$on('$destroy', function () {
                        Restangular.all('calendar/all/').getList().then(function (res) {
                            $scope.events = res;
                            filterEvents();
                        });
                    });
                });
            };

            /* save custom event **/
            $scope.saveEvent = function (newEvent) {
                //if($scope.myPopover) { $scope.myPopover.hide(); }
                var payload = {
                    'guest_arrive': moment(newEvent.fromDate, 'DD/MM/YYYY'),
                    'guest_depart': moment(newEvent.untilDate, 'DD/MM/YYYY'),
                    'inquiry_id': newEvent.inquiry.pkey,
                    'rental_id': newEvent.rental.pkey,
                    'guest_id': newEvent.guest.pkey
                };

                var saveE = Restangular.all('booking/');
                saveE.customPOST(payload).then(function (response) {
                    $scope.newEvent = response;
                    notifyService.alert('success', 'Booking created successfully.');
                    $scope.closeModal();
                }, function () {
                    notifyService.alert('error', 'Unable to create a new booking.');
                });

                $scope.events.push(payload);
            };

            $scope.addHoldEvent = function () {
                ModalService.showModal({
                    templateUrl: 'views/partials/add_hold.html',
                    controller: 'CalendarCtrl',
                    inputs: {}
                }).then(function (modal) {
                    modal.scope.$on('$destroy', function () {
                        $scope.events.push(modal.scope.newEvent);
                        filterEvents();
                    });
                });
            };

            $scope.saveHoldEvent = function (holdEvent) {
                var data = {
                    'title': holdEvent.title,
                    'start': moment(holdEvent.fromDate, 'DD/MM/YYYY'),
                    'end': moment(holdEvent.untilDate, 'DD/MM/YYYY'),
                    'rental_id': holdEvent.rental.pkey
                };
                Restangular.one('calendar/').customPOST(data, '').then(function (res) {
                    $scope.newEvent = res;
                    $modalInstance().dismiss();
                    notifyService.alert('success', 'Hold event created successfully.');
                }, function () {
                    notifyService.alert('error', 'Unable to create hold event.');
                });
            };

            $scope.onEventClick = function (event, jsEvent, view) {
                if (event.booking_id) {
                    $state.go('app.booking', {bookingId: event.booking_id});
                } else {
                    // Get the event target.
                    var targ;
                    if (jsEvent.target) {
                        targ = jsEvent.target;
                    }
                    else if (jsEvent.srcElement) {
                        targ = jsEvent.srcElement;
                    }
                    if (targ.nodeType === 3) { // defeat Safari bug
                        targ = targ.parentNode;
                    }
                    // Create a jQuery event object from this target.
                    var angTarget = angular.element(targ);
                    var asAServiceOptions = {
                        title: 'Delete Event',
                        trigger: 'manual',
                        animation: 'am-flip-x',
                        html: 'true',
                        contentTemplate: 'views/partials/hold_event_pop.html',
                        autoClose: true,
                        container: 'body',
                        scope: $scope
                    };

                    var myPopover = $popover(angTarget, asAServiceOptions);
                    myPopover.$promise.then(myPopover.toggle);
                    $scope.deleteHoldEvent = function () {
                        Restangular.one('calendar/delete/', event.pkey).customDELETE('').then(function (res) {
                            for (var i = 0, len = $scope.events.length; i < len; i++) {
                                if ($scope.events[i].pkey === event.pkey) {
                                    break;
                                }
                            }
                            notifyService.alert('success', 'Hold event delete successfully.');
                            myPopover.hide();
                            // remove it from local
                            $scope.events.splice(i, 1);
                            filterEvents();
                        }, function () {
                            notifyService.alert('error', 'Unable to delete hold event.');
                        });
                    };
                }
            };

            // Add Booking Modal
            /* guests */
            $scope.guests = [];
            $scope.searchGuests = function (viewValue) {
                var query = {q: viewValue, limit: 20};
                $http.get('http://api.tokeet.com/guest/all/', {params: query}).then(function (res) {
                    $scope.guests = res.data;
                });
            };

            $scope.bookingGuestChange = function (guest, args) {
                setBookingInquiries(guest, args);
                $scope.guest = guest;
            };

            /* inquiry */
            $scope.inquiries = [];
            function setBookingInquiries(guest, args) {
                if (!guest.pkey) {
                    return;
                }
                Restangular.one('inquiry/all/guest/', guest.pkey).getList().then(function (res) {
                    $scope.inquiries = res;
                    //default inquiry
                    if ($scope.inquiries) {
                        $scope.inquiry = $scope.inquiries[0];
                    }
                    $scope.bookingInquiryChange($scope.inquiry, args);
                });
            }

            $scope.bookingInquiryChange = function (inquiry, args) {
                // set Date
                setBookingDate(inquiry.guest_arrive, inquiry.guest_depart, args);
                setBookingRental(inquiry);
                $scope.inquiry = inquiry;
            };

            $scope.bookingRentalChange = function (rental, args) {
                $scope.rental = rental;
            };

            /* fromDate untilDate */
            function setBookingDate(from, to, args) {
                $scope.fromDate = moment(from).format('DD/MM/YYYY');
                args.fromDatePikaday.setDate(moment(from).toDate());
                $scope.untilDate = moment(to).format('DD/MM/YYYY');
                args.untilDatePikaday.setDate(moment(to).toDate());
            }

            $scope.setNewMaxDate = function (fromDatePikaday, untilDate) {
                fromDatePikaday.setMaxDate(moment(untilDate, fromDatePikaday.config().format).toDate());
            };
            $scope.setNewMinDate = function (untilDatePikaday, fromDate) {
                untilDatePikaday.setMinDate(moment(fromDate, untilDatePikaday.config().format).toDate());
            };

            /* rental */
            function setBookingRental(inquiry) {
                if (!inquiry.rental_id) {
                    return;
                }
                // get and set rental
                $scope.rental = Restangular.one('rental/', inquiry.rental_id).get().$object;
            }

            /* remove event */
            $scope.remove = function (index, id) {
                var saveU = Restangular.all('calendar/delete/');
                saveU.customDELETE(id).then(function () {
                    // Add code to confirm deete
                }, function () {
                    // Add code to handle error
                });
                $scope.events.splice(index, 1);
            };

            $scope.closeModal = function () {
                $modalInstance().dismiss();
            };

            function getDateRange(moment, view) {
                switch (view) {
                    case 'agendaDay':
                        $scope.calendarRange = moment.format('MMM Do, YYYY');
                        break;
                    case 'agendaWeek':
                        $scope.calendarRange = moment.format('MMM') + ' ' + moment.weekday(0).format('Do') + '-' + moment.weekday(6).format('Do, YYYY');
                        break;
                    case 'month':
                        $scope.calendarRange = moment.format('MMMM, YYYY');
                        break;
                    default:
                        $scope.calendarRange = moment.format('MMM Do, YYYY');
                }

                $scope.calendarMonth = moment.format('MMMM');
            }
        });
