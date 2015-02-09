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

  .state('app.myevents', {
    url: "/voya",
    views: {
      'menuContent': {
        templateUrl: "templates/voya.html",
        controller: 'mdzevent.MyEventsUICtrl'
      }
    }
  })

  .state('app.event-info', {
    url: "/info",
    views: {
      'menuContent': {
        templateUrl: "templates/event-info.html",
        controller: 'mdzevent.EventInfoUICtrl'
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