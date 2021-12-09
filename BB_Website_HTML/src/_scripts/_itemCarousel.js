//  -------------------------------------------
//  Item carousel
//  -------------------------------------------
if ($(".jsItemCarousel").length > 0) {
  $(".jsItemCarousel").each(function () {
    setItemCarousel($(this));
  });
}

//  -------------------------------------------
//  Multi Card carousel
//  -------------------------------------------
if ($(".jsMultiCardCarousel").length > 0) {
  $(".jsMultiCardCarousel").each(function () {
    setMultiCardCarousel($(this));
  });
}

if ($(".jsProductCarousel").length > 0) {
  $(".jsProductCarousel").each(function () {
    var jsProductCarousel = $(this);
    var isItemCarousel = jsProductCarousel.find(".jsProductItemCarousel");
    var isThumbCarousel = jsProductCarousel.find(".jsThumbmailCarousel");
    var jsItemCarousel = null;
    var jsThumbCarousel = null;
    if (isItemCarousel.length > 0) {
      jsItemCarousel = setItemCarousel(isItemCarousel);
    }
    if (isThumbCarousel.length > 0) {
      jsThumbCarousel = setItemCarousel(isThumbCarousel);
      isThumbCarousel.find(".item").on("click", function () {
        // console.log('$(this).index()', $(this).data());
        jsItemCarousel.trigger("to.owl.carousel", [$(this).data().index]);
      });
    }
    jsThumbCarousel.on("changed.owl.carousel", function (event) {
      console.log("event.item.index", event.item.index);
    });
  });
}

function setItemCarousel(elm) {
  var jsItemCarousel = elm;
  var carouselOuter = jsItemCarousel.closest(".carousel-outer");
  var jsItemCarouselPrv = carouselOuter.find(".jsCarouselPrv");
  var jsItemCarouselNxt = carouselOuter.find(".jsCarouselNxt");
  var isItemCarouselSingle = jsItemCarousel.children().length === 1;
  var dataSettings = jsItemCarousel.data();
  var defaultSettings = {
    stagePadding: 0,
    items: 1,
    margin: 10,
    loop: !isItemCarouselSingle,
    mouseDrag: !isItemCarouselSingle,
    touchDrag: !isItemCarouselSingle,
    pullDrag: !isItemCarouselSingle,
    nav: false,
    dots: false,
  };
  var settings = Object.assign(defaultSettings, dataSettings);
  if (!isItemCarouselSingle) {
    if (jsItemCarouselPrv) {
      jsItemCarouselPrv.on("click", function () {
        carouselOuter.find(jsItemCarousel).trigger("prev.owl.carousel");
      });
    }
    if (jsItemCarouselNxt) {
      jsItemCarouselNxt.on("click", function () {
        carouselOuter.find(jsItemCarousel).trigger("next.owl.carousel");
      });
    }
  }
  if (isItemCarouselSingle) {
    jsItemCarouselPrv.css({ display: "none" });
    jsItemCarouselNxt.css({ display: "none" });
  }
  return jsItemCarousel.owlCarousel(settings);
}

function setMultiCardCarousel(elm) {
  var jsMultiCardCarousel = elm;
  var carouselOuter = jsMultiCardCarousel.closest(".carousel-outer");
  var jsMultiCardCarouselPrv = carouselOuter.find(".jsCarouselPrv");
  var jsMultiCardCarouselNxt = carouselOuter.find(".jsCarouselNxt");
  var isMultiCardCarouselSingle = jsMultiCardCarousel.children().length === 1;
  var dataSettings = jsMultiCardCarousel.data();
  var defaultSettings = {
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
    },
    // initialized: function (event) {
    //   console.log("ggggggggggggggggggg", event.page.count);
    // },
  };
  var settings = Object.assign(defaultSettings, dataSettings);
  var carousel = jsMultiCardCarousel.owlCarousel(settings);
  // console.log("carousel", carousel);
  if (!isMultiCardCarouselSingle) {
    if (jsMultiCardCarouselPrv) {
      jsMultiCardCarouselPrv.on("click", function () {
        carouselOuter.find(jsMultiCardCarousel).trigger("prev.owl.carousel");
      });
    }
    if (jsMultiCardCarouselNxt) {
      jsMultiCardCarouselNxt.on("click", function () {
        carouselOuter.find(jsMultiCardCarousel).trigger("next.owl.carousel");
      });
    }
  }
  if (isMultiCardCarouselSingle) {
    jsMultiCardCarouselPrv.css({ display: "none" });
    jsMultiCardCarouselNxt.css({ display: "none" });
  }
  return carousel;
}
