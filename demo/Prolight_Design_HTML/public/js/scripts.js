//* scripts.js
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var isIE10 = (navigator.userAgent.match(/MSIE 10/i));
//Get View port width
function getViewportWidth() {
  if (window.innerWidth) {
    return window.innerWidth;
  } else if (document.body && document.body.offsetWidth) {
    return document.body.offsetWidth;
  } else {
    return 0;
  }
}
//Close Navbar
function navBarClose() {
  $(".hamburger").removeClass("is-active");
  $(".jsNavbarToggle").removeClass("is-open");
  $(".main").removeClass("is-blur");
}
//Open Navbar
function navBarOpen() {
  $(".hamburger").addClass("is-active");
  $(".jsNavbarToggle").addClass("is-open");
  $(".main").addClass("is-blur");
}
//filter
function filtered(fp) {
  if (fp && fp.find('.filter_tab.is-active').length) {
    fp.find('.filter_obj').removeClass('filtered');
    filterBy = [];
    fp.find('.filter_tab.is-active').each(function () {
      filterBy.push($(this).attr('data-filterby'));
    });
    for (i = 0; i < filterBy.length; i++) {
      $.each(fp.find('.filter_obj.' + filterBy[i]), function (i, el) {
        setTimeout(function () {
          $(el).addClass('filtered');
        }, 0 + (i * 100));
      });
    }
  } else {
    $('.filter_obj').addClass('filtered');
  }
}
// Inview js
var $animation_elements = $('.in-view-animation');
var $window = $(window);

function check_if_in_view() {
  var window_height = $window.height();
  var window_top_position = $window.scrollTop();
  var window_bottom_position = (window_top_position + window_height);

  $.each($animation_elements, function (i, el) {
    var $element = $(el);
    var element_height = $element.outerHeight();
    var element_top_position = $element.offset().top;
    var element_bottom_position = (element_top_position + element_height);
    if ((element_bottom_position >= window_top_position) &&
      (element_top_position <= window_bottom_position - 10)) {
      // $element.addClass('in-view add-animation');
      setTimeout(function () {
        $(el).addClass('in-view add-animation');
      }, 100 + (i * 150));
    } else {
      $element.removeClass('in-view');
    }
  });
}
$window.on('scroll resize', check_if_in_view);
$window.trigger('scroll');

