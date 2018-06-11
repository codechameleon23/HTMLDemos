/*Navbar toggle*/
$(".navToggle .icon").on('click',  function(){
    $(this).toggleClass("is-active").closest('.navigation').toggleClass("is-open");
});


/*Hero Scroll to*/
// Add smooth scrolling to all links
$(".go-down").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;
        $('html, body').animate({scrollTop: $(hash).offset().top}, 800, function(){
            // Add hash (#) to URL when done scrolling (default click behavior)
            //window.location.hash = hash;
        });
    } // End if
});


$(".button-icon .icon").on('click', function(){
    if($(this).closest('.button-icon').hasClass('is-hover')){
        $(".button-icon").removeClass('is-hover');    
    }else{
        $(".button-icon").removeClass('is-hover');    
        $(this).closest('.button-icon').toggleClass('is-hover');
    }
});

$(".button-icon input").focus(function(){
    $(this).closest(".button-icon").addClass('is-hover');
}).blur(function(){
    $(this).closest(".button-icon").removeClass('is-hover');
})


document.addEventListener('DOMContentLoaded', function () {
// Prepare BackgroundCheck
    BackgroundCheck.init({
        targets: '.header',
        images: '.banner-bg'
    });
});

/*banner-carousel*/

var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

if ($('.banner-carousel').length){//if element exists
    
    var bannerCarousel = $('.banner-carousel');

    bannerCarousel.owlCarousel({
        mouseDrag:false,
        items:1,
        loop:true,
        nav:false,
        dots:false,
        animateIn: isIE11 ? '' : 'slideInUp',
        animateOut: isIE11 ? '' : 'slideOutUp',
        autoplay:true,
        autoplayTimeout:7000,
        autoplayHoverPause:true,
        dotsContainer: '.dots'
    });

    $('.dots .dot').click(function () {
        bannerCarousel.trigger('to.owl.carousel', [ $(this).index() , 300]);
    });

    bannerCarousel.on('changed.owl.carousel', function(event) {

        //current will now return current slide #
        var current = (event.item.index + 1) - event.relatedTarget._clones.length / 2;
        var allItems = event.item.count;
        if (current > allItems || current == 0) {
            current = allItems - (current % allItems);
        }
        
        $('.dots .dot').removeClass('is-active');
        $('.dots .dot').eq(current - 1).addClass('is-active');

        /*function to change logo on first banner*/
        // if(current == 1){
        //     $('.header').addClass('has-logo-dark');
        // }else{
        //     $('.header').removeClass('has-logo-dark');
        // }

        setTimeout(function(){
            BackgroundCheck.refresh();
        }, 1200);

    })

}

var windowW = $(window).width();

if ($('.staff-carousel').length){//if element exists
    
    var newsCarousel = $('.staff-carousel');

    newsCarousel.owlCarousel({
        mouseDrag:false,
        items:1,
        loop:true,
        nav:false,
        dots: false,
        animateIn: (isIE11 || (windowW < 767) ) ? 'fadeInRight' : 'fadeIn',
        animateOut: (isIE11 || (windowW < 767) ) ? 'fadeOutLeft' : 'fadeOut',
        autoplay:false,
        autoplayTimeout:3000,
        autoplayHoverPause:true
    });

    // Go to the pervious item
    $('.carousel-wrapper .control-prev').click(function() {
        $(this).closest('.carousel-wrapper').find(newsCarousel).trigger('prev.owl.carousel');
    });
    // Go to the next item
    $('.carousel-wrapper .control-next').click(function() {
        $(this).closest('.carousel-wrapper').find(newsCarousel).trigger('next.owl.carousel');
    });

}


/*Video Player*/
$(document).on('click','.js-videoPoster',function(e) {
    e.preventDefault();
    var poster = $(this);
    var wrapper = poster.closest('.js-videoWrapper');
    videoPlay(wrapper);
});

function videoPlay(wrapper) {
    var iframe = wrapper.find('.js-videoIframe');
    var src = iframe.data('src');
    wrapper.addClass('videoWrapperActive');
    iframe.attr('src',src);
}


