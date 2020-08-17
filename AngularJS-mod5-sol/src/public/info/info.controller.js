(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);



InfoController.$inject = ['$scope','allItems','users','ApiPath'];
function InfoController($scope,allItems,users,ApiPath) {
    var info = this;
    info.basePath = ApiPath; //for the images
    var entered = true;
    console.log("InfoController ");
    console.log(users);
    var myusers = users;
    var itemList = allItems.menu_items;
//     var myUser = {
//        firstname : "Mark",
//        lastname : "Eden",
//        phone : "713-999-0000",
//        email : "Mark@yahoo.com",
//        favorite : "DS1"        
//    };
    if(myusers.length>1)
    {
        info.entered = true;
        info.user = myusers[myusers.length-1];
        console.log("InfoController last user ",info.user); 
        var favor = info.user.favorite;
        console.log("Favorite menu item ",favor); 
        info.getFavorite = function(favor,itemList)
        {
           // console.log("In getFavorite");
           // console.log(itemList);
            for(var i=0; i<itemList.length; i++)
            {
                if(itemList[i].short_name === favor)
                    return itemList[i];
            }
            return null;
        };
        info.menuItem = info.getFavorite(favor,itemList);
        console.log("Favorite menu item ",info.menuItem); 
        console.log("Favorite menu item ",info.menuItem.short_name); 
        console.log("Favorite menu item ",info.menuItem.name);
    }
    else
    {
        info.entered = false;
        info.user = myusers[0];
        var favor = info.user.favorite;
        console.log("Favorite menu item ",favor); 
        info.getFavorite = function(favor,itemList)
        {
           // console.log("In getFavorite");
           // console.log(itemList);
            for(var i=0; i<itemList.length; i++)
            {
                if(itemList[i].short_name === favor)
                    return itemList[i];
            }
            return null;
        };
        info.menuItem = info.getFavorite(favor,itemList);
    }
}

})();

