//  -------------------------------------------
//  Banner carousel
//  -------------------------------------------
  if ($(".jsBannerCarousel").length > 0) {
    $(".jsBannerCarousel").each(function () {
      var jsBannerCarousel = $(this);
      var carouselOuter = jsBannerCarousel.closest('.carousel-outer');
      var jsBannerCarouselPrv = carouselOuter.find('.jsCarouselPrv');
      var jsBannerCarouselNxt = carouselOuter.find('.jsCarouselNxt');
      var isBannerCarouselSingle = jsBannerCarousel.children().length === 1;
      var dataSettings = jsBannerCarousel.data();
      var defaultSettings = {
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
        animateIn: "",
        animateOut: "",
        smartSpeed: 500,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
      };
      var settings = Object.assign(defaultSettings, dataSettings);
      jsBannerCarousel.owlCarousel(settings);
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

