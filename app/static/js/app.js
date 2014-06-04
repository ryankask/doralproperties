window.$ = window.jQuery = require('jquery');
require('./vendor/jquery-flexslider');
var angular = require('angular');
require('angular-route');
require('./controllers');
require('./directives');

var app = angular.module('doralProps', [
  'ngRoute',
  'doralProps.controllers',
  'doralProps.directives'
]);

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
