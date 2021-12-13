//  -------------------------------------------
//  Banner carousel
//  -------------------------------------------
  if ($(".jsBannerCarousel").length > 0) {
    $(".jsBannerCarousel").each(function () {
      var jsBannerCarousel = $(this);
      var isAutoPlay = jsBannerCarousel.data('auto-play');
      console.log('isAutoPlay', isAutoPlay);
      var carouselOuter = jsBannerCarousel.closest('.carousel-outer');
      var jsBannerCarouselPrv = carouselOuter.find('.jsCarouselPrv');
      var jsBannerCarouselNxt = carouselOuter.find('.jsCarouselNxt');
      var isBannerCarouselSingle = jsBannerCarousel.children().length === 1;
      jsBannerCarousel.owlCarousel({
        center: true,
        items: 1,
        stagePadding: 0,
        margin: 3,
        loop: !isBannerCarouselSingle,
        mouseDrag: !isBannerCarouselSingle,
        touchDrag: !isBannerCarouselSingle,
        pullDrag: !isBannerCarouselSingle,
        nav: false,
        dots: true,
        // animateIn: isIE11 || isIE10 ? "" : "fadeIn",
        // animateOut: isIE11 || isIE10 ? "" : "fadeOut",
        smartSpeed: 500,
        // autoplay: isAutoPlay,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
      });
      if(!isBannerCarouselSingle){
        if (jsBannerCarouselPrv) {
          jsBannerCarouselPrv.on('click', function () {
            carouselOuter.find(jsBannerCarousel).trigger('prev.owl.carousel');
          });
        }
        if (jsBannerCarouselNxt) {
          jsBannerCarouselNxt.on('click', function () {
            carouselOuter.find(jsBannerCarousel).trigger('next.owl.carousel');
          });
        }
      }
      if(isBannerCarouselSingle){
        jsBannerCarouselPrv.css({ display: "none" });
        jsBannerCarouselNxt.css({ display: "none" });
      }

    })
  }

