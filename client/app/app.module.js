/**
 * Created by youngmoon on 1/2/15.
 */
'use strict';

angular.module('ninja', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .run(function ($rootScope, $location) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$routeChangeStart', function (event, next) {
      //Auth.isLoggedInAsync(function(loggedIn) {
      //  if (next.authenticate && !loggedIn) {
      //    $location.path('/login');
      //  }
      //});
    });
  });
