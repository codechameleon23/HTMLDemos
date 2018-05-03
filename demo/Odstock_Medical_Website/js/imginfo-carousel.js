/*banner-carousel*/
if ($('.imginfo-carousel').length){//if element exists
    
    var imginfoCarousel = $('.imginfo-carousel');

    imginfoCarousel.owlCarousel({
        center:true,
        items:1,
        loop:true,
        nav:false,
        animateIn: 'slideInDown',
        animateOut: 'slideOutDown',
        autoplay:true,
        autoplayTimeout:5000,
        autoplayHoverPause:true
    });

}