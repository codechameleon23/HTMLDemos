
$(function() {
  $.scrollify({
    section : ".section",
    updateHash: true,
    before:function(index, sections) {

        var pageThene = $('#fullpage >  section').eq(index).attr('data-theme');
        $('body').attr({'data-theme':''}).attr({'data-theme':pageThene});

        $('#fullpage >  section').removeClass('active');
        $('#fullpage >  section').eq(index).addClass('active');

        if(index > 0){
            $('body').addClass('not-slide_1');
        }else{
            $('body').removeClass('not-slide_1');
        }
    },
  });
});