function getViewportWidth(){if (window.innerWidth){return window.innerWidth;}else if (document.body && document.body.offsetWidth){return document.body.offsetWidth;}else{return 0;}}

/*Navbar toggle*/
$(".hamburger").on('click',  function(){
    $(this).toggleClass("is-active");
});

/*Search toggle*/
$(".search-toggle").on('click',  function(){
    $(this).toggleClass("is-active").next('.search_outer').slideToggle();
});

/*Banner-carousel*/
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

if ($('.banner-carousel').length){//if element exists
    
    var bannerCarousel = $('.banner-carousel');

    bannerCarousel.owlCarousel({
        mouseDrag:false,
        items:1,
        loop:true,
        nav:false,
        animateIn: isIE11 ? '' : 'fadeInUp',
        animateOut: isIE11 ? '' : 'fadeOutUp',
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    })
    // .mouseover(function(){
    //     bannerCarousel.trigger('stop.owl.autoplay');
    // }).mouseleave(function(){
    //     bannerCarousel.trigger('play.owl.autoplay',[1000]);
    // });

}

/*Tabs*/

if ($('.tabs_wrapper').length){//if element exists
    $('.tab').on('click', function(){

        obj = $(this);
        // parent = $(this).closest('.tabs_wrapper');
        // tab_parent = $(this).closest('.tab-group');

        this_eq =  $(this).index();
        parent_eq = $(this).closest('.tab-group').index();
        
        if(obj.closest('.tab-group').length){
            eq = parent_eq;
        }else{
            eq = this_eq;
        }
        if(getViewportWidth() > 767){
            activateTab();
        }else{
            if(obj.closest('.tab-group').hasClass('active')){
                obj.closest('.tabs_wrapper').find('.tab-group, .tabs .tab').removeClass('active');
            }else{
                activateTab();
            }
        }

        function activateTab(){

             obj.closest('.tabs_wrapper').find('.tab-group, .tabs .tab').removeClass('active');
             obj.closest('.tabs_wrapper').find('.tabs .tab').eq(eq).addClass('active');
             obj.closest('.tabs_wrapper').find('.tab-group').eq(eq).addClass('active');
        }

    });
}

/*Content-carousel*/
if ($('.content-carousel').length){//if element exists
    
    var contentCarousel = $('.content-carousel');

    contentCarousel.owlCarousel({
        loop:true,
        autoHeight:true,
        items:1,
        nav:false,
        dots:false,
        animateIn: isIE11 ? '' : 'fadeIn',
        animateOut: isIE11 ? '' : 'fadeOut',
        // autoplay:true,
        // autoplayTimeout:3000,
        //autoplayHoverPause:true
    });

    $('.content-carousel_prev').on('click', function(){
        $(this).closest('.content-carousel_wrap').find(contentCarousel).trigger('prev.owl.carousel');
    });
    $('.content-carousel_next').on('click', function(){
        $(this).closest('.content-carousel_wrap').find(contentCarousel).trigger('next.owl.carousel');
    });

}

/*Gallery-carousel*/
if ($('.gallery-carousel').length){//if element exists
    
    var galleryCarousel = $('.gallery-carousel');

    galleryCarousel.owlCarousel({
        loop:true,
        autoHeight:true,
        items:1,
        nav:false,
        dots:false,
        animateIn: isIE11 ? '' : '',
        animateOut: isIE11 ? '' : '',
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true
    })
    // .mouseover(function(){
    //     galleryCarousel.trigger('stop.owl.autoplay');
    // }).mouseleave(function(){
    //     galleryCarousel.trigger('play.owl.autoplay',[1000]);
    // });

    $('.gallery-carousel_prev').on('click', function(){
        galleryCarousel.trigger('prev.owl.carousel');
    });
    $('.gallery-carousel_next').on('click', function(){
        galleryCarousel.trigger('next.owl.carousel');
    });

}


/* Card carousel */
if($('.card-carousel').length){
    var cardCarousel = $('.card-carousel');

    cardCarousel.owlCarousel({
        loop:true,
        nav:false,
        dots:false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:1
            },
            700:{
                items:2
            },
            900:{
                items:3
            }
        }
    });
    // .mouseover(function(){
    //     cardCarousel.trigger('stop.owl.autoplay');
    // }).mouseleave(function(){
    //     cardCarousel.trigger('play.owl.autoplay',[1000]);
    // });

    $('.card-carousel_control._prv').on('click', function(){
        $(this).closest('.card-carousel_wrapper').find('.card-carousel').trigger('prev.owl.carousel');
    });
    $('.card-carousel_control._nxt').on('click', function(){
        $(this).closest('.card-carousel_wrapper').find('.card-carousel').trigger('next.owl.carousel');
    });
};

/* Vertical Card carousel */
if($('.vertical_card-carousel').length){
    var verticalCardCarousel = $('.vertical_card-carousel');

    verticalCardCarousel.owlCarousel({
        loop:true,
        nav:false,
        dots:false,
        items:1,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true
    });
    //.mouseover(function(){
    //     verticalCardCarousel.trigger('stop.owl.autoplay');
    // }).mouseleave(function(){
    //     verticalCardCarousel.trigger('play.owl.autoplay',[1000]);
    // });

    $('.card-carousel_control._prv').on('click', function(){
        $(this).closest('.card-carousel_wrapper').find('.vertical_card-carousel').trigger('prev.owl.carousel');
    });
    $('.card-carousel_control._nxt').on('click', function(){
        $(this).closest('.card-carousel_wrapper').find('.vertical_card-carousel').trigger('next.owl.carousel');
    });
};

/*Strip carousel*/
if($('.strip-carousel').length){//if element exists

    var stripCarousel = $('.strip-carousel');

    stripCarousel.owlCarousel({
        loop:true,
        nav:false,
        dots:false,
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true,
        responsive:{
            0:{
                items:3
            },
            600:{
                items:5
            },
            1400:{
                items:7
            }
        }
    });
    // .mouseover(function(){
    //     stripCarousel.trigger('stop.owl.autoplay');
    // }).mouseleave(function(){
    //     stripCarousel.trigger('play.owl.autoplay',[1000]);
    // });
} 

// Initialize the Contact form Popup 
$('.popup').popup({
    scrolllock : true
});


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


/* Datepicker */
if ($('.datepicker').length){//if element exists
    
    $('.datepicker input').daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false
    });
}


/*Filter*/
$('.filter_toggle').on('click', function(){
    $(this).toggleClass('focused').closest('.filter_parent').find('.filter_panel').toggleClass('is_open').slideToggle(260);
});

if($('.filter_parent').length){//if element exists
    
    $('.filter_tab').on('click', function(){

        $filter_parent = $(this).closest('.filter_parent');
        //$filterBy = $(this).attr('data-filterby');

        if($(this).hasClass('btn-active')){

            $(this).removeClass('btn-active');
            filtered($filter_parent);

        }else{
            $(this).addClass('btn-active');
            filtered($filter_parent);
        }
    });
}

function filtered(fp){

    console.log(fp+'//'+ fp.find('.filter_tab.btn-active').length);

    if(fp != "" && fp.find('.filter_tab.btn-active').length ){

        fp.find('.filter_obj').removeClass('filtered');
        
        filterBy = [];
        

        fp.find('.filter_tab.btn-active').each(function(){
            filterBy.push($(this).attr('data-filterby'));
        });
        console.log(filterBy);
        for(i = 0; i < filterBy.length; i++){
            console.log('in');
            fp.find('.filter_obj.'+filterBy[i]).addClass('filtered');
        }

    }else{
        
        $('.filter_obj').addClass('filtered');

    }

    
}
