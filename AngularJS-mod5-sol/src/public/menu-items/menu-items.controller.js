(function () {
"use strict";

angular.module('public')
.controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['menuItems'];
function MenuItemsController(menuItems) {
  var $ctrl = this;
  //copy the menuItems that come from our resolve from the route
  $ctrl.menuItems = menuItems;
}

})();

