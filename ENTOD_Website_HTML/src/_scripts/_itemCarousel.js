//  -------------------------------------------
//  Item carousel
//  -------------------------------------------
  var itemCarousel;
  if ($(".jsItemCarousel").length) {
    itemCarousel = $(".jsItemCarousel"); //Banner-carousel for Property-details page
    itemCarousel.owlCarousel({
      stagePadding: 0,
      loop: true,
      mouseDrag: false,
      nav: false,
      dots: false,
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      items: 1,
    });
  };