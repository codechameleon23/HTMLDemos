function getViewportWidth() { //Get View port width
    if (window.innerWidth) {
        return window.innerWidth;
    } else if (document.body && document.body.offsetWidth) {
        return document.body.offsetWidth;
    } else {
        return 0;
    }
}

$(document).ready(function () {
    $('.popup').popup({ // Initialize the Popup 
        scrolllock: true,
        beforeopen: function () {
            $.scrollify.disable();
        },
        onclose: function () {
            setTimeout(function () {
                $.scrollify.enable();
            }, 700);
        }
    });

    // $('#navbarOverlay').popup({//Initialize NavarOverlay popup
    //     opacity:0,
    //     onclose: function () {
    //         navBarClose();
    //     }
    // });

    $(".hamburger").on('click', function () { //Navbar toggle
        if ($('.navbar-toggle-js').hasClass('is-open')) {
            navBarClose();
        } else {
            navBarOpen();
        }
    });

    function navBarClose() { //Close Navbar
        $(".hamburger").removeClass("is-active");
        $('.navbar-toggle-js').removeClass('is-open');
        // $('#navbarOverlay').popup('hide');
        $.scrollify.enable();
    }

    function navBarOpen() { //Open Navbar
        $(".hamburger").addClass("is-active");
        $('.navbar-toggle-js').addClass('is-open');
        // $('#navbarOverlay').popup('show');
        $.scrollify.disable();
    }

    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if ($('.banner_carousel-js').length) { //if element exists
        var bannerCarousel = $('.banner_carousel-js'); //Banner-carousel for Property-details page
        bannerCarousel.owlCarousel({
            items: 1,
            rtl: true,
            loop: true,
            mouseDrag: false,
            nav: false,
            dots: false,
            animateIn: isIE11 ? '' : '',
            animateOut: isIE11 ? '' : '',
            smartSpeed: 1500,
            autoplay: true,
            autoplayTimeout: 7000,
            autoplayHoverPause: true
        });

        $('.banner_carousel-js--prev').click(function () { // Go to pervious item
            bannerCarousel.trigger('prev.owl.carousel');
        });
        $('.banner_carousel-js--next').click(function () { // Go to next item
            bannerCarousel.trigger('next.owl.carousel');
        });

    }

    if ($('.ourTeam_carousel-js').length && (getViewportWidth() > 700)) { //if element exists
        var ourTeamCarousel = $('.ourTeam_carousel-js'); //Our Team carousel above Mobile
        ourTeamCarousel.owlCarousel({
            mouseDrag: false,
            items: 1,
            loop: true,
            nav: false,
            dots: false,
            animateIn: isIE11 ? '' : 'fadeIn',
            animateOut: isIE11 ? '' : 'fadeOut',
            smartSpeed: 450,
            // autoplay:true,
            // autoplayTimeout:7000,
            // autoplayHoverPause:true
        });

        $('.ourTeam_carousel-js--next').click(function () { //Go to the next item
            ourTeamCarousel.trigger('next.owl.carousel');
        });

    }

    $.scrollify({ //apply fullpage
        section: ".scrollify_section-js",
        interstitialSection: ".header, .footer",
        scrollSpeed: 700,
        easing: "easeInOutQuad",
        updateHash: false,
        touchScroll: false
    });

    $("a").on('click', function (event) { //Scroll to section
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1100, 'easeInOutQuad', function () {
                //window.location.hash = hash;
            });
        }
    });

});