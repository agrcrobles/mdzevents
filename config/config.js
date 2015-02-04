'use strict';

angular.module('mdzevents.services.config', [])
  .constant('configuration', {
    foo: '@@foo'
  })
  .constant('db', {
    mdz: '@@db'    
  })
  .constant('queries', {
    insertRequest: '@@queries-insert-request'    
  })
  .constant('endpoint', {
    url: '@@endpoint'
  });
