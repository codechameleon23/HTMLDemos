//Banner carousel
$(document).ready(function () {
  var itemCarousel;
  if ($(".jsProductCarousel").length) {
    itemCarousel = $(".jsProductCarousel"); //Banner-carousel for Property-details page
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
      responsive: {
        0: {
          items: 1,
          margin: 29,
          center:true,
        },
        710: {
          items: 2,
          margin: 14,
          center:false,
        },
        992: {
          items: 4,
          margin: 14,
          center:false,
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
});