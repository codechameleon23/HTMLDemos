var lastScrollTop = 0;
if (!isIE11) {
  $(window).on("scroll", function () {
    scroll = $(window).scrollTop();
    if (scroll > lastScrollTop && scroll > 10) {
      // downscroll code
      $("header.header").addClass("shrink");
    } else if (scroll < lastScrollTop) {
      // upscroll code
      if (scroll <= 100) {
        $("header.header").removeClass("shrink");
      }
    }
    lastScrollTop = scroll;
  });
}
