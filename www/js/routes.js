  angular.module('mdzevents.routes', [])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.events', {
    url: "/events",
    views: {
      'menuContent': {
        templateUrl: "templates/events.html",
        controller: 'mdzevent.QueryUICtrl'
      }
    }
  })
  //admin section
  .state('app.admin', {
    url: "/admin",
    views: {
      'menuContent': {
        templateUrl: "templates/admin.html",
        controller: 'admin.UICtrl'
      }
    }
  })
  .state('app.populate', {
    url: "/admin/populate",
    views: {
      'menuContent': {
        templateUrl: "templates/admin/db-populate.html",
        controller: 'db.PopulateCtrl'
      }
    }
  })
  .state('app.queryeditor', {
    url: "/admin/queryeditor",
    views: {
      'menuContent': {
        templateUrl: "templates/admin/db-query-editor.html",
        controller: 'db.QueryEditorCtrl'
      }
    }
  })
  .state('app.css', {
    url: "/admin/css",
    views: {
      'menuContent': {
        templateUrl: "templates/admin/css.html",
        controller: 'css.UICtrl'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/events');
})
;