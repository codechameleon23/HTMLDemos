// * scripts.js

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

// $(window).on('scroll', function () {
//   navBarClose();
// });

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
      }, 100 + (i * 50));
    } else {
      $element.removeClass('in-view');
    }
  });
}
$window.on('scroll resize', check_if_in_view);
// $window.on('scroll resize', navBarClose);
$window.trigger('scroll');

var defaultQuoteView = 'quick';
function togleQuiteView(quoteView){
  quoteView = quoteView || defaultQuoteView;
  $('.quote-view-wrapper').hide();
  $('#'+quoteView+'-quoteViewWrapper').show();
}


$(document).ready(function () {

  togleQuiteView();

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
  var bannerCarousel;
  if ($(".jsBannerCarousel").length) {
    bannerCarousel = $(".jsBannerCarousel"); //Banner-carousel for Property-details page
    bannerCarousel.owlCarousel({
      center: true,
      items: 1,
      stagePadding: 0,
      margin: 0,
      loop: true,
      mouseDrag: false,
      nav: false,
      dots: false,
      // animateIn: isIE11 || isIE10 ? "" : "slideInUp",
      // animateOut: isIE11 || isIE10 ? "" : "slideOutUp",
      smartSpeed: 500,
      // autoplay: true,
      autoplayTimeout: 7000,
      autoplayHoverPause: true,
    });

  };
  $('.jsCarouselPrv').on('click', function () {
    $(this).closest('.carousel-outer').find(bannerCarousel).trigger('prev.owl.carousel');
  });
  $('.jsCarouselNxt').on('click', function () {
    $(this).closest('.carousel-outer').find(bannerCarousel).trigger('next.owl.carousel');
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

  // Datepicker
  $(".datepicker").flatpickr({
    disableMobile: true,
    dateFormat: "d-M-y"
  });

  // quantity input
  $('.number-group').each(function(){
    var thisGroup = $(this);
    var control = thisGroup.find('.range-control');
    var output = thisGroup.find('.output');
    var btnDec = thisGroup.find('[data-control="decrement"]');
    var btnInc = thisGroup.find('[data-control="increment"]');
    var initialHide = thisGroup.find('.initial-hide');
    var step = output.data('step') || 1;
    var min = output.data('min') || 0;
    var max = output.data('max') || 0;

    var defaultVal = output.val();
    output.val(defaultVal || min)
    var value = value = parseInt(output.val());

    value > 0 ? notMin() : onMin();

    control.on('click', function(){
      var elm = $(this);
      var direction = elm.attr('data-control');
      value = parseInt(output.val());
      output.val(direction === 'decrement' ? ( value > min ? value - step : min) : (value < max ? value + step : max) )
      value = parseInt(output.val());

      value <= min ? onMin() : notMin();
      value >= max ? onMax() : notMax();
    })

    function onMin(){
      btnDec.addClass('opacity-50');
      thisGroup.addClass('opacity-50');
      initialHide.hide();
    }
    
    function notMin(){
      btnDec.removeClass('opacity-50')
      thisGroup.removeClass('opacity-50');
      initialHide.show()
    }

    function onMax(){
      btnInc.addClass('opacity-50')
    }
    
    function notMax(){
      btnInc.removeClass('opacity-50')
    }


  });

  // Range slider
  $('.range-group').each(function(){
    var thisGroup = $(this);
    var eachRangeSlider = thisGroup.find('.js-range-slider');
    var eachRangeSlider = eachRangeSlider.ionRangeSlider({
      skin: "round"
    });
    
    var eachRangeSliderData = null;
    var value = 0;
    
    var control = thisGroup.find('.range-control');
    var output = thisGroup.find('.output');
    var btnDec = thisGroup.find('[data-control="decrement"]');
    var btnInc = thisGroup.find('[data-control="increment"]');
    
    var step = eachRangeSlider.data('step');
    var min = eachRangeSlider.data('min');
    var max = eachRangeSlider.data('max');

    eachRangeSlider.on('change', function(){
      var elm = $(this);
      value = parseInt(elm.prop('value'));
      output.val(value);

      value <= min ? btnDec.addClass('opacity-50') : btnDec.removeClass('opacity-50');
      value >= max ? btnInc.addClass('opacity-50') : btnInc.removeClass('opacity-50');

    })

    control.on('click', function(){
      var elm = $(this);
      
      var direction = elm.attr('data-control');
      eachRangeSliderData = eachRangeSlider.data("ionRangeSlider");
      eachRangeSliderData.update({
        from: direction === 'decrement' ? value - step : value + step,
      })
    })

  })
  // $(".js-range-slider").ionRangeSlider();

  // Select Storage Option
  var selectedStorage = $('#storageSelect').val();
  showSelectedStoarge(selectedStorage);

  $('#storageSelect').on('change', function(){
    var selected = this.value;
    showSelectedStoarge(selected);
  });

  // tooltipster
  $('.tooltipster').tooltipster({
    theme: ['tooltipster-shadow', 'tooltipster-customized'],
    animation: 'grow',
    maxWidth: 165,
    side: 'right',
    trigger: ('ontouchstart' in window) ? 'click' : 'hover'
  });
  
  //Animate on scroll
  AOS.init({
    offset: 0,
    once: true,
    easing: 'ease-in-out',
    anchorPlacement: 'top-bottom',
  });
});

function showSelectedStoarge(selected){
  if(selected){
    hideSelectedStoarge();
    $('.select-storage.'+selected).addClass('is-open');
  }else{
    hideSelectedStoarge();
  }
}

function hideSelectedStoarge(){
  $('.select-storage').removeClass('is-open');
}

// iPhone page refresh on browser back button
$(window).bind("pageshow", function (event) {
  if (event.originalEvent.persisted) {
    window.location.reload();
  }
});