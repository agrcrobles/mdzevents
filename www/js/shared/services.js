
var module = angular.module('mdzevents.shared.services', []);

module.service('baseService', ['$log', '$http', '$q', function ($log, $http, $q) {
    function BaseService(name) {
        this.name = name;
        $log.info('instantiated ' + this.name);
        this.model = null;
    };

    BaseService.prototype.getId = function getId(id) {
        return { Id: id };
    };

    BaseService.prototype.setModel = function setModel(model) {
        this.model = model;
    };
    
    BaseService.prototype.fdo = function (url, args) {
        var self = this;

        var deferred = $q.defer();

        $http.post(url, args)
        .then(function (data) { deferred.resolve(data.data); }, function () { deferred.reject(); });
        return deferred.promise;
    };


    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    BaseService.prototype.handleSuccess = function( response ) {
        return( response.data );
    };

        // I transform the error response, unwrapping the application dta from
    // the API response payload.
    BaseService.prototype.handleError = function( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (! angular.isObject( response.data ) ||
            ! response.data.message) {
            return( $q.reject( "An unknown error occurred." ) );
    }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }

    var instance = new BaseService('generic');

    return {
        factory: function (name) {
            function Constructor() { }
            Constructor.prototype = instance;
            return new Constructor(name);
        }
    }
}]);