/*banner-carousel*/
if ($('.banner-carousel').length){//if element exists
    
    var bannerCarousel = $('.banner-carousel');

    bannerCarousel.owlCarousel({
        center:true,
        items:1,
        loop:true,
        nav:false,
        animateIn: 'slideInDown',
        animateOut: 'slideOutDown',
        // autoplay:true,
        // autoplayTimeout:5000,
        // autoplayHoverPause:true
    });

}