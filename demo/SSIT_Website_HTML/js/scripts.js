function getViewportWidth(){if (window.innerWidth){return window.innerWidth;}else if (document.body && document.body.offsetWidth){return document.body.offsetWidth;}else{return 0;}}

/*Navbar toggle*/
$(".hamburger").on('click',  function(){
    $(this).toggleClass("is-active");
});

// Initialize the Contact form Popup 
$('.popup').popup({
    scrolllock : true,
    color : '#fff',
    opacity : '.9'
});


/*Slide carousel*/
if($('.slide-carousel').length){//if element exists

    var slideCarousel = $('.slide-carousel');

    slideCarousel.owlCarousel({
        items:2,
        loop:true,
        nav:false,
        dots:false,
        autoplay:true,
        autoplayTimeout:6000,
        autoplaySpeed: 2500,
        autoplayHoverPause:true
    });
} 



/*Tabs*/
if ($('.tabs-wrapper').length){//if element exists
    $('.tab').on('click', function(){

        var obj = $(this);

        if(obj.closest('.tab-content_group').length){
            this_eq =  $(this).closest('.tab-content_group').index();
        }else{
            this_eq =  $(this).index();
        }

        if(getViewportWidth() > 767){
            activateTab();
        }else{
            if(obj.closest('.tab-content_group').hasClass('active')){
                obj.closest('.tab-parent-container').find('.tab-content_group, .tabs .tab').removeClass('active');
            }else{
                activateTab();
            }
        }

        function activateTab(){
            obj.closest('.tab-parent-container').find('.tab-content_group, .tabs .tab').removeClass('active');
            obj.closest('.tab-parent-container').find('.tabs .tab').eq(this_eq).addClass('active');
            obj.closest('.tab-parent-container').find('.tab-content_group').eq(this_eq).addClass('active');
       }

    });

    $('.tab-button').on('click', function(){

        this_eq =  $(this).index();
        $(this).addClass('active').siblings('.tab-button').removeClass('active');
        $('.tab-containers > .tab-content').eq(this_eq).addClass('active').siblings('.tab-content').removeClass('active');
    });
};

/*Accordion toggle*/
$(".accordian-toggle").on('click tap',  function(){

    if($(this).hasClass('is-open')){
        $(this).closest('.accordion-wrapper').find('.accordian-toggle').removeClass('is-open');
    }else{
        $(this).closest('.accordion-wrapper').find('.accordian-toggle').removeClass('is-open');
        $(this).addClass("is-open");  
    }

});

/*imageGallery*/

var imageGallery;
window.onload = function() {
    if ($('#imageGallery').length){//if element exists

        var imageGallery = $('#imageGallery');

        imageGallery.lightSlider({

            gallery:true,
            pauseOnHover:true,
            loop:true,
            enableDrag : false,
            freeMove: false,
            //auto : true,

            adaptiveHeight: true,

            item:1,
            thumbItem:8,
            pause: 3000,

            thumbMargin: 17,

            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',

            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        thumbItem: 5,
                        controls : false
                    }
                }
            ]
        });  
    }
}

/* ===================== */


if ($('.popup-image_single').length){//if element exists
    $('.popup-image_single').magnificPopup({
        type: 'image',
        //gallery:{enabled:false},
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300,
            opener: function(openerElement) {
            	return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    })
};

if ($('.popup-image_video').length){//if element exists
    $('.popup-image_video').magnificPopup({
        delegate: 'a',
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    })
};

// Magnific Popup : Gallery
if ($('.popup-image_gallery').length){//if element exists

    $('.popup-image_gallery').each(function() {
        $(this).magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1] // Will preload 0 - before current, and 1 after the current image
            },
            callbacks: {
                elementParse: function(item) {
                    console.log(item.el[0].className);
                    if(item.el[0].className == 'has-video') {
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
