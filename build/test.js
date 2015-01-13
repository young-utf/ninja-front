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

/**
 * Created by youngmoon on 1/2/15.
 */
'use strict';

angular.module('ninja')
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    console.log('haha');
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
    $httpProvider.interceptors.push('interceptor');

  })
  .factory('interceptor', function ($rootScope, $q, $cookieStore, $location, System) {
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
  });
/**
 * Created by youngmoon on 1/5/15.
 */
'use strict';

angular.module('ninja')
  .controller('HomeCtrl', function ($scope) {
    console.log('in home');
  });
/**
 * Created by youngmoon on 1/5/15.
 */
'use strict';

angular.module('ninja')
    .controller('UserCreateCtrl', function ($scope) {
      console.log('in user create');
    });
/**
 * Created by youngmoon on 1/5/15.
 */

/**
 * Created by youngmoon on 1/5/15.
 */

/**
* Created by youngmoon on 1/5/15.
*/
'use strict';

angular.module('ninja')
  .factory('System', function ($location) {
    return {
      out: {
        println: ($location.$$host === 'thisground') ? undefined : console.log
      }
    };
  });