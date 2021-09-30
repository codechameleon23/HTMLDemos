//  -------------------------------------------
//  Magnific Popup : Gallery
//  -------------------------------------------
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
      },
      buildControls: function() {
        this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
      }
    },
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    }
  });
};  