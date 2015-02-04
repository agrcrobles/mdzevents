angular.module('mdzevents.admin', [])
.controller('css.UICtrl', [ '$scope', '$log', 'admin.Service','$state', function($scope, $log, service, $state) {
	}])
.controller('admin.UICtrl', [ '$scope', '$log', 'admin.Service','$state', function($scope, $log, service, $state) {
	
	$scope.init = function() {
		 $log.info('admin.UICtrl');
	};

	$scope.goPopulate = function(){
		$state.go('app.populate');
	}

	$scope.goSQLEditor = function(){
		$state.go('app.queryeditor');
	}
	$scope.goMaps = function(){
		$state.go('app.maps');
	}

	$scope.goStyling = function(){
		alert( squel.VERSION );
		$state.go('app.css');
	}
	$scope.beginIntercept = function(){

		debugger;
		//httpSQLInterceptor.beginIntercept();
	}
}])
.service('admin.Service', function(baseService){
  var instance = baseService.factory('admin.Service');

  return instance;
});