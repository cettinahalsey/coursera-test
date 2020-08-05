(function () {
'use strict';

angular.module('MenuApp')
.controller('MainMenuListController', MainMenuListController);


//directly inject items
MainMenuListController.$inject = ['items'];
function MainMenuListController(items) {
    console.log("MainMenuListController");
    
  var mainList = this;

  mainList.items = items.data;
  console.log(mainList.items);
  console.log("MainMenuListController showing the first");
  console.log(mainList.items[0]);
  console.log("Exiting MainMenuListController");
    
}
})();

