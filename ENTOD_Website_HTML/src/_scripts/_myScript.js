
//  -------------------------------------------
//  Repair Form slides
//  -------------------------------------------
  var jsRepairFormSlides;
  if ($(".jsRepairFormSlides").length) {
    jsRepairFormSlides = $(".jsRepairFormSlides"); //Banner-carousel for Property-details page
    jsRepairFormSlides.owlCarousel({
      items: 1,
      margin: 20,
      mouseDrag: false,
      nav: false,
      dots: false,
      autoHeight: true,
      autoHeightClass: 'owl-auto-height'
    });
  };
  $('.jsRepairFormSlidesPrv').on('click', function () {
    $(this).closest('.carousel-outer').find(jsRepairFormSlides).trigger('prev.owl.carousel');
  });
  $('.jsRepairFormSlidesNxt').on('click', function () {
    $(this).closest('.carousel-outer').find(jsRepairFormSlides).trigger('next.owl.carousel');
  });