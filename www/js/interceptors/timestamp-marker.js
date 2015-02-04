angular.module('mdzevents.timestamp', [])
.factory('timestampMarker', function() {  
    var timestampMarker = {
        request: function(config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function(response) {
            if(response)
                response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return timestampMarker;
})
.config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('timestampMarker');
}]);