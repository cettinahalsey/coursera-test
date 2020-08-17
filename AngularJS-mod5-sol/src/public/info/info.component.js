(function () {
"use strict";

angular.module('public')
.component('info', {
  templateUrl: 'src/public/info/info.html',
  bindings: {
    allItems: '<',
    users: '<'
  },
  controller: 'InfoController as info'
});


})();
