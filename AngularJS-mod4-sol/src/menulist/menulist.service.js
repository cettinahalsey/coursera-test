(function () {
'use strict';

angular.module('MenuApp')
.service('MenuListService', MenuListService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


MenuListService.$inject = ['$http', 'ApiBasePath'];
function MenuListService($http, ApiBasePath) {
  var service = this;
 console.log('In MenuListService');
  // List of shopping items
  var items = [];

  service.getAllCategories = function () {
    console.log('In MenuListService service.getAllCategories');
    console.log(ApiBasePath);
    var items = [];
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(
            function(response){
                console.log("http success");
                console.log(response.data);
                console.log("Gotten something");
                console.log(response.data[0]);
                console.log("Gotten something");
                for(var i = 0; i<response.data.length; i++)
                {      
                    var item = {
                        id: response.data[i].id,
                        shortName: response.data[i].short_name,      
                        name: response.data[i].name,
                        description: response.data[i].special_instructions,
                        url: response.data[i].url
                         };
//                            console.log(item);
//                            console.log(item.id);
                    items.push(item);
                }
                console.log(items[0].id);
                service.items = items;
                console.log(service.items[0].id);
                
                return response;},
            function(){
                console.log("http failure");}); 
    return response;
  };
//---------------------------------------------------------------------
//
    service.getCategorySN = function (d) {
        console.log('In MenuListService service.getCategorySN');
        console.log(d);
        console.log(service.items[d].shortName);
        var shortName = service.items[d].shortName;
        console.log(shortName);
        return shortName;
    };
    service.getCategory = function (d) {
        console.log('In MenuListService service.getCategory');
        console.log(d);
        console.log(service.items[d].name);
        var name = service.items[d].name;
        console.log(name);
        return name;
    };
//---------------------------------------------------------------------
//
//var shortName = "DS"; //somebody has to pass this!!
  service.getItemsForCategory = function (d) {
    console.log('In MenuListService service.getItemsForCategory');
    console.log(d);
 //   service.items = items;

        console.log('service.items.length '+service.items.length);
        console.log(service.items[d].shortName);
        console.log('In MenuListService service.getItemsForCategory gotten data to operate');
        console.log(ApiBasePath);
        var shortName = service.items[d].shortName;
        var citems = [];
        var response = $http({
          method: "GET",
          //url: (ApiBasePath + "/menu_items.json") //returns absolutely everything
          url: (ApiBasePath +"/menu_items.json"),
          params: {
            category: shortName
          }
        }).then(
                function(response){
                    console.log("http success");
                    console.log(response.data);
                    console.log("Gotten something in service.getItemsForCategory");
                    console.log(response.data.menu_items[0]);
                    for(var i = 0; i<response.data.menu_items.length; i++)
                    {      
                        var item = {
                            id: response.data.menu_items[i].id,
                            shortName: response.data.menu_items[i].short_name,      
                            name: response.data.menu_items[i].name,
                            description: response.data.menu_items[i].description
                             };
                        //        console.log(item);
                        //        console.log(item.id);
                        citems.push(item);
                    }

                    console.log(citems[0].id);
                    service.citems = citems;
                    console.log(service.citems[0].id);

                    return response;},
                function(){
                    console.log("http failure");}); 
        return response;
    //}
  };
//---------------------------------------------------------------------
 }

})();