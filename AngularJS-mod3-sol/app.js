//works as they want
(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&' //method with the same name
    },
    controller: NarrowItDownController,
    controllerAs: 'controller',
    bindToController: true
  };
  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var controller = this;

  //controller.term = "soup";
  controller.found = [];
  controller.message = "";
  controller.title = "";
  controller.baseTitle = "Matching your search ";
  
  controller.show = function()
  {
      return controller.found.length;
  };
  
   controller.removeItem = function (itemIndex) {
//    console.log("removing called ");
//    console.log("'this' is: ", this);
    controller.found.splice(itemIndex, 1);
    if(controller.found.length===0)
    {
//        console.log("no more items ");
        controller.message = "Sorry, no item left!";
//        console.log(controller.message);
    }
    else
    {
        controller.title = controller.baseTitle + " " +controller.show();
    }
  };
  
  controller.searchTerm = function()
  {
    //console.log("Searching ..."); 
    controller.message = "";
    var promise = MenuSearchService.getMatchedMenuItems(controller.term);
//        console.log(promise);
//        console.log("Done searching"); 
    promise.then(function (found){
//           console.log("Found in controller: " +found.length);
            controller.found = found;
            if(controller.found.length===0)
            {
                controller.message = "No item matching your search found!";
                controller.title = "";
                controller.show();
            }
            else
            {
//                console.log("TITLING");
                controller.title = controller.baseTitle + " " +controller.show();
//                console.log(controller);
            }
//           for(var i =0; i<found.length; i++)
//           {
//                console.log(controller.found[i].id+
//                        "***"+controller.found[i].shortName+
//                        "***"+controller.found[i].name+
//                        "***"+controller.found[i].description);
//           }
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath','$q'];
function MenuSearchService($http, ApiBasePath, $q) {
  var service = this;
  service.everyDish = [];
  
//  service.removeItem = function (itemIndex) {
//    service.everyDish.splice(itemIndex, 1);
//  };
  
  service.getMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    
    return response;
  };
  
  service.getMatchedMenuItems = function(term)
  {
      var found = [];
      var deferred = $q.defer();
//      console.log("getMatchedMenuItems  at the beginning "+service.everyDish.length);
      
        var promise = service.findItems(term);
//        console.log(promise);
//        promise.then((value) => console.log("asynchronous logging has val:",value))
        
        promise.then(function (result){
//           console.log("Logging value "+result[0].id); 
//           console.log("Logging value "+result.length); 

            service.everyDish = result;
//            console.log("getMatchedMenuItems  at the end "+service.everyDish.length);

            found = service.everyDish;
            deferred.resolve(found);
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
        return deferred.promise;
  };


  service.findItems  = function(term)
  {  
    var everyDish = [];
    var deferred = $q.defer();
    
  var result = [];
     
      //---------------------
        var promise = service.getMenuItems();
      //---------------------
        promise.then(function (response) {
            
            var allItems = response.data;
            var menu_items = allItems.menu_items;
//            console.log("Logging in service");
//            console.log(allItems.menu_items[0].short_name);
//            console.log("Proceding");
//            console.log("getMatchedMenuItems "+term);
//            console.log("getMatchedMenuItems "+menu_items.length);
            term = term.toLowerCase();
            
      
            for(var i=0; i<menu_items.length; i++)
            {
          //console.log(menu_items[i].id+"***"+menu_items[i].short_name+"***"+menu_items[i].name+"***"+menu_items[i].description);
              if( menu_items[i].id.toString().toLowerCase().includes(term) ||
                  menu_items[i].short_name.toLowerCase().includes(term) ||
                  menu_items[i].name.toLowerCase().includes(term) ||
                  menu_items[i].description.toLowerCase().includes(term))
                {
                      var dish = {
                        id: menu_items[i].id,
                        shortName: menu_items[i].short_name,      
                        name: menu_items[i].name,
                        description: menu_items[i].description
                         };
                       everyDish.push(dish);
//                       console.log(dish);
                       
                }       
            }
            
//           console.log("Final length everyDish = " +everyDish.length);

            result = everyDish;
            deferred.resolve(result);
           
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });
        return deferred.promise;
        
  };

}

})();



