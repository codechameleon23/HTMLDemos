// * scripts.js
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var isIE10 = (navigator.userAgent.match(/MSIE 10/i));

// Get View port width
function getViewportWidth() {
  if (window.innerWidth) {
    return window.innerWidth;
  } else if (document.body && document.body.offsetWidth) {
    return document.body.offsetWidth;
  } else {
    return 0;
  }
}

// Close Navbar
function navBarClose() {
  $(".hamburger").removeClass("is-active");
  $(".jsNavbarToggle").removeClass("is-open");
  setTimeout(function () {
    $(".jsNavbarToggle").removeClass("nav-transition");
  }, 1000)
}
// Open Navbar
function navBarOpen() {
  $(".hamburger").addClass("is-active");
  $(".jsNavbarToggle").addClass("is-open");
}

// Close Search-bar
function searchBarClose() {
  $(".search-toggle").removeClass("is-active");
  $(".jsNavbarToggle").removeClass("search-is-open");
}
// Open Search-bar
function searchBarOpen() {
  $(".search-toggle").addClass("is-active");
  $(".jsNavbarToggle").addClass("search-is-open");
}

// $(window).on('scroll', function () {
//   navBarClose();
// });

// Inview js
// var $animation_elements = $('.in-view-animation');
// var $window = $(window);

// function check_if_in_view() {
//   var window_height = $window.height();
//   var window_top_position = $window.scrollTop();
//   var window_bottom_position = (window_top_position + window_height);

//   $.each($animation_elements, function (i, el) {
//     var $element = $(el);
//     var element_height = $element.outerHeight();
//     var element_top_position = $element.offset().top;
//     var element_bottom_position = (element_top_position + element_height);
//     if ((element_bottom_position >= window_top_position) &&
//       (element_top_position <= window_bottom_position - 10)) {
//       // $element.addClass('in-view add-animation');
//       setTimeout(function () {
//         $(el).addClass('in-view add-animation');
//       }, 100 + (i * 50));
//     } else {
//       $element.removeClass('in-view');
//     }
//   });
// }
// $window.on('scroll resize', check_if_in_view);
// $window.on('scroll resize', navBarClose);
// $window.trigger('scroll');

