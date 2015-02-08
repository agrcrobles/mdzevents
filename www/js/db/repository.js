(function (module) {
	module.service('repository', ['$log', '$q', 'db', 'queries', 'databaseService', function ($log, $q, db, queries, databaseService) {
		function repository() {
			$log.info('instantiating repository');
		};

		repository.prototype.open = function open(msg) {
      $log.info('open db');
      console.log("databaseService = " + !!databaseService);
      this.odb = databaseService.openDB(db.queries);
    };

    repository.prototype.insertIntoRequest = function insertIntoRequest(values) {
           // "insert into 'request' values(?, ?);";

           return databaseService.exec(this.odb, queries.insertRequest, values);
         };


         repository.prototype.selectFromRequest = function selectFromRequest(value) {
       //var select_statement = 'select data from request where url = "' +  value + '";'
       var statement = 
       squel.select()
       .from("request")
       .field("data")
       .where("url = ?", value);

       return databaseService.execute(this.odb, statement.toString(), []);
     };

     var instance = new repository();
     return instance;
   }]);

}(angular.module("mdzevents.db.repository", [])));