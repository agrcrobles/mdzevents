'use strict';
/*
var spinner = function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show')
        return config
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide')
        return response
      }
    }
  })
};
*/
angular.module('mdzevents.spinner', [])/*
.config(spinner)
.run(function($rootScope, $ionicLoading) {
  $rootScope.$on('loading:show', function() {
    $ionicLoading.show();
  })

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  })
})*/