$(document).ready(function () {
  // Navbar toggle
  $(".hamburger").on("click", function () {
    $(".jsNavbarToggle").addClass("nav-transition");
    if ($(".hamburger").hasClass("is-active")) {
      navBarClose();
    } else {
      navBarOpen();
    }
  });

  //Banner carousel
  // var bannerCarousel;
  // if($(".jsBannerCarousel").length) {
  //   bannerCarousel = $(".jsBannerCarousel"); //Banner-carousel for Property-details page
  //   bannerCarousel.owlCarousel({
  //     center: true,
  //     items: 1,
  //     stagePadding: 0,
  //     margin: 0,
  //     loop: true,
  //     mouseDrag: false,
  //     nav: false,
  //     dots: true,
  //     animateIn: isIE11 || isIE10 ? "" : "fadeIn",
  //     animateOut: isIE11 || isIE10 ? "" : "fadeOut",
  //     smartSpeed: 500,
  //     autoplay: true,
  //     autoplayTimeout: 4000,
  //     autoplayHoverPause: true,
  //   });
  // };

  var categoryCarousel;
  if($(".jsCategoryCarousel").length) {
    categoryCarousel = $(".jsCategoryCarousel");
    categoryCarousel.owlCarousel({
      items: 4,
      stagePadding: 0,
      margin: 0,
      loop: true,
      mouseDrag: true,
      nav: false,
      dots: false,
      smartSpeed: 500,
      autoplay: false,
      autoplayTimeout: 4000,
      autoplayHoverPause: true,
      responsive : {
        0 : {
          items:1,
        },
        676:{
          items:2,
        },
        992:{
          items:3,
        },
        1200:{
          items:4,
        }
      }
    });
  }
  $('.jsCarouselPrv').on('click', function () {
    // $(this).closest('.carousel-outer').find(bannerCarousel).trigger('prev.owl.carousel');
    $(this).closest('.carousel-outer').find(categoryCarousel).trigger('prev.owl.carousel');
  });
  $('.jsCarouselNxt').on('click', function () {
    // $(this).closest('.carousel-outer').find(bannerCarousel).trigger('next.owl.carousel');
    $(this).closest('.carousel-outer').find(categoryCarousel).trigger('next.owl.carousel');
  });

  // Magnific Popup : Gallery
  if ($('.js_media_Gallery_Popup').length) { //if element exists
    $('.js_media_Gallery_Popup').magnificPopup({
      delegate: 'a',
      type: 'image',
      callbacks: {
        elementParse: function (item) {
          if ($(item.el[0]).hasClass('has-video')) {
            item.type = 'iframe',
              item.iframe = {
                patterns: {
                  youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
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
      },
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1]
      }
    });
  };

  function getQueryString() {
    var key = false, res = {}, itm = null;
    // get the query string without the ?
    var qs = location.search.substring(1);
    // check for the key as an argument
    if (arguments.length > 0 && arguments[0].length > 1)
      key = arguments[0];
    // make a regex pattern to grab key/value
    var pattern = /([^&=]+)=([^&]*)/g;
    // loop the items in the query string, either
    // find a match to the argument, or build an object
    // with key/value pairs
    while (itm = pattern.exec(qs)) {
      if (key !== false && decodeURIComponent(itm[1]) === key)
        return decodeURIComponent(itm[2]);
      else if (key === false)
        res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
    }

    return key === false ? res : null;
  }

  /*Accordion toggle*/
  // var url_string  = new URL(window.location.href);
  var url_obj = getQueryString();

  $('.accordion-wrapper').each(function(){
    var item = $(this);
    var tagetAccordions = item.children('.toggle-tabs, .toggle-content').children('.accordion');

    var tagetAccordionsToggles = tagetAccordions.children('.accordion-toggle');
    var attr = tagetAccordionsToggles.attr('data-filterby');
    var gotToBtn = item.find('[data-goto]');
    
    var togglable = item.data('togglable');
    var closeOthers = item.data('close-others');
    var seturl = item.data('seturl');

    var tabNo = attr.split('_')[1];
    var attrname = attr.split('_')[0];

    var paramVal = url_obj[attrname];
    
    if(seturl && paramVal){
      var tabNo = paramVal;
      var elmAttr = attrname+'_'+tabNo;

      tagetAccordions.removeClass('is-open');
      defaultTargetTab = item.find('[data-filterby="'+elmAttr+'"]').closest('.accordion');
      defaultTargetTab.addClass("is-open");
    }

    tagetAccordionsToggles.on('click tap',  function(){
      var elm = $(this);
      var elmAttr = elm.attr('data-filterby');
      var targetTab = item.find('[data-filterby="'+elmAttr+'"]').closest('.accordion');

      if(togglable && targetTab.hasClass("is-open")){
        tagetAccordions.removeClass('is-open');
        targetTab.removeClass("is-open");
      }else{
        if(closeOthers) {
          tagetAccordions.removeClass('is-open');
        } 
        targetTab.addClass("is-open");
        seturl && setUrl(elmAttr);
      }

      if(getViewportWidth() < 991){
        setTimeout(function(){
          var targetTabOffset = targetTab.last().offset().top;
          $("html, body").animate({ scrollTop: targetTabOffset }, 'slow');
        }, 200)
      }

    })

    gotToBtn.on('click tap', function(){
      var elm = $(this);
      var elmAttr = elm.attr('data-goto');
      item.find('[data-filterby="'+elmAttr+'"]').trigger('click');
    })

  });

  function setUrl(step){
    var stepNo = step.split('_')[1];
    var attr = step.split('_')[0];
    history.pushState({}, '', '?'+attr+'='+stepNo);
  }

  //Filter tabs
  var activeClass = "is-active";
  if ($('.filter_parent').length) { //if element exists
    $('.filter_tab').on('click', function () {
      $filter_parent = $(this).closest('.filter_parent');
      $filterBy = $(this).attr('data-filterby');
      if ($(this).hasClass(activeClass)) {
        // $('.filter_tab').removeClass(activeClass); //single select at a time
        // $(this).removeClass(activeClass);
        // filtered($filter_parent);
      } else {
        $('.filter_tab').removeClass(activeClass); //single select at a time 
        $(this).addClass(activeClass);
        if ($('.filter_dropdown').val() !== $filterBy) {
          $('.filter_dropdown').val($filterBy)
        }
        filtered($filter_parent);
      }
    });
    $('.filter_dropdown').change(function () {
      // document.getElementsByClassName('filter_parent').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      $('.filter_tab[data-filterby=' + $(this).val() + ']').trigger('click');
    });
  };

  //filter function
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

  // Custom functions
  // Submenu toggle mobile
  $('.navbar > ul li .submenuOpen, .submenuBack').on('click', function(e){
    if(getViewportWidth() < 13000){
        e.stopPropagation();
        var elm = $(this);
        var ulParent = elm.closest('ul');
        var liParent = elm.closest('li');
        if(!liParent.hasClass('this-open') && !elm.hasClass('submenuBack') && liParent.find('.dropdown')){
          liParent.addClass('this-open');
          ulParent.addClass('is-open');
        }else{
          if(elm.hasClass('submenuBack')){
            ulParent = elm.closest('.this-open').closest('ul');
            ulParent.find('li').removeClass('this-open');
            ulParent.removeClass('is-open');
          }
        }
    }    
  });

  // Initialize the Popup
  $("#enquire_popup").popup({
    // scrolllock: true,
    transition: 'all 0.7s',
    color: "transparent",
  });

  $("#login_popup").popup({
    // scrolllock: true,
    transition: 'all 0.7s',
    color: "transparent",
  });
 
  //Animate on scroll
  AOS.init({
    once: true,
    easing: 'ease-in-out',
    // anchorPlacement: 'top-bottom',
  });

  $('.map-canvas').mapify({
    key: 'AIzaSyB1kmlnoOlwpHQQBvhhIL3joMAKpKq9Yoo',
    points: [
       {
         lat: 51.467383,
         lng: -0.369419,
         marker: 'images/map-marker.png',
         markerSize: [127, 127],
         title: 'Sceptre House, 75-81 Staines Road, Hounslow, TW3 3HW',
       },
    ],
    zoom: 15,
  });

});

// iPhone page refresh on browser back button
$(window).bind("pageshow", function (event) {
  if (event.originalEvent.persisted) {
    window.location.reload();
  }
});