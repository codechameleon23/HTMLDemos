$(function(){
    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active").next('.nav').toggleClass('slideInDown animated');
    });

    /*Banner carousel*/
    if ($('.banner-carousel').length){//if element exists

        $('.banner-carousel').slick({
            autoplay: true,
            //fade: true,
            cssEase: 'ease-in-out',
            speed: 2500,
            autoplaySpeed: 5000,
        })
    }
    

    /*Instagram pics carousel*/
    if ($('.pics-carousel').length){//if element exists
        $('.pics-carousel').slick({
            infinite: true,
            slidesToShow: 7,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 2000,
            draggable : false,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 7,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 5,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 3,
                    }
                }
            ]
        });
    }    

    /*Popup*/
    if ($('#signUp_popup').length){//if element exists
        $('#signUp_popup').popup({});
    }
    /*fancybox*/
    $().fancybox({
        hash : false,
        idleTime: false,
        selector : '.show-in-popup',//apply fancybox to thumbs with filter class only
        baseClass : 'fancybox-custom-layout',
        margin    : 0,
        gutter    : 0,
        infobar   : false,
        animationEffect   : "fade",
        animationDuration : 300,
        // What buttons should appear in the top right corner.
        // Buttons will be created using templates from `btnTpl` option
        // and they will be placed into toolbar (class="fancybox-toolbar"` element)
        buttons : [
            'close'
        ],
        onInit : function( instance ) {
            // Create new wrapping element, it is useful for styling
            // and makes easier to position thumbnails
            instance.$refs.inner.wrap( '<div class="fancybox-outer"></div>' );
        },
        caption : function(instance, item) {

            var caption = $(this).closest('.fancy-parent').find('.fancy-caption').html();    
            return caption;
        },
        // Base template for layout
        baseTpl	:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
                '<div class="fancybox-bg"></div>' +
                '<div class="fancybox-inner">' +
                    '<div class="fancybox-navigation">{{arrows}}</div>' +
                    '<div class="fancybox-stage-ratio"><div class="fancybox-stage"></div></div>' +
                    '<div class="fancybox-toolbar">{{buttons}}</div>'+
                    '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
                '</div>' +
            '</div>',
        btnTpl : {
            // Arrows
            arrowLeft : '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"></button>',

            arrowRight : '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"></button>',

            close : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',
        }
    });
});