var imageGallery;
window.onload = function() {
if ($('#imageGallery').length){//if element exists
    imageGallery = $('#imageGallery');
    imageGallery.lightSlider({
        gallery:true,
        pauseOnHover:true,
        loop:true,
        enableDrag : false,
        freeMove: false,
        // auto : true,
        adaptiveHeight: true,
        item:1,
        thumbItem:4,
        pause: 3000,
        thumbMargin: 14,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        responsive: [
          {
            breakpoint: 600,
            settings: {
                controls : false
            }
          }
        ],
    });
    // var galleryAllItems = [];
    var galleryItems = [];
    $('#imageGallery > li.lslide').each(function(){
      var childImgSrcPath = $(this).attr("data-src");
      galleryItems.push({
        src: childImgSrcPath,
      })
    });
  
    console.log('galleryItems +++++++++++ ', galleryItems);

    galleryItems.forEach(function (item) {
      var newImg = new Image();
    
      newImg.onload = function () {
        item.w = newImg.width;
        item.h = newImg.height;
      };
    
      newImg.src = item.src;
    });

    var openPhotoSwipe = function () {
       console.log('xdSdadas', document.querySelectorAll('.pswp'));
      var pswpElement = document.querySelectorAll('.pswp')[0];
      // console.log('galleryItems', galleryItems);
      var items = galleryItems;
      var options = {
          index: parseInt(imageGallery.getCurrentSlideCount() - 1) || 0,
          shareEl: false,
          clickToCloseNonZoomable: false,
          history: false,
          closeOnScroll: false
      }
      var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
      gallery.init();
    };
    
    $('#imageGallery li').on('click', function(){
      openPhotoSwipe();
    });
  }
}