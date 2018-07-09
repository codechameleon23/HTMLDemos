$(function(){

    /* Section wise scroll*/
    $.scrollify({
        section : ".section",
        updateHash: true,
        easing: "easeOutExpo",
        
        before:function(index) {
    
            pageActive( $.scrollify.current() );
    
            if(index > 0){
                $('body').addClass('not-slide_1');
            }else{
                $('body').removeClass('not-slide_1');
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
        onopen: function() {
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
    var pageThene = currentSlide.attr('data-theme');
    var slideFooter = currentSlide.attr('data-footer');

    $('body').attr({'data-theme':''}).attr({
        'data-theme': pageThene ? pageThene : '',
        'data-footer': slideFooter ? slideFooter : "default_footer",
        'data-nav': navactive ? navactive : ''
    });

    $('.navbar li').removeClass('text_highlight');
    $('.navbar li.'+navactive).addClass('text_highlight');

    $('#fullpage >  section').removeClass('active');
    currentSlide.addClass('active');
}