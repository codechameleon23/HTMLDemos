$(function(){
    /*strip carousel*/
    if ($('.strip-carousel').length){//if element exists

        var stripCarousel = $('.strip-carousel');

        stripCarousel.owlCarousel({
            loop:true,
            nav:false,
            dots:false,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true,
            responsive:{
                0:{
                    items:3
                },
                800:{
                    items:6
                },
                // 1000:{
                //     items:7
                // }
            }
        });
    }   
});