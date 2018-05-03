$(function(){
    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active");
    });
    
    /*Navbar*/
    if($('.nav').length){
        $('.nav li').on('click', function(){
            $('.nav li').removeClass('active');
            $(this).addClass('active');
        })
    }
    
    /*Popups*/
    if ($('#talkFestReg-popup').length){//if element exists
        $('#talkFestReg-popup').popup({
            outline : false,
            scrolllock : true
        });
    }
    

    /*banner-carousel*/
    if ($('.banner-carousel').length){//if element exists
        
        var bannerCarousel = $('.banner-carousel');

        bannerCarousel.owlCarousel({
            mouseDrag:false,
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

    /*imginfo-carousel*/
    if ($('.imginfo-carousel').length){//if element exists
        
        var imginfoCarousel = $('.imginfo-carousel');

        imginfoCarousel.owlCarousel({
            center:true,
            items:1,
            loop:true,
            nav:false,
            animateIn: 'slideInDown',
            animateOut: 'fadeOutDown',
            // autoplay:true,
            // autoplayTimeout:5000,
            // autoplayHoverPause:true
        });

    }

        /*strip carousel*/
        if ($('.strip-carousel').length){//if element exists

            var stripCarousel = $('.strip-carousel');
    
            stripCarousel.owlCarousel({
                loop:true,
                nav:false,
                dots:false,
                //autoplay:true,
                autoplayTimeout:5000,
                autoplayHoverPause:true,
                //mouseDrag:false,
                responsive:{
                    0:{
                        items:2
                    },
                    800:{
                        items:4
                    },
                    1000:{
                        items:6
                    }
                }
            });

            // Go to the pervious item
            $('.strip-carousel-wrapper .control-prev').click(function() {
                stripCarousel.trigger('prev.owl.carousel');
            });
            // Go to the next item
            $('.strip-carousel-wrapper .control-next').click(function() {
                stripCarousel.trigger('next.owl.carousel');
            });
        } 

        /* Hide notification strips*/
        $('.strip-row .close-button').on('click', function(){
            $(this).closest('.strip-row').slideUp(300);
        });

});
