/*Navbar toggle*/
$(".hamburger").on('click',  function(){
    $(this).toggleClass("is-active");
});

/*Navbar*/
$( '.navbar li.has_menu' ).doubleTapToGo();

/*banner-carousel*/
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
if ($('.banner-carousel').length){//if element exists
    var bannerCarousel = $('.banner-carousel');
    bannerCarousel.owlCarousel({
        mouseDrag:false,
        items:1,
        loop:true,
        nav:false,
        animateIn:  isIE11 ? '' : 'slideInUp',
        animateOut: isIE11 ? '' : 'slideOutUp',
        //autoplay:true,
        autoplayTimeout:7000,
        autoplayHoverPause:true
    });
}


/*Image popup*/
if ($('.popup-image').length){//if element exists
    $('.popup-image').magnificPopup({
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

/*Image gallery popup*/
if ($('.popup-gallery').length){//if element exists

    $('.popup-gallery').each(function() {
        $(this).magnificPopup({
            delegate: 'a', 
            type: 'image',
            gallery:{enabled:true},
            mainClass: 'mfp-with-zoom',
            zoom: {
                enabled: true,
                duration: 300,
                //easing: 'ease-in-out', // CSS transition easing function
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });
    });
    
};


/*Accordion toggle*/
var preOffset;
$(".accordian-toggle").on('click tap',  function(){

    obj = $(this);
    
    if(obj.hasClass("is-open")){
        obj.removeClass("is-open");    
    }else{
        obj.closest('.accordion-wrapper').find('.accordian-toggle').removeClass('is-open');
        obj.addClass("is-open");

        if(preOffset != ""){
            $('html, body').scrollTop(preOffset);
        }else{
            preOffset = obj.offset().top - 18;
        }

        setTimeout(function(){
            
            $('html, body').animate({
                scrollTop: obj.offset().top - 18
            }, 700);

            preOffset = obj.offset().top - 18;

        }, 800);
        
    }
});