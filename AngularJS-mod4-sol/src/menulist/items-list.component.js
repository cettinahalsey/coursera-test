(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
    url: '/items-list/{itemId}',
    templateUrl: 'src/menulist/templates/items-list.template.html',
    controller: 'ItemsListController as itemsList',
    bindings: {
    citems: '<'
  }
});

})();