//  -------------------------------------------
//  Item carousel
//  -------------------------------------------
  var itemCarousel;
  if ($(".jsItemCarousel").length) {
    itemCarousel = $(".jsItemCarousel"); //Banner-carousel for Property-details page
    itemCarousel.owlCarousel({
      stagePadding: 0,
      loop: true,
      mouseDrag: true,
      nav: false,
      dots: true,
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 2,
          margin: 20,
        },
        710: {
          items: 3,
          margin: 40,
        },
        992: {
          items: 4,
          margin: 40,
        }
      }
    });
  };
  $('.jsCarouselPrv').on('click', function () {
    $(this).closest('.carousel-outer').find(itemCarousel).trigger('prev.owl.carousel');
  });
  $('.jsCarouselNxt').on('click', function () {
    $(this).closest('.carousel-outer').find(itemCarousel).trigger('next.owl.carousel');
  });