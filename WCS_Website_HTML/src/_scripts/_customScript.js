var lastScrollTop = 0;
if (!isIE11) {
  $(window).on("scroll", function () {
    scroll = $(window).scrollTop();
    if (scroll > lastScrollTop && scroll > 10) {
      // downscroll code
      $("header.header").addClass("shrink");
    } else if (scroll < lastScrollTop) {
      // upscroll code
      if (scroll <= 100) {
        $("header.header").removeClass("shrink");
      }
    }
    lastScrollTop = scroll;
  });
}

if ($(".jsCardCarousel").length > 0) {
  setMultiCardCarousel($(".jsCardCarousel"), {
    dots: true,
    mouseDrag: false,
    responsive: {
      0: {
        items: 1,
      },
      710: {
        items: 2,
      },
      990: {
        items: 3,
      },
    },
  });
}

if ($(".jsGalleryCarousel").length > 0) {
  setItemCarousel($(".jsGalleryCarousel"), {
    autoHeight: true
  });
}

if ($('.imageSwipeGallery').length){//if element exists
  var imageSwipeGallery = $('.imageSwipeGallery');
  var galleryItems = [];
  $('.imageSwipeGallery > li').each(function(){
    var childImgSrcPath = $(this).find('img').attr("data-src");
    galleryItems.push({
      src: childImgSrcPath,
      title: 'Double tap image to zoom in',
    })
  });

    galleryItems.forEach(function (item) {
      var newImg = new Image();
    
      newImg.onload = function () {
        item.w = newImg.width;
        item.h = newImg.height;
      };
    
      newImg.src = item.src;
    });

    var openPhotoSwipe = function (clickedIndex) {
      var pswpElement = document.querySelectorAll('.pswp')[0];
      // console.log('galleryItems', galleryItems);
      var items = galleryItems;
      var options = {
          index: clickedIndex || 0,
          shareEl: false,
          clickToCloseNonZoomable: false,
          history: false,
          closeOnScroll: false
      }
      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };
    
    $('.imageSwipeGallery > li').on('click', function(){
      openPhotoSwipe($(this).index());
    });
}

// if($(".doubleTapActive").length > 0){
//   $(".doubleTapActive").doubleTapToGo();
// }

if($(".hover-tap").length > 0){
  $(".hover-tap").on("click", function(){
    $(".hover-tap").removeClass('hovered-tapped');
    $(this).addClass('hovered-tapped');
  }); 
}
