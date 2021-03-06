'use strict';

 angular.module('mdzevents.events', [])
 
.controller('mdzevent.QueryUICtrl', ['$controller','$scope', '$log', 'mdzevent.service.resource', function ($controller,$scope, $log,  service) {
         $log.info('mdzevent.CommandCreateCtrl instantiated');

    // instantiate base controller
    $controller('mdzevent.QueryCtrl', { $scope: $scope });
}])

// base controller containing common functions for add/edit 
.controller('mdzevent.QueryCtrl',	['$scope', '$controller', '$log', 'mdzevent.Service', 
  'mdzevent.service.resource', '$ionicLoading', '$state',
  function ($scope, $controller, $log, svc, service, $ionicLoading, $state) {

     $log.info('mdzevent.QueryCtrl instantiated');

      // // instantiate base controller
      $controller('generic.UICtrl', { $scope: $scope });

    $scope.init = function(){
        return $scope.query();
    };

    $scope.getImage = function(item) {
      return "img/svg/happy (" + item.categoria_id + ").svg";
    };

    $scope.query = (function() {
        $ionicLoading.show({ template: 'Obteniendo eventos...' });
        return service.get().$promise.then(function (mdzevent) {
            $scope.events = mdzevent;
            $ionicLoading.hide();
          }, 
          function () { 
            $ionicLoading.hide();
          });
    });

    $scope.$on("$destroy", function() {
        $scope.events = null;
    });

    $scope.get = function(id) {
        return service.get({ id: id }).$promise.then(function(mdzevent) {
            $scope.item = mdzevent;
        });
    };

    $scope.info = function() {
        $state.go('app.event-info');
    };
}])

.service('mdzevent.Service', function(baseService){
  var instance = baseService.factory('mdzevent.Service');

  return instance;
})
//https://docs.angularjs.org/api/ngResource/service/$resource
.service('mdzevent.service.resource', function($resource, endpoint, $log){
    return $resource(endpoint.url + 'events/:id');
});
