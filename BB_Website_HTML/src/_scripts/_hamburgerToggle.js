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

   $(".hamburger").on("click", function () {
      var jsNavbar = $(".jsNavbarToggle");
      jsNavbar.addClass("nav-transition");
      if (jsNavbar.hasClass("is-open")) {
         navBarClose();
      } else {
         navBarOpen();
      }
   });

   // $(window).on('scroll', function () {
   //    searchBarClose();
   // });

   $(window).on('resize', function () {
      navBarClose();
   });
