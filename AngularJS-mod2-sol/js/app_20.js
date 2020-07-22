(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListShowController', ShoppingListShowController)
.controller('ShoppingListBoughtController', ShoppingListBoughtController)
.service('ShoppingListService', ShoppingListService);



ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();
  
  showList.show = function () {return ShoppingListService.showM2;};
      
  showList.boughtItem = function (itemIndex) {
    ShoppingListService.boughtItem(itemIndex);
  };
 
}

ShoppingListBoughtController.$inject = ['ShoppingListService'];
function ShoppingListBoughtController(ShoppingListService) {
  var boughtList = this;

  boughtList.listOfBought = ShoppingListService.getBoughtItems();
  
  boughtList.show = function () {return ShoppingListService.showM1;};
}


function ShoppingListService() {
  var service = this;
  
  service.showM1 = true;
  service.showM2 = false;
  // List of shopping items
  var items = [
  {
    name: "Milk",
    quantity: "2"
  },
  {
    name: "Donuts",
    quantity: "5"
  },
  {
    name: "Cookies",
    quantity: "10"
  },
  {
    name: "Chocolate",
    quantity: "5"
  },
  {
    name: "Coke",
    quantity: "3"
  }
];

var listOfBought = [

];

//  service.getShowM1 = function(){
//      console.log("M1 "+showM1);
//      return showM1;
//  };
//  service.getShowM2 = function(){
//      return showM2;
//  };

    service.getItems = function () {
        return items;
    };
    
     service.getBoughtItems = function () {
        return listOfBought;
    };
  
  service.boughtItem = function (itemIndex) {
   // console.log(showM1);  
    var name = items[itemIndex].name;
    var quantity = items[itemIndex].quantity;
    items.splice(itemIndex, 1);

    var item = {
      name: name,
      quantity: quantity
    };
    listOfBought.push(item);
    service.showM1=false;
    console.log(service.showM1);
    if(items.length===0)
    {
      service.showM2=true;
      console.log(service.showM2);
    }
  };
  
 
}

})();
