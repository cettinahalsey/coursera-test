(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsListController', ItemsListController);


  
 //* Lesson 40
 //* 'item' is injected through state's resolve
ItemsListController.$inject = ['$stateParams','items','citems','categorySN','category'];
function ItemsListController($stateParams,items,citems,categorySN,category) {
    var itemsList = this;
    
    console.log('ItemsListController($stateParams,citems) ');
    console.log($stateParams);
    console.log('this ');
    console.log(this);
    console.log('citems.data.category, category ');
    console.log(citems.data.category, category, categorySN);
    console.log('citems.data.category.short_name ');
    console.log(citems.data.category.short_name);
    console.log('citems.data.menu_items[0]');
    console.log(citems.data.menu_items[0]);
    console.log('ItemsListController($stateParams,citems)has citems ');
    
    console.log('ItemsListController(declaring citems) ');
    itemsList.citems = [];
    itemsList.categorySN = categorySN;
    itemsList.category = category;
    for(var i = 0; i<citems.data.menu_items.length; i++)
                {      
                    var item = {
                        id: citems.data.menu_items[i].id,
                        shortName: citems.data.menu_items[i].short_name,      
                        name: citems.data.menu_items[i].name,
                        description: citems.data.menu_items[i].description     
                         };
                            console.log(item);
                            console.log(item.id);
                    itemsList.citems.push(item);
                }
   //matches the url in routes: url: '/items-list/{itemId}'
    console.log('Logging itemsList.citems');
    console.log(itemsList.citems);
    console.log('ItemsListController($stateParams,items) showing the first ');
    console.log(itemsList.citems[0]);
  
    console.log("Exiting ItemsListController ***");
  
    
    
}

})();
