'use strict'

angular.module('mdzevents.controllers', [])

.controller('AppCtrl', function($state, $scope, $log, $controller) {


    $log.info('AppCtrl instantiated');

      // // instantiate base controller
   $controller('db.PopulateCtrl', { $scope: $scope });

    $scope.app_init = function(){
      $scope.init();
    }

    $scope.goHome = function(){
        $state.go('app.home');
  }
  // $scope.init = (function{
  //   $scope.User = {};
  //   $scope.User.name = 'Peter';
  //   $scope.User.lastname = 'Grifin';
  // }) ()
})


.controller('DashCtrl', function($scope) {
	$scope.isOk = true;
})

.controller('AccountCtrl', function($scope) {
})
.controller('UICSSCtrl', function($scope) {
})


/*
.controller('FriendsCtrl', function($scope, $cordovaSQLite) {
  var map = L.map('map').setView([-35.178448,-58.53241], 4);
  var lyr = new L.TileLayer.MBTiles('', {maxZoom: 12, tms:true}, $cordovaSQLite, "bsas.mbtiles");
  map.addLayer(lyr); 
})*/
