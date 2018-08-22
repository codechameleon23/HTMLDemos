/*Shrink Headrt on scroll*/
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

var lastScrollTop = 0;

if(!isIE11){

    $(window).on('scroll', function(){

        scroll = $(window).scrollTop();

        if (scroll > lastScrollTop && scroll > 10){
            // downscroll code
            
            $(".js-header").addClass("shrink");
            if(scroll > 600){
                $(".js-header").addClass("shrink_more");
                $(".shrink").addClass("shrink_more");
            }

        } else if(scroll < lastScrollTop){
            // upscroll code

            $(".js-header").removeClass("shrink_more");
            $(".shrink").removeClass("shrink_more");   
            if(scroll <= 100){
                $(".js-header").removeClass("shrink shrink_more");    
            }
        }
        
        lastScrollTop = scroll;
    });

}

$(function(){
    
    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active");
    });

    /*Banner-carousel*/
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
            autoplayTimeout:7000,
            autoplayHoverPause:true
        });
    }

    /*insta carousel*/
    if($('.insta-carousel').length){//if element exists

        var instaCarousel = $('.insta-carousel');

        instaCarousel.owlCarousel({
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
                    items:8
                }
            }
        });
    }

    /* Datepicker */
    if ($('.datepicker').length){//if element exists
        $('.datepicker input').datepicker();
    }

});