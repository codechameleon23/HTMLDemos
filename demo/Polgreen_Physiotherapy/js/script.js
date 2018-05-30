/*Navbar toggle*/
$(".hamburger").on('click',  function(){
    $(this).toggleClass("is-active");
});


/*banner-carousel*/

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

if ($('.banner-carousel').length){//if element exists
    
    var bannerCarousel = $('.banner-carousel');

    bannerCarousel.owlCarousel({
        mouseDrag:false,
        items:1,
        loop:true,
        nav:false,
        animateIn: isIE11 ? '' : 'fadeIn',
        animateOut: isIE11 ? '' : 'fadeOut',
        autoplay:true,
        autoplayTimeout:7000,
        autoplayHoverPause:true
    });

}

var windowW = $(window).width();

if ($('.news-carousel').length){//if element exists
    
    var newsCarousel = $('.news-carousel');

    newsCarousel.owlCarousel({
        mouseDrag:false,
        items:1,
        loop:true,
        nav:false,
        dots: false,
        animateIn: (isIE11 || (windowW < 767) ) ? 'fadeInRight' : 'fadeInDown',
        animateOut: (isIE11 || (windowW < 767) ) ? 'fadeOutLeft' : 'fadeOutDown',
        autoplay:true,
        autoplayTimeout:3000,
        autoplayHoverPause:true
    });

    // Go to the pervious item
    $('.news-carousel-wrapper .control-prev').click(function() {
        newsCarousel.trigger('prev.owl.carousel');
    });
    // Go to the next item
    $('.news-carousel-wrapper .control-next').click(function() {
        newsCarousel.trigger('next.owl.carousel');
    });

}


/*strip carousel*/
if ($('.strip-carousel').length){//if element exists

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
            1000:{
                items:5
            },
            1400:{
                items:7
            }
        }
    });
} 
