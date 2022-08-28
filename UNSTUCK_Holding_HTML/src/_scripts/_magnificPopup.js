//  -------------------------------------------
//  Magnific Popup : Gallery
//  -------------------------------------------
if ($('.js_media_Gallery_Popup').length > 0) { //if element exists
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
      },
      // buildControls: function() {
      //   this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
      // }
    },
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1],
      tCounter: '',
    },
    // image: {
    //   titleSrc: function (item) {
    //     return item.el.find("figcaption").html() ? '<div class="caption-wrapper opacity-85 hover:opacity-100 transition-all">'+
    //               '<div onclick="hideCaption(this)" class="cursor-pointer caption-toggle bg-primary f-color-white f-size-1 px-xs py-hair pos-absolute pin-b-100 pin-r p-thin">' +
    //                   '<span><span class="minus">Hide</span><span class="plus">Show</span></span>'+
    //               '</div>'+item.el.find("figcaption").html()+'</div>' : '';
    //   }
    // }
  });
};