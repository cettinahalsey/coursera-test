(function () {
"use strict";

angular.module('public')
.component('signup', {
  templateUrl: 'src/public/signup/signup.html',
  bindings: {
    allItems: '<',
    user: '='
  },
  controller: 'SignUpController'
});


})();
