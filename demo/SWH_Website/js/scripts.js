function getViewportWidth(){if (window.innerWidth){return window.innerWidth;}else if (document.body && document.body.offsetWidth){return document.body.offsetWidth;}else{return 0;}}

window.onload = function(e){
    // document.getElementById("pageLoader").classList.add("is-hidden");
    var x = document.getElementsByClassName("pageLoader");

    for (i = 0; i < x.length; i++) 
    {
        x[i].className += ' is-hidden';
    }
};

$(document).ready(function(){

    /*apply fullpage*/
    $.scrollify({
        section : ".scrollify_section-js",
        interstitialSection:".header, .footer",
        scrollSpeed:700,
        easing: "easeInOutQuad",
        // scrollbars:false,
        updateHash: false,
    });



    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        
        if($('.navbar-toggle-js').hasClass('is-open')){
            /*when navbar is open*/
            $('body, html').css({
                'overflow' : ''
            });
            $.scrollify.enable();
        }else{
            /*when navbar is closed*/
            $('body, html').css({
                'overflow' : 'hidden'
            });
            $.scrollify.disable();
        }

        $(this).toggleClass("is-active");
        $('.navbar-toggle-js').toggleClass('is-open');
        
    });

    /*Banner-carousel*/
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    if($('.banner_carousel-js').length){//if element exists
        
        var bannerCarousel = $('.banner_carousel-js');

        bannerCarousel.owlCarousel({
            mouseDrag:false,
            items:1,
            loop:true,
            nav:false,
            dots: false,
            animateIn: isIE11 ? '' : '',
            animateOut: isIE11 ? '' : 'slideOutUp',
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true
        });

        // Go to the pervious item
        $('.banner_carousel-js--prev').click(function() {
            bannerCarousel.trigger('prev.owl.carousel');
        });
        // Go to the next item
        $('.banner_carousel-js--next').click(function() {
            bannerCarousel.trigger('next.owl.carousel');
        });

    }

    if ($('.ourTeam_carousel-js').length  && (getViewportWidth() > 700) ){//if element exists
        
        var ourTeamCarousel = $('.ourTeam_carousel-js');

        ourTeamCarousel.owlCarousel({
            mouseDrag:false,
            items:1,
            loop:true,
            nav:false,
            dots: false,
            animateIn: isIE11 ? '' : 'fadeIn',
            animateOut: isIE11 ? '' : 'fadeOut',
            autoplay:true,
            autoplayTimeout:7000,
            autoplayHoverPause:true
        });

        // Go to the next item
        $('.ourTeam_carousel-js--next').click(function() {
            ourTeamCarousel.trigger('next.owl.carousel');
        });

    }

    // Initialize the Popup 
    $('.popup').popup({
        beforeopen: function() {
            $('body, html').css({
                'overflow' : 'hidden'
            });
            $.scrollify.disable();
        },
        onclose: function() {
            $('body, html').css({
                'overflow' : ''
            });
            $.scrollify.enable();
        }
    });

    $('#floorPlan-popup').popup({
        scrolllock : true
    });

    // Scroll to section
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1100, 'easeOutExpo', function(){
                //window.location.hash = hash;
            });
        }
    });

  });