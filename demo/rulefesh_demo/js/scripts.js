$(function(){

    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active");
    });

    /*Hero animation one after another*/
    var bouncers = [];
    
    $('.bouncer').each(function(){
        bouncers.push($(this));
    });

    c = 0;
    var timer;
    
    bounceOnebyOne();

    function bounceOnebyOne() {
        timer = setInterval(function(){
            //console.log(c);
            $('.bouncer').removeClass('animated bounceIt');
            $(bouncers[c]).addClass('animated bounceIt');
            
            if(c < bouncers.length - 1){
                c++;
            }else{
                c = 0;
            }

        }, 4100);
    }

    /* Section wise scroll*/
    $.scrollify({
        section : ".section",
        updateHash: true,
        scrollSpeed:1100,
        easing: "easeOutExpo",
        
        before:function(index) {
    
            pageActive( $.scrollify.current() );
    
            if(index > 0){
                $('body').addClass('not-slide_1');
                clearInterval(timer);
            }else{
                $('body').removeClass('not-slide_1');
                bounceOnebyOne();
            }
        },
        afterRender:function() {
            pageActive( $.scrollify.current() );
        }
    });

    /*Got to slide*/
    $('.goto_button').on('click', function(){
        slideName = $(this).attr('href');
        $.scrollify.instantMove(slideName);
    });
    /*Next slide*/
    $('.next_button').on('click', function(){
        $.scrollify.next();
    });
    /*Prev slide*/
    $('.prev_button').on('click', function(){
        $.scrollify.previous();
    });


    /* Popup */
    $('.popup').popup({
        scrolllock : true,
        opacity : '.4',
        beforeopen: function() {
            $.scrollify.disable();
        },
        onclose: function() {
            $.scrollify.enable();
        }

    });
    /* Privacy Policy poppup*/
    $('#privacypolicy_popup').popup({
        onopen: function() {  
            var content =$('#privacypolicy_popup').find('.popup-body').attr('data-content')
            $('#privacypolicy_popup').find('.popup-body').load(content);
        }
    });

});


function pageActive(currentSlide){
    currentSlide = $.scrollify.current();
    var navactive = currentSlide.attr('data-nav');
    var sectionName = currentSlide.attr('data-section-name');
    var pageThene = currentSlide.attr('data-theme');
    var slideFooter = currentSlide.attr('data-footer');

    $('body').attr({'data-theme':''}).attr({
        'data-theme': pageThene ? pageThene : '',
        'data-footer': slideFooter ? slideFooter : "default_footer",
        'data-nav': navactive ? navactive : '',
        'data-section-name': sectionName ? sectionName : ''
    });

    $('.navbar li').removeClass('text_highlight');
    $('.navbar li.'+navactive).addClass('text_highlight');

    $('#fullpage >  section').removeClass('active');
    currentSlide.addClass('active');
}
