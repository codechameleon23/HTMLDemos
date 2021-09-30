
//  -------------------------------------------
//  Testimonials Carousel
//  -------------------------------------------
  var jsTestimonialsCarousel;
  if ($(".jsTestimonialsCarousel").length) {
    jsTestimonialsCarousel = $(".jsTestimonialsCarousel"); //Banner-carousel for Property-details page
    jsTestimonialsCarousel.owlCarousel({
      // center: true,
      // items: 1,
      // stagePadding: 40,
      margin: 40,
      loop: true,
      mouseDrag: true,
      // nav: false,
      // dots: true,
      // animateIn: isIE11 || isIE10 ? "" : "fadeIn",
      // animateOut: isIE11 || isIE10 ? "" : "fadeOut",
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive: {
        0:{
          items:1,
        },
        1000:{
          items:2,
        }
      }
    });
  };
  $('.jsCarouselPrv').on('click', function () {
    $(this).closest('.carousel-outer').find(jsTestimonialsCarousel).trigger('prev.owl.carousel');
  });
  $('.jsCarouselNxt').on('click', function () {
    $(this).closest('.carousel-outer').find(jsTestimonialsCarousel).trigger('next.owl.carousel');
  });