(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider
  .otherwise('/');
  

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  // list of categories
  .state('mainList', {
    url: '/main-list',
    templateUrl: 'src/menulist/templates/main-menulist.template.html',
    controller: 'MainMenuListController as mainList',
    //better than in lesson 37, we get the list upfront in the first view
    resolve: {
      items: ['MenuListService', function (MenuListService) {
              console.log('resolve: state mainList');           
        return MenuListService.getAllCategories();
      }]
    }
  })
 //-------------------------------
 
  .state('itemsList', {
    parent: 'mainList',
    url: '/items-list/{itemId}',
    templateUrl: 'src/menulist/templates/items-list.template.html',
    controller: 'ItemsListController as itemsList',
    resolve: {
        citems: ['$stateParams','MenuListService',
            function ($stateParams, MenuListService) {
                console.log('resolve: state itemsList');   
              return MenuListService.getItemsForCategory($stateParams.itemId)
                ;
            }],
        categorySN: ['$stateParams', 'MenuListService',
            function ($stateParams, MenuListService) {
                console.log('resolve: state itemsList');   
              return MenuListService.getCategorySN($stateParams.itemId)
                ;
            }],
        category: ['$stateParams', 'MenuListService',
            function ($stateParams, MenuListService) {
                console.log('resolve: state itemsList');   
              return MenuListService.getCategory($stateParams.itemId)
                ;
            }]
    }
  })
  
 //--------------------------------
    
  ;
  
}


})();



