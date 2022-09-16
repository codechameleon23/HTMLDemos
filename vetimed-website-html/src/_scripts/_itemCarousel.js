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

function setItemCarousel(elm) {
  var jsItemCarousel = elm;
  var carouselOuter = jsItemCarousel.closest(".carousel-outer");
  var jsItemCarouselPrv = carouselOuter.find(".jsCarouselPrv");
  var jsItemCarouselNxt = carouselOuter.find(".jsCarouselNxt");
  var isItemCarouselSingle = jsItemCarousel.children().length === 1;
  var dataSettings = jsItemCarousel.data();
  var defaultSettings = {
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    stagePadding: 0,
    items: 1,
    margin: 0,
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
      //   items: 1,
      // },
      // 576: {
        items: 2,
      },
      710: {
        items: 3,
      },
      1024: {
        items: 4,
      }
    },
  };
  var settings = Object.assign(defaultSettings, dataSettings);

  var carousel = jsMultiCardCarousel.owlCarousel(settings);
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

// if ($(".jsProductCarousel").length > 0) {
//   $(".jsProductCarousel").each(function () {
//     var jsProductCarousel = $(this);
//     var isItemCarousel = jsProductCarousel.find(".jsProductItemCarousel");
//     var isThumbCarousel = jsProductCarousel.find(".jsThumbmailCarousel");
//     var jsItemCarousel = null;
//     var jsThumbCarousel = null;
//     if (isItemCarousel.length > 0) {
//       jsItemCarousel = setItemCarousel(isItemCarousel);
//       jsItemCarousel.on("changed.owl.carousel", function (event) {
//         jsThumbCarousel.trigger("to.owl.carousel", [event.item.index]);
//       });
//     }
//     if (isThumbCarousel.length > 0) {
//       jsThumbCarousel = setItemCarousel(isThumbCarousel);
//       var carouselOuter = jsThumbCarousel.closest(".carousel-outer");
//       var jsMultiCardCarouselPrv = carouselOuter.find(".jsCarouselPrv");
//       var jsMultiCardCarouselNxt = carouselOuter.find(".jsCarouselNxt");
//       isThumbCarousel.find(".item").on("click", function () {
//         jsItemCarousel.trigger("to.owl.carousel", [$(this).data().index]);
//       });
//       jsThumbCarousel.on("changed.owl.carousel", function (event) {
//         if (event.item.index === 0) {
//           jsMultiCardCarouselPrv.css({ opacity: "0.5", PointerEvent: "none" });
//         } else {
//           jsMultiCardCarouselPrv.css({ opacity: "1", PointerEvent: "all" });
//         }
//         if (event.item.count - event.item.index === event.page.size) {
//           jsMultiCardCarouselNxt.css({ opacity: "0.5", PointerEvent: "none" });
//         } else {
//           jsMultiCardCarouselNxt.css({ opacity: "1", PointerEvent: "all" });
//         }
//       });
//     }
//   });
// }