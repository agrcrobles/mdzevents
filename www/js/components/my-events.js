'use strict';

 angular.module('mdzevents.events')
 
.controller('mdzevent.MyEventsUICtrl', ['$controller','$scope', '$log', 'mdzevent.service.resource', function ($controller,$scope, $log,  service) {
         $log.info('mdzevent.CommandCreateCtrl instantiated');

    // instantiate base controller
    $controller('mdzevent.MyEventsCtrl', { $scope: $scope });
}])

// base controller containing common functions for add/edit 
.controller('mdzevent.MyEventsCtrl',	['$scope', '$controller', '$log', 'mdzevent.Service', 
    'mdzevent.service.resource', '$ionicLoading', '$state',
 function ($scope, $controller, $log, svc, service, $ionicLoading, $state) {

    $log.info('mdzevent.MyEventsCtrl instantiated'); 

    // // instantiate base controller
    $controller('generic.UICtrl', { $scope: $scope });

    $scope.init = function(){
        return $scope.query();
    };

    $scope.getImage = function(item) {
      return "img/svg/happy (" + item.categoria_id + ").svg";
    };

    $scope.query = (function() {
        $ionicLoading.show({ template: 'Obteniendo tus eventos...' });
        return service.get().$promise.then(function (mdzevents) {
            $scope.currentEvents = mdzevents.actividades.slice(5, 8);
            $ionicLoading.hide();
          }, 
          function () { 
            $ionicLoading.hide();
          });
    });

    $scope.$on("$destroy", function() {
        $scope.currentEvents = null;
    });

    $scope.info = function() {
        $state.go('app.event-info');
    };
}]);
