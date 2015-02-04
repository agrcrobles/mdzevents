'use strict';

var skipTrailingSlashes = function($resourceProvider) {
  // Don't strip trailing slashes from calculated URLs
  $resourceProvider.defaults.stripTrailingSlashes = false;
};

angular.module('mdzevents.components.admin',
  [ 
  'mdzevents.admin',
  'mdzevents.admin.db.populate' ,
  'mdzevents.admin.db.queryeditor' 
  ]);

angular.module('mdzevents.components', [
  'mdzevents.controllers',
  'mdzevents.events',
  'mdzevents.services',
  'mdzevents.shared.services',
  'mdzevents.directives',
  'mdzevents.shared.controllers',
  'mdzevents.components.admin',
  'mdzevents.db',
  'mdzevents.db.repository',
  'mdzevents.services.config'
  ]);

angular.module('mdzevents.libraries', ['ionic', 
  'config', 
  'ngCordovaCustom',
  'ngResource'
  ]);

angular.module('mdzevents.interceptors', [
    'mdzevents.timestamp',
    'mdzevents.httpsqlpersistence',
    'mdzevents.spinner'
  ]);

angular.module('mdzevents.Tests', [ 'mdzevents.libraries', 'mdzevents.components' ])
.config(['$resourceProvider', skipTrailingSlashes]);

angular.module('mdzevents', [ 
  'mdzevents.libraries', 
  'mdzevents.components',
  'mdzevents.routes',
  'mdzevents.interceptors'
   ])
.config(['$resourceProvider', skipTrailingSlashes])
