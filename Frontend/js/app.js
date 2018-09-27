angular.module('myIonicApp', ['ionic', 'myIonicApp.controllers','ngCordova'])

.constant('ApiEndpoint',{
  url: 'http://localhost:8100/api/'
})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$compileProvider) {
   // $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    //$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https|ftp|mailto|file|tel|data)/);
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
    .state('init', {
    url: '/init',
    abstract: true,
    templateUrl: 'templates/init.html',
    //controller: 'AppCtrl'
  })
  .state('app.home',{
    url: '/home',
    views: {
        'menuContent': {
            templateUrl: 'templates/front.html',
            controller: 'homeCtrl'
        }
    }
  })
  
  .state('app.story',{
    url: '/story',
    views: {
        'menuContent': {
            templateUrl: 'templates/user-story.html',
             controller: 'StoryShareCtrl'
        }
    }
  })
   
    .state('app.view',{
    url: '/view',
    views: {
        'menuContent': {
            templateUrl: 'templates/view-places.html',
             controller: 'ViewCtrl'
        }
    }
  })
    
  .state('app.account',{
    url: '/account',
    views: {
        'menuContent': {
            templateUrl: 'templates/account.html',
             controller: 'AccountCtrl'
        }
    }
  })
  .state('app.place',{
    url: '/place-info',
    views: {
        'menuContent': {
            templateUrl: 'templates/place-info.html',
            controller: 'PlaceCtrl'
        }
    }
  })
    
    .state('app.story-read',{
    url: '/story-read',
    views: {
        'menuContent': {
            templateUrl: 'templates/view-stories.html',
            controller: 'story-read'
        }
    }
  })
    
    .state('app.point-map',{
    url: '/point-map',
    views: {
        'menuContent': {
            templateUrl: 'templates/map.html',
             controller: 'mapCtrl'
        }
    }
  }) 
    
    .state('app.view-map',{
    url: '/view-map',
    views: {
        'menuContent': {
            templateUrl: 'templates/view-in-map.html',
             controller: 'Viewmap'
        }
    }
  }) 
    
     .state('app.institutes',{
    url: '/institutes',
    views: {
        'menuContent': {
            templateUrl: 'templates/institutes.html',
             controller: 'insCtrl'
        }
    }
  }) 
    
     .state('app.adds',{
    url: '/adds',
    views: {
        'menuContent': {
            templateUrl: 'templates/advertisement.html',
            controller: 'adsCtrl'
        }
    }
  }) 
    
  .state('init.login', {
    url: '/login',
    views : {
         'menuContent': {
            templateUrl: 'templates/login.html',
            controller: 'LoginCtrl'
        }
    } 
  })
  .state('init.signup',{
      url: '/signup',
      views: {
        'menuContent': {
            templateUrl: 'templates/signup.html',
            controller: 'SignupCtrl'
        }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/init/login');
});
