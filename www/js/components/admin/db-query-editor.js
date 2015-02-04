angular.module('mdzevents.admin.db.queryeditor', [])

.controller('db.QueryEditorCtrl', function($scope, db,$log, databaseService) {

 $log.info('db.QueryEditorCtrl instantiated');

	$scope.database = {};
	$scope.database.name = db.maps;

	$scope.database.query = 'select * from request;';

	$scope.run = function() {
		odb = databaseService.openDB($scope.database.name);
		databaseService.execute(odb, $scope.database.query, []).then(function(result){
			$scope.msg = 'script run successfully';
			$scope.results = databaseService.toString(result);				
		}, function(error){
			$scope.msg = 'error running script: ' + JSON.stringify(error);
		});
	}
})
.controller('db.QueryExecutorCtrl', function($scope, $log, $controller, db, databaseService){
    $log.info('db.QueryExecutorCtrl instantiated');

    // instantiate base controller
    $controller('faq.QueryCtrl', { $scope: $scope });

	
    $scope.run = function() {
		odb = databaseService.openDB($scope.database.name);
		databaseService.execute(odb, $scope.database.query, []).then(function(result){
			//$scope.msg = 'script run successfully';
			//$scope.results = JSON.stringify(result);	
			$scope.msg = JSON.stringify(result);	
		}, function(error){
			$scope.msg = 'error running script: ' + JSON.stringify(error);
		});

	}
});
