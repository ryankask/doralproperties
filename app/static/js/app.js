(function() {
  'use strict';

  var deps = ['ngRoute', 'doralProps.controllers', 'doralProps.directives'],
      app = angular.module('doralProps', deps);

  app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/page/about', {
      templateUrl: '/partials/about.html'
    }).when('/page/properties', {
      templateUrl: '/partials/properties.html'
    }).when('/page/services', {
      templateUrl: '/partials/services.html'
    }).when('/page/social', {
      templateUrl: '/partials/social.html'
    }).when('/page/farmers-market', {
      templateUrl: '/partials/farmers-market.html'
    }).otherwise({
      templateUrl: '/partials/home.html'
    });

    $locationProvider.html5Mode(true);
  });
})();
