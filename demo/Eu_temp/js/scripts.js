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
            autoHeight: true,
            mouseDrag:false,
            items:1,
            loop:false,
            nav:false,
            dots:false,
            animateIn: isIE11 ? '' : 'fadeInUp',
            animateOut: isIE11 ? '' : 'fadeOutUp',
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
            items:1,
            loop:false,
            nav:false,
            dots:false,
            animateIn: isIE11 ? '' : 'fadeInUp',
            animateOut: isIE11 ? '' : 'fadeOutUp',
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
            animateIn: isIE11 ? '' : 'fadeInDown',
            animateOut: isIE11 ? '' : 'fadeOutUp',
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