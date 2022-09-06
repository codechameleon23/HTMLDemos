// var lastScrollTop = 0;
// if (!isIE11) {
//   $(window).on("scroll", function () {
//     scroll = $(window).scrollTop();
//     if (scroll > lastScrollTop && scroll > 10) {
//       // downscroll code
//       $("header.header").addClass("shrink");
//     } else if (scroll < lastScrollTop) {
//       // upscroll code
//       if (scroll <= 100) {
//         $("header.header").removeClass("shrink");
//       }
//     }
//     lastScrollTop = scroll;
//   });
// }

var allPictures = $('.picture-slider').find('figure');
if (allPictures.length > 0) {
   var index = 0;
   var totalPictures = allPictures.length;
   var imageSlider = setInterval(function () {
      if (index < totalPictures - 1) {
         index = index + 1;
      } else {
         index = 0;
      }
      $('.picture-slider figure').removeClass('is-active');
      $('.picture-slider figure').eq(index).addClass('is-active');
   }, 5500);
}

if ($(".filter-toggle").length > 0) {
  $(".filter-toggle").on("click", function () {
    if ($("body").hasClass("filter-open")) {
      $("body").removeClass("filter-open");
    } else {
      $("body").addClass("filter-open");
    };
  });
}

if($('.hello-bar').length > 0){
  setTimeout(function(){
    $('body').addClass('hello-bar-open');
  }, 1500)

  $('.hello-bar-close').on('click', function(){
    $('body').removeClass('hello-bar-open');
  })
}
