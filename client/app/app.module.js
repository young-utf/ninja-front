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
    .config(function ($routeProvider, $locationProvider, $httpProvider) {
      console.log('app Start !!!!');
      var component = 'app/components/';
      $routeProvider
          .when('/', {
            templateUrl: component + 'home/home.html',
            controller: 'HomeCtrl'
          })
          .when('/user/create', {
            templateUrl: component + 'user/create/user.create.html',
            controller: 'UserCreateCtrl'
          })
          .otherwise({
            redirectTo: '/'
          });

      $locationProvider.html5Mode(true);
      //$httpProvider.interceptors.push('authInterceptor');
    })
    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
      console.log('intercepting !!!');
      return {
        // Add authorization token to headers
        request: function (config) {
          console.log('intercepting !!!');
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
          }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function(response) {
          if(response.status === 401) {
            $location.path('/login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    })

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
