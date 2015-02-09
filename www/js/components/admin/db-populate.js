angular.module('mdzevents.admin.db.populate', [])
.controller('db.PopulateCtrl', ['$scope', 'db', 'populateService', function($scope, db, populateService){

	var init_requests = function(){
		return populateService.populate_requests().then(function(){
			$scope.msg = "reuqests db populated successfuly !!!!"
		}, function(error){
			$scope.msg = "error populating request db: " + JSON.stringify(error);
		});
	};

	$scope.init = function(){
		
		var size = 5 * 1024 * 1024;
		var databaseName = db.mdz;
		populateService.init(databaseName, size)

		init_requests().then(function(){
		})

	};
}])
.service('populateService', ['$window', '$http', '$q', 'baseService', function($window, $http, $q, baseService) {
	var instance = baseService.factory('populate.service');

	var q = $q.defer();

	instance.init = function(databaseName, size) {
		$window.databasePopulator = databasePopulator;
		$window.databasePopulator.init(databaseName, size);
	};

	instance.handleSuccess = function( response ) {
		$window.databasePopulator.run_scripts(response.data, function() {
			q.resolve();
		}, function(error){
			q.reject(error);
		});
	}

	instance.populate_requests = function(){
		var request = $http({	method: "get",
			url: "/sql/populate.sql",
			params: { action: "get" }
		});

		request.then( instance.handleSuccess, instance.handleError );

		return q.promise;
	};


	return instance;
}]);


