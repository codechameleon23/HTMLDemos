//  -------------------------------------------
// Navbar toggle
//  -------------------------------------------
   // Close
   function navBarClose() {
      $(".hamburger").removeClass("is-active");
      jsNavbar.removeClass("is-open");
      removeResizeAnimation();
   }
   // Open
   function navBarOpen() {
      setTimeout(function(){
         $(".hamburger").addClass("is-active");
         jsNavbar.addClass("is-open");
      },225)
   }

   $(".hamburger").on("click", function () {
      addResizeAnimation();
      if (jsNavbar.hasClass("is-open")) {
         navBarClose();
      } else {
         navBarOpen();
         // searchBarClose();
      }
   });

   // $(window).on('scroll', function () {
   //    searchBarClose();
   // });

   $(window).on('resize', function () {
      if (getViewportWidth() > 991) {
         navBarClose();
      }
   });
