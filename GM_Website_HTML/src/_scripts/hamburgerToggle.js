// Navbar toggle

// Close Navbar
function navBarClose() {
   $(".hamburger").removeClass("is-active");
   $(".jsNavbarToggle").removeClass("is-open");
   setTimeout(function () {
      $(".jsNavbarToggle").removeClass("nav-transition");
   }, 1000)
}
// Open Navbar
function navBarOpen() {
   searchBarClose();
   setTimeout(function(){
      $(".hamburger").addClass("is-active");
      $(".jsNavbarToggle").addClass("is-open");
   },225)
}

// $(window).on('scroll resize', function () {
//    navBarClose();
// });

$(document).ready(function () {
   $(".hamburger").on("click", function () {
   var jsNavbar = $(".jsNavbarToggle");
   jsNavbar.addClass("nav-transition");
   if (jsNavbar.hasClass("is-open")) {
      navBarClose();
   } else {
      navBarOpen();
   }
   });
});