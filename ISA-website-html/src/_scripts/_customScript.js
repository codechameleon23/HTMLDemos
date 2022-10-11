function filterPanelClose() {
  $("body").removeClass("filter-open");
}
function filterPanelOpen() {
  $("body").addClass("filter-open");
}

var lastScrollTop = 0;
if (!isIE11) {
  $(window).on("scroll", function () {
    scroll = $(window).scrollTop();
    if (scroll > lastScrollTop && scroll > 10) {
      // downscroll code
      // $("body").addClass("header-shrink");
    } else if (scroll < lastScrollTop) {
      // upscroll code
      if (scroll <= 100) {
        // $("body").removeClass("header-shrink");
      }
    }
    lastScrollTop = scroll;
  });
}

$('.illustaredMap').on('click', function(){
  $(this).addClass('is-active');
  $('.googleMap').removeClass('is-active');
  $('#map-canvas').addClass('d-hidden');
})

$('.googleMap').on('click', function(){
  $(this).addClass('is-active');
  $('.illustaredMap').removeClass('is-active');
  $('#map-canvas').removeClass('d-hidden');
})