// alert(getViewportHeight());
// function getViewportHeight(){if (window.innerHeight){return window.innerHeight;}else if (document.body && document.body.offsetHeight){return document.body.offsetHeight;}else{return 0;}}

$(function(){


    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active");
    });

    /*Bounce one after another*/
    var bouncers = [];
    var bc = 0;
    var bc_timer;
    var bc_interval = 4500;//Start time
    
    $('.bouncer').each(function(){
        bouncers.push($(this));
    });

    bcFirsttime();
    function bcFirsttime(){
        toggleBounce();
        bounceOnebyOne();
    }
    
    function bounceOnebyOne() {
        bc_timer = setInterval(function(){    
            toggleBounce();
        }, bc_interval);
    }

    function toggleBounce(){
        $('.bouncer').removeClass('animated bounceIt');
        $(bouncers[bc]).addClass('animated bounceIt');
        
        if(bc < bouncers.length - 1){
            bc++;
        }else{
            bc = 0;
        }
    }
    
    /*Shake one after another*/
    var shakers = [];
    var sc = 0;
    var sc_timer;
    var sc_interval = 5600;//Start time

    $('.shaker').each(function(){
        shakers.push($(this));
    });
    
    scFirsttime();
    function scFirsttime(){
        toggleShake();
        shakeOnebyOne();
    }
    
    function shakeOnebyOne() {
        sc_timer = setInterval(function(){
            toggleShake()
        }, sc_interval);
    }

    function toggleShake(){
        $('.shaker').removeClass('animated shakeIt');
        $(shakers[sc]).addClass('animated shakeIt');
    
        if(sc < shakers.length - 1){
            sc++;
        }else{
            sc = 0;
        }
    }
    
    /*Pulse one after another*/
    var pulsers = [];
    var pc = 0;
    var pc_timer;
    var pc_interval = 3700;//Start time

    $('.pulser').each(function(){
        pulsers.push($(this));
    });

    pcFirsttime();
    function pcFirsttime(){
        togglePulse();
        pulseOnebyOne();
    }

    function pulseOnebyOne() {
        pc_timer = setInterval(function(){
            togglePulse()
        }, pc_interval);
    }

    function togglePulse(){
        $('.pulser').removeClass('animated pulseIt');

        setTimeout(function(){
            $(pulsers[pc]).addClass('animated pulseIt');            
        }, 500)

        if(pc < pulsers.length - 1){
            pc++;
        }else{
            pc = 0;
        }
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
                clearInterval(bc_timer);
                clearInterval(sc_timer);
                clearInterval(pc_timer);
            }else{
                $('body').removeClass('not-slide_1');
                bounceOnebyOne();
                shakeOnebyOne();
                pulseOnebyOne();
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
    $('#privacynotice_popup').popup({
        onopen: function() {  
            var content =$('#privacynotice_popup').find('.popup-body').attr('data-content')
            $('#privacynotice_popup').find('.popup-body').load(content);
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



/*Submit contact us form*/
(function ($) {
    'use strict';

    var form = $('.contact__form'),
        message = $('.contact__msg'),
        form_data;

    // Success function
    function done_func(response) {
        alert('success');
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
        form.find('input:not([type="submit"]), textarea').val('');
    }

    // fail function
    function fail_func(data) {
        alert('fail');
        message.fadeIn().removeClass('alert-success').addClass('alert-success');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
    }
    
    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: form_data
        })
        .done(done_func)
        .fail(fail_func);
    });
    
})(jQuery);