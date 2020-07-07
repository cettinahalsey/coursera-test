//Genis
(function (global) { //IIFE

var dc = {}; //Namespace

var homeHtml = "snippets/home-snippet.html";
var serviziHtml = "snippets/servizi-category.html";
var infoHtml = "snippets/info-category.html";
var personeHtml = "snippets/persone-category.html";

// Convenience function for inserting innerHTML for 'selector'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// On page load (before images or CSS)

document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false);//No JSON
});

// Load the servizi categories view
dc.loadServizi = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    serviziHtml,
    buildAndShowServiziHTML, false); //equivalent to "buildAndShowCategoriesHTML, true);" meaning we get back
                                 // a JSON object
};
dc.loadInfo = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    infoHtml,
    buildAndShowInfoHTML, false); //equivalent to "buildAndShowCategoriesHTML, true);" meaning we get back
                                 // a JSON object
};
dc.loadPersone = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    personeHtml,
    buildAndShowPersoneHTML, false); //equivalent to "buildAndShowCategoriesHTML, true);" meaning we get back
                                 // a JSON object
};

function buildAndShowServiziHTML( ){
    $ajaxUtils.sendGetRequest(
    serviziHtml,                                     //URL
    function(serviziHtml){insertHtml("#main-content", serviziHtml);}, //Hander
    false);                                          //Not Json
};
function buildAndShowInfoHTML( ){
    $ajaxUtils.sendGetRequest(
    infoHtml,                                     //URL
    function(infoHtml){insertHtml("#main-content", infoHtml);}, //Hander
    false);                                          //Not Json    
};
function buildAndShowPersoneHTML( ){
    $ajaxUtils.sendGetRequest(
    personeHtml,                                     //URL
    function(personeHtml){insertHtml("#main-content", personeHtml);}, //Hander
    false);                                          //Not Json   
};


global.$dc = dc;

})(window);
