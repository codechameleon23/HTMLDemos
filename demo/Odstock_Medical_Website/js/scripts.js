$(function(){

    /*Go to top hide-show*/
    window.onscroll = function() {scrollFunction()};

    function scrollFunction() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            $('.goTotop').addClass('show');
        } else {
            $('.goTotop').removeClass('show');
        }
    }

    $('.goTotop').on('click tap', function(){
        $('html, body').animate({
            scrollTop: 0
        }, 700);
    });


    

    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active");
    });
    
    /*Navbar*/
    $( '.nav li.has_menu' ).doubleTapToGo();
    // if($('.nav').length){
    //     $('.nav li').on('click', function(){
    //         $('.nav li').removeClass('open');
    //         $(this).addClass('open');
    //     });
    // }

    /*Product Rollover*/
    $( '.product' ).doubleTapToGo();
    
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
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true
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
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true
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




    /*Course details Input focus if Other is checked*/
    $(".radio-list input[name=title]:radio").change(function () {

        if(($(this).is(':checked')) && ($(this).val() == "specify_if_other")){
            setTimeout(function(){
                $('#specify').addClass('focus').focus();
            }, 200);
        }else{
            $('#specify').blur().removeClass('focus');
        }

    }).change();




    /*Accordion Toggle : Open one at a time */
    if ($('.accordion-wrapper').length){//if element exists
        $('.accordion-wrapper input[name="accordion"]').change(function(){
            var obj = $(this);
            $('.accordion-wrapper').find('input[name="accordion"]').not(obj).prop('checked', false);;
        });
    }




    /*Video popup*/
    if ($('.popup-video').length){//if element exists
        $('.popup-video').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        });
    };
    
    /*Video gallery popup*/
    if ($('.popup-video_gallery').length){//if element exists

        $('.popup-video_gallery').magnificPopup({
            type: 'iframe',
            gallery:{
                enabled:true
            },
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,

            fixedContentPos: false
        })
    };
    
    /*Product image gallery popup*/
    if ($('.popup-image_gallery').length){//if element exists

        $('.popup-image_gallery').magnificPopup({

            type: 'image',
            gallery:{
                enabled:true
            },
            mainClass: 'mfp-with-zoom', // this class is for CSS animation below
            zoom: {
                enabled: true, // By default it's false, so don't forget to enable it

                duration: 300, // duration of the effect, in milliseconds
                easing: 'ease-in-out', // CSS transition easing function

                // The "opener" function should return the element from which popup will be zoomed in
                // and to which popup will be scaled down
                // By defailt it looks for an image tag:
                opener: function(openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        })
    };

});