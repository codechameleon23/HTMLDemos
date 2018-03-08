$(function(){
    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active").next('.nav').toggleClass('slideInDown animated');
    });
    

    /*Testimonials carousel*/
    if ($('.testimonials-carousel').length){//if element exists
        $('.testimonials-carousel').slick({
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        //arrows : false
                    }
                }
            ]
        });
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

    /*boxPopup*/
    if ($('#boxPopup').length){//if element exists
        $('#boxPopup').popup({});
    }
    /*signupPopup*/
    if ($('#signupPopup').length){//if element exists
        $('#signupPopup').popup({});
    }
    /*videoPopup*/
    if ($('#videoPopup').length){//if element exists
        $('#videoPopup').popup({});
    }

    if ($('#imageGallery').length){//if element exists
        $('#imageGallery').lightSlider({
            gallery:true,
            pauseOnHover:true,
            loop:true,
            auto : true,

            item:1,
            thumbItem:8,
            pause: 3000,

            galleryMargin: 15,
            thumbMargin: 15,

            easing: 'cubic-bezier(0.25, 0, 0.25, 1)',

            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        thumbItem: 5,
                        controls : false
                    }
                }
            ]
        });  
    }

});