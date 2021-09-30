//  -------------------------------------------
// Navbar toggle
//  -------------------------------------------
   // Close
   function navBarClose() {
      $(".hamburger").removeClass("is-active");
      $(".jsNavbarToggle").removeClass("is-open");
      setTimeout(function () {
         $(".jsNavbarToggle").removeClass("nav-transition");
      }, 1000)
   }
   // Open
   function navBarOpen() {
      setTimeout(function(){
         $(".hamburger").addClass("is-active");
         $(".jsNavbarToggle").addClass("is-open");
      },225)
   }

// $(window).on('scroll', function () {
//    navBarClose();
// });

   $(window).on('resize', function () {
      navBarClose();
   });

   $(".hamburger").on("click", function () {
      var jsNavbar = $(".jsNavbarToggle");
      jsNavbar.addClass("nav-transition");
      if (jsNavbar.hasClass("is-open")) {
         navBarClose();
      } else {
         navBarOpen();
      }
   });