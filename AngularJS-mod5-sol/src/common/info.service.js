(function () {
"use strict";

angular.module('common')
.service('InfoService', InfoService);


InfoService.$inject = ['$http', 'ApiPath'];
function InfoService($http, ApiPath) {
  var service = this;
  service.users = [];
        var newuser = {
            firstname: "Somebody",
            lastname: "Unregistered",
            email: "unknown@nowhere",
            phone: "000-000-0000",
            favorite: "DS1"
        };
        service.users.push(newuser);
  service.user = {};
  service.addUser = function(user)
  {
      service.user = user;
      console.log("InfoService updated the users, added ",service.user);
      service.users.push(user);
  };
 
  service.getUsers = function()
  {
      console.log("InfoService getUsers");
      console.log("InfoService");
      console.log(service.users);
      return service.users;
  };

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };
  
  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.getFavorite = function(favorite){
      var allItems = [];
      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        service.allItems=response.data;
        console.log(allItems);
    });
  };

}



})();