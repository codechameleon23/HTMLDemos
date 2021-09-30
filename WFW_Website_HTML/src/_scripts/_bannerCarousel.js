//  -------------------------------------------
//  Banner carousel
//  -------------------------------------------
  var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
  var isIE10 = (navigator.userAgent.match(/MSIE 10/i));
  var bannerCarousel;
  if ($(".jsBannerCarousel").length) {
    bannerCarousel = $(".jsBannerCarousel"); //Banner-carousel for Property-details page
    bannerCarousel.owlCarousel({
      center: true,
      items: 1,
      stagePadding: 0,
      margin: 0,
      loop: true,
      mouseDrag: false,
      nav: false,
      dots: true,
      animateIn: isIE11 || isIE10 ? "" : "fadeIn",
      animateOut: isIE11 || isIE10 ? "" : "fadeOut",
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
    });
  };
  $('.jsCarouselPrv').on('click', function () {
    $(this).closest('.carousel-outer').find(bannerCarousel).trigger('prev.owl.carousel');
  });
  $('.jsCarouselNxt').on('click', function () {
    $(this).closest('.carousel-outer').find(bannerCarousel).trigger('next.owl.carousel');
  });