'use strict';

angular.module("tokeetApp")
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('index', {
                url: '/',
                templateUrl: 'views/index.html',
                controller: 'IndexCtrl',
                data: {
                    title: "Home"
                }
            })
            .state('app', {
                abstract: true,
                url: '',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                data: {
                    title: "Main"
                }
            })
            .state('app.calendar', {
                url: '/calendar',
                templateUrl: 'views/calendar.html',
                controller: 'CalendarCtrl',
                data: {
                    title: "Calendar"
                }
            })
            .state('app.channels', {
                url: '/channels',
                templateUrl: 'views/channels.html',
                controller: 'ChannelsCtrl',
                data: {
                    title: "Channels"
                }
            })
            .state('app.inquiries', {
                url: '/inquiries',
                templateUrl: 'views/inquiries.html',
                controller: 'InquiryListCtrl',
                data: {
                    title: "Inquiries"
                }
            })
            .state('app.inquiry', {
                url: '/inquiry/:inquiryId',
                templateUrl: 'views/inquiry.html',
                controller: 'InquiryCtrl',
                data: {
                    title: "Inquiry Detail"
                },
                params:{inquiryId:null}
            })
            .state('app.bookings', {
                url: '/bookings',
                templateUrl: 'views/bookings.html',
                controller: 'BookingsCtrl',
                data: {
                    title: "Bookings"
                }
            })
            .state('app.booking', {
                url: '/booking/:bookingId',
                templateUrl: 'views/booking.html',
                controller: 'BookingCtrl',
                data: {
                    title: "Booking Detail"
                }
            })
            .state('app.user', {
                url: '/users',
                templateUrl: 'views/users.html',
                controller: 'UserCtrl',
                data: {
                    title: "Users"
                }
            })
            .state('app.rental', {
                url: '/rentals',
                templateUrl: 'views/rentals.html',
                controller: 'RentalCtrl',
                data: {
                    title: "Rentals"
                }
            })
            .state('app.billing', {
                url: '/billing',
                templateUrl: 'views/billing.html',
                controller: 'BookingCtrl',
                data: {
                    title: "Billing"
                }
            })
            .state('app.guests', {
                url: '/guests',
                templateUrl: 'views/guests.html',
                controller: 'GuestListCtrl',
                data: {
                    title: "Guests"
                }
            });
        $urlRouterProvider.otherwise('/guests');
        $locationProvider.html5Mode(true);
    });