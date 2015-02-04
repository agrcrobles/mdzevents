(function(){

  angular.module('ngCordovaCustom', ['ngCordova'])
  .factory('$cordovaSqlDbCopy',  ['$q', '$window', function ($q, $window) {

    return {

      copy: function (databaseName) {

        var q = $q.defer();

        $window.plugins.sqlDB.copy(databaseName,function() {
         q.resolve();
       },
       function(error) { 
        console.log(error);
        q.reject(error);
      });

        return q.promise;
      }
    };
  }
  ]);

})();