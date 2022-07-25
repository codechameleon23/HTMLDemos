
//  -------------------------------------------
//  When element in view on browser
//  -------------------------------------------
  var ctaBannerInViewJS = $('.ctaBannerInViewJS');
  var sectionBannerInViewJS = $('.sectionBannerInViewJS');

  function checkVisibility() {
    ctaBannerInViewJS.each(function(){
      if ($(this).inView("topOnly", 100)) {
        $(this).addClass("in-view");
      }
    });
    sectionBannerInViewJS.each(function(){
      if ($(this).inView("bottomOnly", -100)) {
        $(this).addClass("in-view");
      }
    });
  }

  checkVisibility();

  $(window).scroll(function() {
    checkVisibility();
  });

