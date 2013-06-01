(function() {
  'use strict';

  var deps = ['doralProps.controllers', 'doralProps.directives'],
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
    }).otherwise({
      templateUrl: '/partials/home.html'
    });

    $locationProvider.html5Mode(true);
  });
})();
