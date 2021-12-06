//  -------------------------------------------
//  Item carousel
//  -------------------------------------------
  if ($(".jsItemCarousel").length > 0) {
    $(".jsItemCarousel").each(function(){
      var jsItemCarousel = $(this);
      var carouselOuter = jsItemCarousel.closest('.carousel-outer');
      var jsItemCarouselPrv = carouselOuter.find('.jsCarouselPrv');
      var jsItemCarouselNxt = carouselOuter.find('.jsCarouselNxt');
      var isItemCarouselSingle = jsItemCarousel.children().length === 1;
      console.log('isItemCarouselSingle', isItemCarouselSingle);
      jsItemCarousel.owlCarousel({
        stagePadding: 0,
        items: 1,
        margin: 10,
        loop: !isItemCarouselSingle,
        mouseDrag: !isItemCarouselSingle,
        touchDrag: !isItemCarouselSingle,
        pullDrag: !isItemCarouselSingle,
        nav: false,
        dots: false,
      });
      if(!isItemCarouselSingle){
        if (jsItemCarouselPrv) {
          jsItemCarouselPrv.on('click', function () {
            carouselOuter.find(jsItemCarousel).trigger('prev.owl.carousel');
          });
        }
        if (jsItemCarouselNxt) {
          jsItemCarouselNxt.on('click', function () {
            carouselOuter.find(jsItemCarousel).trigger('next.owl.carousel');
          });
        }
      }
      if(isItemCarouselSingle){
        jsItemCarouselPrv.css({ display: "none" });
        jsItemCarouselNxt.css({ display: "none" });
      }
    });
  }

//  -------------------------------------------
//  Multi Card carousel
//  -------------------------------------------
  if ($(".jsMultiCardCarousel").length > 0) {
    $(".jsMultiCardCarousel").each(function(){
      var jsMultiCardCarousel = $(this);
      var carouselOuter = jsMultiCardCarousel.closest('.carousel-outer');
      var jsMultiCardCarouselPrv = carouselOuter.find('.jsCarouselPrv');
      var jsMultiCardCarouselNxt = carouselOuter.find('.jsCarouselNxt');
      var isMultiCardCarouselSingle = jsMultiCardCarousel.children().length === 1;
      console.log('isMultiCardCarouselSingle', isMultiCardCarouselSingle);
      jsMultiCardCarousel.owlCarousel({
        stagePadding: 0,
        margin: 0,
        loop: !isMultiCardCarouselSingle,
        mouseDrag: !isMultiCardCarouselSingle,
        touchDrag: !isMultiCardCarouselSingle,
        pullDrag: !isMultiCardCarouselSingle,
        nav: false,
        dots: false,
        smartSpeed: 500,
        // autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          710: {
            items: 2,
          },
          992: {
            items: 3,
          },
          1024: {
            items: 4,
          }
        }
      });
      if(!isMultiCardCarouselSingle){
        if (jsMultiCardCarouselPrv) {
          jsMultiCardCarouselPrv.on('click', function () {
            carouselOuter.find(jsMultiCardCarousel).trigger('prev.owl.carousel');
          });
        }
        if (jsMultiCardCarouselNxt) {
          jsMultiCardCarouselNxt.on('click', function () {
            carouselOuter.find(jsMultiCardCarousel).trigger('next.owl.carousel');
          });
        }
      }
      if(isMultiCardCarouselSingle){
        jsMultiCardCarouselPrv.css({ display: "none" });
        jsMultiCardCarouselNxt.css({ display: "none" });
      }
    });
  }