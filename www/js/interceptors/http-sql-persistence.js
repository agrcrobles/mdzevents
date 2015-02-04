
angular.module('mdzevents.httpsqlpersistence', [])
.factory('httpSqlInterceptorSaver', ['repository',function(repository) {  
    var saver = {
        response: function(response) {

            // do something on success
            if(response && response.data && response.headers()['content-type'] === "application/json; charset=utf-8"){

                //var repository = $injector.get('repository');

                var request_url =response.config.url; 

                var response_result = JSON.stringify(response.data) ;

                repository.open();
                repository.insertIntoRequest([request_url, response_result])
                .then(function(result1){

                });
            }
            return response;
        }
    };
    return saver;
}])

.factory('httpSqlInterceptorRequester', ['repository','$q', function(repository, $q) {  
    var requester = {
        responseError: function(response) {

            repository.open();

            var request_url =response.config.url; 
            var promise = repository.selectFromRequest(request_url)
            .then(function(result2){
                if(result2.rows.item.length > 0){
                            //cached sqllite json in data  
                            var data = result2.rows.item(0).data;
                            response.data = JSON.parse(data);
                        }

                        return response;
                    });
            return $q.when(promise);
        }
    };
    return requester;
}])


.config(['$httpProvider', function($httpProvider) {  
 $httpProvider.interceptors.push('httpSqlInterceptorRequester');
 $httpProvider.interceptors.push('httpSqlInterceptorSaver');
}]) 

