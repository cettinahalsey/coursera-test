(function() {
'use strict';

angular.module('public')
.config(routeConfig);

/**
 * Configures the routes and views
 */
routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      abstract: true,
      templateUrl: 'src/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'src/public/home/home.html'
    })
    .state('public.menu', {
      url: '/menu',
      templateUrl: 'src/public/menu/menu.html',
      controller: 'MenuController',
      controllerAs: 'menuCtrl',
      resolve: {
        menuCategories: ['MenuService', function (MenuService) {
          return MenuService.getCategories();
        }]
      }
    })
    .state('public.menuitems', {
      url: '/menu/{category}',
      templateUrl: 'src/public/menu-items/menu-items.html',
      controller: 'MenuItemsController',
      controllerAs: 'menuItemsCtrl',
      resolve: {
        menuItems: ['$stateParams','MenuService', function ($stateParams, MenuService) {
          return MenuService.getMenuItems($stateParams.category);
        }]
      }
    })
    .state('public.signup', {
      url: '/signup',
      templateUrl: 'src/public/signup/signup.html',
      controller: 'SignUpController',
      controllerAs: 'signup'
      ,
      resolve: {
        allItems: ['MenuService', function (MenuService) {
                console.log("state: public.signup allItems");
          return MenuService.getMenuItems();
        }],
         user: ['InfoService', function (InfoService) {
                console.log("state: public.signup user, checking InfoService");
          return InfoService.addUser();
        }]
      }
    })
    .state('public.info', {
      url: '/info',
      templateUrl: 'src/public/info/info.html',
      controller: 'InfoController',
      controllerAs: 'info'
      ,
      resolve: {
        allItems: ['MenuService', function (MenuService) {
           console.log("state: public.info allItems");
          return MenuService.getMenuItems();
        
        }],
        users: ['InfoService', function (InfoService) {
          console.log("state: public.info users");
          return InfoService.getUsers();       
        }]
          
      }
    });
}
})();