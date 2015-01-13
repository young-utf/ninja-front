/**
* Created by youngmoon on 1/5/15.
*/
'use strict';

angular.module('ninja')
  .factory('System', function ($location) {
    return {
      out: {
        println: function () {
          return console.log;
        }
      }
    };
  });