/*category_tabs*/
if($('.tabs-contnet-group').length){//if element exists
    $('.tabs-contnet-group .tab').on('click', function(){
        id = $(this).attr('data-tab');

        parent = $(this).closest('.tabs-contnet-group');

        parent.find('.tab, .tab-content').removeClass('is-active');
        parent.find('*[data-tab="'+id+'"]').addClass('is-active');
        
    })
}

/*Accordion toggle*/
$(".accordian-toggle").on('click tap',  function(){
    $(this).toggleClass("is-open");
});


/*Custom select drop down*/
$('.select').SumoSelect({
    csvDispCount: 2,
    floatWidth: 100
});

/*Date range picker*/
$('input[name="dates"]').daterangepicker({
    opens: 'left',
    locale: {
        format: 'DD/MM/YY'
      }
}).val('Date Range')


/*imageGallery*/
window.onload = function() {

    if ($('#imageGallery').length){//if element exists
        $('#imageGallery').lightSlider({
            gallery:true,
            pauseOnHover:true,
            loop:true,
            enableDrag : false,
            freeMove: false,
            //auto : true,

            item:1,
            thumbItem:8,
            pause: 3000,

            galleryMargin: 17,
            thumbMargin: 17,

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

};


/*Affiliate Membership Application form*/
if ($('.forms-carousel-affiliate').length){//if element exists

    formowl_affiliate = $('.forms-carousel-affiliate');

    formowl_affiliate.owlCarousel({
        margin:0,
        nav:false,
        dots:false,
        items:1,
        autoHeight:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag:false,
        freeDrag:false,
        animateIn: 'fadeInUp',
        animateOut: 'fadeOutUp',
    });

    $('.forms-carousel-affiliate .carousel-prev').click(function() {

        formowl_affiliate.trigger('prev.owl.carousel');
    });
    $('.forms-carousel-affiliate .carousel-next').click(function() {
        formowl_affiliate.trigger('next.owl.carousel');
    });

}

/*individual Membership Application form*/
if ($('.forms-carousel-individual').length){//if element exists

    formowl_individual = $('.forms-carousel-individual');

    formowl_individual.owlCarousel({
        margin:0,
        nav:false,
        dots:false,
        items:1,
        autoHeight:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag:false,
        freeDrag:false,
        animateIn: 'fadeInUp',
        animateOut: 'fadeOutUp',
    });

    $('.forms-carousel-individual .carousel-prev').click(function() {

        formowl_individual.trigger('prev.owl.carousel');
    });
    $('.forms-carousel-individual .carousel-next').click(function() {
        formowl_individual.trigger('next.owl.carousel');
    });

}


/*student Membership Application form*/
if ($('.forms-carousel-student').length){//if element exists

    formowl_student = $('.forms-carousel-student');

    formowl_student.owlCarousel({
        margin:0,
        nav:false,
        dots:false,
        items:1,
        autoHeight:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag:false,
        freeDrag:false,
        animateIn: 'fadeInUp',
        animateOut: 'fadeOutUp',
    });

    $('.forms-carousel-student .carousel-prev').click(function() {

        formowl_student.trigger('prev.owl.carousel');
    });
    $('.forms-carousel-student .carousel-next').click(function() {
        formowl_student.trigger('next.owl.carousel');
    });

}

/*friends Membership Application form*/
if ($('.forms-carousel-friends').length){//if element exists

    formowl_friends = $('.forms-carousel-friends');

    formowl_friends.owlCarousel({
        margin:0,
        nav:false,
        dots:false,
        items:1,
        autoHeight:true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag:false,
        freeDrag:false,
        animateIn: 'fadeInUp',
        animateOut: 'fadeOutUp',
    });

    $('.forms-carousel-friends .carousel-prev').click(function() {
        formowl_friends.trigger('prev.owl.carousel');
    });
    $('.forms-carousel-friends .carousel-next').click(function() {
        formowl_friends.trigger('next.owl.carousel');
    });

}