(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$scope','allItems','InfoService','user'];
function SignUpController($scope,allItems,InfoService,user) {
  console.log("SignUpController");
  var signup = this;
//  var myusers =[];
  signup.favoriteChecked=false;
//  console.log(allItems);
//  console.log(allItems.menu_items[0]);
//  console.log(allItems.menu_items[0].short_name);
  var itemList = allItems.menu_items;

  user = {};
  
  
  signup.submit = function () {
     console.log("SignUpController() submit");
     var check = signup.checkFavorite();
     if(check){
        signup.completed = true;
        var newuser = {
            firstname: signup.user.firstname,
            lastname: signup.user.lastname,
            email: signup.user.email,
            phone: signup.user.phone,
            favorite: signup.user.favorite
        };
//        myusers.push(newuser);
//        $scope.myusers = myusers;
        console.log(InfoService);
        user = newuser;
        InfoService.addUser(user);
     }

    
    
};
signup.checkFavorite = function(){
      console.log("SignUpController() checkFavorite");
      if($scope.signupForm.favorite.$touched )
      {
         var favorite0 = signup.user.favorite; 
         if(favorite0===undefined)
         {
              $scope.signupForm.favorite.$error.nosuch = false;
              $scope.signupForm.favorite.$error.required = true;
              $scope.signupForm.favorite.$valid = false;
              return false;
         }
         else
         {
             var favorite = favorite0.toUpperCase().trim();
             var dish = signup.getFavorite(favorite,itemList);
             console.log("SignUpController() checkFavorite ", dish);
             if(dish===null)
             {
                   signup.favoriteChecked = true;
                   $scope.signupForm.favorite.$error.nosuch = true;
                   $scope.signupForm.favorite.$error.required = false;
                   $scope.signupForm.favorite.$valid = false;
                   $scope.signupForm.favorite.$invalid = true;
                   $scope.signupForm.favorite.$touched = false;
                   return false;
             }
             else
             {   
                  signup.favoriteChecked = true;
                  $scope.signupForm.favorite.$error.nosuch = false;
                  $scope.signupForm.favorite.$valid = true;
                  $scope.signupForm.favorite.$invalid = false;
                  return true;
             }
        }
    }
      
  };
 

    signup.getFavorite = function(favorite,itemList)
    {
       // console.log("In getFavorite");
       // console.log(itemList);
        for(var i=0; i<itemList.length; i++)
        {
            if(itemList[i].short_name === favorite)
                return itemList[i];
        }
        return null;
    };
    
    signup.reset = function(){
      console.log("SignUpController() reset");
      signup.completed = false;
      
      signup.user.firstname = undefined;
      signup.user.lastname = undefined;;
      signup.user.email = undefined;
      signup.user.phone = undefined;
      signup.user.favorite = undefined;
 
      $scope.signupForm.$setValidity();
      $scope.signupForm.$setPristine();
      $scope.signupForm.$setUntouched();  
    };
    
    signup.resetFavorite = function(){
      console.log("SignUpController() reset favorite");
      signup.completed = false;
      
      signup.user.favorite = undefined;
      
      $scope.signupForm.favorite.$error.nosuch = false;
      $scope.signupForm.favorite.$touched = false;
      $scope.signupForm.favorite.$error.required = false;
      $scope.signupForm.favorite.$valid = false;
      $scope.signupForm.favorite.$invalid = true;
      
    };

  
}

})();

