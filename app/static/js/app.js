window.$ = window.jQuery = require('jquery');
require('./vendor/jquery-flexslider');
var angular = require('angular');
require('angular-ui-router');
require('./controllers');
require('./directives');

var app = angular.module('doralProps', [
  'ui.router',
  'doralProps.controllers',
  'doralProps.directives'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/partials/home.html',
    data: {
      pageBannerUrl: '/static/images/properties/9690/hi2.jpg'
    }
  }).state('about', {
    url: '/page/about',
    templateUrl: '/partials/about.html'
  }).state('properties', {
    url: '/page/properties',
    templateUrl: '/partials/properties.html'
  }).state('farmers-market', {
    url: '/page/farmers-market',
    templateUrl: '/partials/farmers-market.html'
  });

  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
});
