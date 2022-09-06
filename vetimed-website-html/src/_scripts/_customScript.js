// var lastScrollTop = 0;
// if (!isIE11) {
//   $(window).on("scroll", function () {
//     scroll = $(window).scrollTop();
//     if (scroll > lastScrollTop && scroll > 10) {
//       // downscroll code
//       $("header.header").addClass("shrink");
//     } else if (scroll < lastScrollTop) {
//       // upscroll code
//       if (scroll <= 100) {
//         $("header.header").removeClass("shrink");
//       }
//     }
//     lastScrollTop = scroll;
//   });
// }

if ($(".filter-toggle").length > 0) {
  $(".filter-toggle").on("click", function () {
    if ($("body").hasClass("filter-open")) {
      $("body").removeClass("filter-open");
    } else {
      $("body").addClass("filter-open");
    };
  });
}
