angular.module('mdzevents.db', [])
.factory('databaseService', ['$cordovaSQLite', 'db', '$q', function($cordovaSQLite ,db, $q) {

	return {
		openDBMaps : function() {
			return $cordovaSQLite.openDB(db.maps);
		},
		openDB : function(databaseName) {
			console.log("$cordovaSQLite = " + !!$cordovaSQLite);
			console.log("window.SQLitePlugin = " + !!window.SQLitePlugin);
			return $cordovaSQLite.openDB(databaseName);
		}, 
		exec: function(db, query, bindings) {
			return $cordovaSQLite.execute(db, query, bindings);
		}, 
		execute: function(db, query) {
			return $cordovaSQLite.execute(db, query, []);
		}, 

		toString: function(result) {
			if(result.rows.length > 0) {
				var resultsAsString;
				for (var i = 0; i < result.rows.length; i++)
				{
					resultsAsString += JSON.stringify(result.rows.item(i)) + '\n';
				}
				return resultsAsString;
			}
			else {
				return '';
			}				
		},
	    fetchAll : function(result) {
	        var output = [];
	       for (var i = 0; i < result.rows.length; i++) {
	            output.push(result.rows.item(i));
	        }
	        return output;
	    },		 
	    fetch : function(result) {
	        return result.rows.item(0);
	    }
	};
}]);
