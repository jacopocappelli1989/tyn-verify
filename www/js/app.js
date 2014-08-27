'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'mobile-angular-ui',
  'ngCordova'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {templateUrl: 'partials/login.html', controller: 'CtrlLogin'});
  $routeProvider.when('/eventlist', {templateUrl: 'partials/eventlist.html', controller: 'CtrlEventList'});
  $routeProvider.when('/dettaglievento/:idevento', {templateUrl: 'partials/dettaglievento.html', controller: 'CtrlEventDetail'});
  $routeProvider.otherwise({redirectTo: '/login'});
}]);