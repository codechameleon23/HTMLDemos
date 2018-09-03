//Ie 10 hack
var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

function getViewportWidth(){if (window.innerWidth){return window.innerWidth;}else if (document.body && document.body.offsetWidth){return document.body.offsetWidth;}else{return 0;}}

function stopOwlPropagation(element) {
    jQuery(element).on('to.owl.carousel', function(e) { e.stopPropagation(); });
    jQuery(element).on('next.owl.carousel', function(e) { e.stopPropagation(); });
    jQuery(element).on('prev.owl.carousel', function(e) { e.stopPropagation(); });
    jQuery(element).on('destroy.owl.carousel', function(e) { e.stopPropagation(); });
}
stopOwlPropagation('.owl-carousel');


var flagCarousel;
$(function(){

    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;    
    if ($('.mainTabCarousel').length){//if element exists
        
        var maintabCarousel = $('.mainTabCarousel');

        maintabCarousel.owlCarousel({
            mouseDrag:false,
            touchDrag:false,
            // autoHeight: true,
            items:1,
            loop:false,
            nav:false,
            dots:false,
            animateIn: isIE11 ? '' : 'fadeInUp',
            animateOut: isIE11 ? '' : 'fadeOutDown',
            autoplay:false,
        })

        $('.tab').on('click', function(){
            var i = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            maintabCarousel.trigger('to.owl.carousel', i)

            $('html, body').animate({
                    scrollTop:$('.header').outerHeight()
                }, 500, 'swing', function() { 
            });

        });

    }

    if($('.inner-tab-crousel').length){
        var innermaintabCarousel = $('.inner-tab-crousel');

        innermaintabCarousel.owlCarousel({
            mouseDrag:false,
            touchDrag:true,
            // autoHeight:true,
            items:1,
            loop:false,
            nav:false,
            dots:false,
            animateIn: isIE11 ? '' : 'smoothInUp',
            animateOut: isIE11 ? '' : 'fadeOutDown',
            autoplay:false,
        });

        $('.inner-tab').on('click', function(){
            // var parent = $(this).closest('.tab-crousel');
            var i = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            innermaintabCarousel.trigger('to.owl.carousel', i);
        });

    }
    
    if($('.fleg-carousel').length){
        flagCarousel = $('.fleg-carousel');

        flagCarousel.owlCarousel({
            mouseDrag:false,
            items:1,
            loop:false,
            nav:false,
            dots:false,
            animateIn: (isIE11 || getViewportWidth() < 700) ? '' : 'fadeInDown',
            animateOut: (isIE11 || getViewportWidth() < 700) ? '' : 'fadeOut',
            autoplay:false,
        });

        $('.flag-tab').on('click', function(){
            var i = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            flagCarousel.trigger('to.owl.carousel', i);
        });

    }

});

/* Change info when country clicked */
function getInfo(fleg_index){
    index = $('.country-sequence').find('.'+fleg_index).index();
    flagCarousel.trigger('to.owl.carousel', index);
}


// if($('.infotip_link').length){
//     $('.infotip').on('click', function(){
//         if($(this).hasClass('active')){
//             $('.infotip').removeClass('active').next('.button').fadeIn(300);
//         }else{
//             $('.infotip').addClass('active').next('.button').fadeOut(300);
//         }
//     })
// }

// Initialize the Contact form Popup 
if($('#sourse-flags_popup').length && getViewportWidth() < 700){

    var i;
    $('.country-sequence .sourse-flags_popup_open').on('click', function(){
        i = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('#sourse-flags_popup').popup({
        scrolllock : true,
        color : '#fff',
        opacity : '.9',
        onopen: function() {
            flagCarousel.trigger('to.owl.carousel', i);
        }
    });
}
