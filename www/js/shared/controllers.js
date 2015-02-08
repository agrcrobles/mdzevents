angular.module('mdzevents.shared.controllers', [])

.controller('generic.UICtrl', ['$controller','$scope', '$log', 
  function ($controller,$scope, $log) {
    $log.info('generic.UICtrl instantiated');

    $controller('db.PopulateCtrl', { $scope: $scope });

    $scope.app_init = function(){
      $scope.init();
    }

    $scope.toggleGroup = function(group) {
      if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = group;
      }
    };
    $scope.isGroupShown = function(group) {
      return $scope.shownGroup === group;
    };  

}]) ;