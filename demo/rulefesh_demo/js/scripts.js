$(function(){

    /* Section wise scroll*/
    $.scrollify({
        section : ".section",
        updateHash: true,
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


    /* Popup */
    $('.popup').popup({
        scrolllock : true,
        //color : '#fff',
        opacity : '.4'
    });
    /* Privacy Policy poppup*/
    $('#privacypolicy_popup').popup({});

});


function pageActive(currentSlide){
    currentSlide = $.scrollify.current();
    var pageThene = currentSlide.attr('data-theme');
    var slideFooter = currentSlide.attr('data-footer');

    $('body').attr({'data-theme':''}).attr({
        'data-theme':pageThene,
        'data-footer': slideFooter ? slideFooter : "default_footer",
    });

    $('#fullpage >  section').removeClass('active');
    currentSlide.addClass('active');
}