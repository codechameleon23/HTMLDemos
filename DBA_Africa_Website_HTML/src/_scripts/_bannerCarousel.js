//  -------------------------------------------
//  Banner carousel
//  -------------------------------------------
  var bannerCarousel;
  if ($(".jsBannerCarousel").length) {
    bannerCarousel = $(".jsBannerCarousel"); //Banner-carousel for Property-details page
    bannerCarousel.owlCarousel({
      center: true,
      items: 1,
      stagePadding: 0,
      margin: 2,
      loop: true,
      mouseDrag: true,
      nav: false,
      dots: false,
      // animateIn: isIE11 || isIE10 ? "" : "fadeIn",
      // animateOut: isIE11 || isIE10 ? "" : "fadeOut",
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
    });
  };

//  -------------------------------------------
//  Banner carousel Center
//  -------------------------------------------
  var bannerCarouselCenter;
  if ($(".jsBannerCarouselCenter").length) {
    bannerCarouselCenter = $(".jsBannerCarouselCenter"); //Banner-carousel for Property-details page
    bannerCarouselCenter.owlCarousel({
      center: true,
      items: 1,
      stagePadding: 0,
      margin: 2,
      loop: true,
      mouseDrag: true,
      nav: false,
      dots: false,
      // animateIn: isIE11 || isIE10 ? "" : "fadeIn",
      // animateOut: isIE11 || isIE10 ? "" : "fadeOut",
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive:{
        1024:{
          autoWidth:true,
        },
      }
    });
  };

  $('.jsCarouselPrv, .jsCarouselNxt').on('click', function () {
    var trigger = $(this);
    var targetCarousel =  trigger.closest('.carousel-outer').find(bannerCarousel);
    var targetCarouselCenter = trigger.closest('.carousel-outer').find(bannerCarouselCenter);
    if(trigger.hasClass('jsCarouselPrv')){
      targetCarousel.trigger('prev.owl.carousel');
      targetCarouselCenter.trigger('prev.owl.carousel');
    }
  if(trigger.hasClass('jsCarouselNxt')){
    targetCarousel.trigger('next.owl.carousel');
    targetCarouselCenter.trigger('next.owl.carousel');
    }
  });
