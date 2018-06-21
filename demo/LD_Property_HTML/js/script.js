/*Navbar toggle*/
$(".hamburger").on('click',  function(){
    $(this).toggleClass("is-active");
});

/*search_toggle mobile */
$(".search_toggle").on('click',  function(){
    $(this).toggleClass("is-active");
});

// Initialize the Contact form Popup 
$('.popup').popup({
    scrolllock : true,
    color : '#fff',
    opacity : '.8'
});

$('#chooseBranch').popup({
    autoopen : true
});

$('#teamMember').popup({
    background : false
});


/*Inline Video Player*/
$(document).on('click','.js-videoPoster',function(e) {
    e.preventDefault();
    var poster = $(this);
    var wrapper = poster.closest('.js-videoWrapper');
    videoPlay(wrapper);
});

function videoPlay(wrapper) {
    var iframe = wrapper.find('.js-videoIframe');
    var src = iframe.data('src');
    wrapper.addClass('videoWrapperActive');
    iframe.attr('src',src);
}

/*Details page Tabs*/
if($('.tabs-contnet-group').length){//if element exists
    $('.tabs-contnet-group .tab').on('click', function(){
        id = $(this).attr('data-tab');

        parent = $(this).closest('.tabs-contnet-group');

        parent.find('.tab, .tab-content').removeClass('is-active');
        parent.find('*[data-tab="'+id+'"]').addClass('is-active');
        
    })
}

/*Testimonials-carousel*/
if ($('.testimonial-carousel').length){//if element exists
    
    var newsCarousel = $('.testimonial-carousel');

    newsCarousel.owlCarousel({
        mouseDrag:false,
        items:2,
        slideBy: 2,
        loop:true,
        nav:false,
        dots: false,
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1,
                slideBy: 1
            },
            960:{
                items:2
            }
        }
    });

    // Go to the pervious item
    $('.carousel-wrapper .control-prev').click(function() {
        $(this).closest('.carousel-wrapper').find(newsCarousel).trigger('prev.owl.carousel');
    });
    // Go to the next item
    $('.carousel-wrapper .control-next').click(function() {
        $(this).closest('.carousel-wrapper').find(newsCarousel).trigger('next.owl.carousel');
    });

}


/*imageGallery*/

var imageGallery;
var imageGallery_big;

window.onload = function() {

    /* Property details page */
    if ($('#imageGallery').length){//if element exists

        var imageGallery = $('#imageGallery');

        imageGallery.lightSlider({

            gallery:true,
            pauseOnHover:true,
            loop:true,
            enableDrag : false,
            freeMove: false,
            auto : true,

            adaptiveHeight: true,

            item:1,
            thumbItem:6,
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
    
    /* _elements page */
    if ($('#imageGallery_big').length){//if element exists

        var imageGallery = $('#imageGallery_big');

        imageGallery.lightSlider({

            gallery:true,
            pauseOnHover:true,
            loop:true,
            enableDrag : false,
            freeMove: false,
            auto : true,

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

};



/*Product image gallery popup*/
if ($('.popup-image_gallery').length){//if element exists

    $('.popup-image_gallery').magnificPopup({

        type: 'image',
        gallery:{
            enabled:true
        },
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
            // openerElement is the element on which popup was initialized, in this case its <a> tag
            // you don't need to add "opener" option if this code matches your needs, it's defailt one.
            return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    })
};
