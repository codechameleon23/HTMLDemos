  // Toggle searchar
  // Close Search-bar
function searchBarClose() {
   $(".search-toggle").removeClass("is-active");
   $(".jsNavbarToggle").removeClass("search-is-open");
 }
 // Open Search-bar
 function searchBarOpen() {
   $(".search-toggle").addClass("is-active");
   $(".jsNavbarToggle").addClass("search-is-open");
 }

$(document).ready(function () {
   $('.search-toggle').on('click', function(){
   if ($(this).hasClass("is-active")) {
      searchBarClose();
   } else {
      navBarClose();
      setTimeout(function(){
         searchBarOpen();
      }, 225);
   }
   });
});