$(document).ready(function () {
  //Navbar toggle
  $(".hamburger").on("click", function () {
    if ($(".hamburger").hasClass("is-active")) {
      navBarClose();
    } else {
      navBarOpen();
    }
  });

  //Product overlay toggle
  $(".detail-toggle-button").on("click", function () {
    var parent = $(this).closest('.product-card');
    if ($(parent).hasClass("overlay-active")) {
      $(parent).removeClass("overlay-active");
    } else {
      $('.product-card').removeClass("overlay-active");
      $(parent).addClass("overlay-active");
    }
  });

  //Banner carousel
  if ($(".jsBannerCarousel").length) {
    var bannerCarousel = $(".jsBannerCarousel"); //Banner-carousel for Property-details page
    bannerCarousel.owlCarousel({
      items: 1,
      margin: 5,
      loop: true,
      mouseDrag: true,
      nav: false,
      dots: false,
      animateIn: isIE11 || isIE10 ? "" : "slideInUp",
      animateOut: isIE11 || isIE10 ? "" : "slideOutUp",
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true
    });

    $('.jsCarouselPrv').on('click', function () {
      $(this).closest('.carousel-outer').find(bannerCarousel).trigger('prev.owl.carousel');
    });
    $('.jsCarouselNxt').on('click', function () {
      $(this).closest('.carousel-outer').find(bannerCarousel).trigger('next.owl.carousel');
    });
  };

  //Product carousel
  if ($('.jsProductCarousel').length) { //if element exists
    var jsProductCarousel = $('.jsProductCarousel');
    jsProductCarousel.owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      smartSpeed: 500,
      autoplay: true,
      autoplayTimeout: 3000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        700: {
          items: 3
        },
        800: {
          items: 4
        }
      }
    });
    $('.jsCarouselPrv').on('click', function () {
      $(this).closest('.carousel-outer').find(jsProductCarousel).trigger('prev.owl.carousel');
    });
    $('.jsCarouselNxt').on('click', function () {
      $(this).closest('.carousel-outer').find(jsProductCarousel).trigger('next.owl.carousel');
    });
  };

  // Initialize the Popup
  $(".popup").popup({
    scrolllock: true,
  });

  // Magnific Popup : Gallery
  if ($('.jsPopupImageGallery').length) { //if element exists

    $('.jsPopupImageGallery').each(function () {
      $(this).magnificPopup({
        delegate: 'a.will-open-popup',
        type: 'image',
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        callbacks: {
          elementParse: function (item) {
            console.log(item.el[0].className);
            if (item.el[0].className == 'has-video') {
              item.type = 'iframe',
                item.iframe = {
                  patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: 'v=', // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; } 

                      src: '//www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe. 
                    },
                    vimeo: {
                      index: 'vimeo.com/',
                      id: '/',
                      src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                      index: '//maps.google.',
                      src: '%id%&output=embed'
                    }
                  }
                }
            } else {
              item.type = 'image',
                item.tLoading = 'Loading image #%curr%...',
                item.mainClass = 'mfp-img-mobile',
                item.image = {
                  tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
                }
            }
          }
        }
      });
    });
  };

  // Google Map
  if ($('#map-canvas').length) { //if element exists
    //create empty LatLngBounds object
    var bounds = new google.maps.LatLngBounds();
    var locations = [
      ['Beacon Business Centre, Hopton Rd, Devizes, SN10 2 EY, UK', 51.368120, -1.967501]
    ];
    var map = new google.maps.Map($('.map-canvas')[0], {
      // zoom: 16,
      center: new google.maps.LatLng(locations[0][1])
    });
    // Add a custom marker
    var markerIcon = {
      url: 'images/map-marker.png',
      scaledSize: new google.maps.Size(64, 64)
    };

    $.each(locations, function (i, e) {

      var marker = new google.maps.Marker({
        map: map,
        icon: markerIcon,
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        optimized: false
      });
      //extend the bounds to include each marker's position
      bounds.extend(marker.position);

      var info = new SnazzyInfoWindow({
        marker: marker,
        content: locations[i][0]
      });

      // info.open();
    });
    //now fit the map to the newly inclusive bounds
    map.fitBounds(bounds);
    //(optional) restore the zoom level after the map is done scaling
    var listener = google.maps.event.addListener(map, "idle", function () {
      map.setZoom(getViewportWidth() < 700 ? 8 : 14.4);
      google.maps.event.removeListener(listener);
    });
  };

  //Page transition
  var swup = new Swup({
    cache: true,
    animationSelector: '[class^="a-"]',
    elements: ['#swup'],
    pageClassPrefix: '',
    debugMode: false,
    scroll: true,
    preload: true,
    support: true,
    disableIE: false,

    animateScrollToAnchor: false,
    animateScrollOnMobile: false,
    doScrollingRightAway: false,
    scrollDuration: 0,

    LINK_SELECTOR: 'a[href^="/"]:not([data-no-swup]), a[xlink\\:href]'
  });

  //Filter tabs
  /*Filter*/
  if ($('.filter_parent').length) { //if element exists
    $('.filter_tab').on('click', function () {
      $filter_parent = $(this).closest('.filter_parent');
      $filterBy = $(this).attr('data-filterby');
      if ($(this).hasClass('is-active')) {
        // $('.filter_tab').removeClass('is-active'); //single select at a time
        // $(this).removeClass('is-active');
        // filtered($filter_parent);
      } else {
        $('.filter_tab').removeClass('is-active'); //single select at a time 
        $(this).addClass('is-active');
        if ($('.filter_dropdown').val() !== $filterBy) {
          $('.filter_dropdown').val($filterBy)
        }
        filtered($filter_parent);
      }
    });
    $('.filter_dropdown').change(function () {
      $('.filter_tab[data-filterby=' + $(this).val() + ']').trigger('click');
    });
  };

});