$(function(){
    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active");
    });
    

    /*Testimonials carousel*/
    if ($('.banner-crousel').length){//if element exists
        $('.banner-crousel').owlCarousel({
            center:true,
            items:1,
            loop:true,
            nav:false,
            autoplay:true,
            autoplayTimeout:5000,
            autoplayHoverPause:true
        });
    }

    /*Navbar*/
    if($('.nav').length){
        $('.nav li').on('click', function(){
            $('.nav li').removeClass('active');
            $(this).addClass('active');
        })
    }
    
    /*videoPopup*/
    if ($('#videoPopup').length){//if element exists
        $('#videoPopup').popup({
            outline : false
        });
    }

});