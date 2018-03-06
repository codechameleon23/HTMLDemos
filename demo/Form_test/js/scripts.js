$(function(){
    
    if($('.datetimepicker').length){
        $('.datetimepicker').datetimepicker();
    }

    if($('.tabs-carousel').length){

        var tabsCarousel = $('.tabs-carousel');
        tabsCarousel.owlCarousel({
            items:5,
            dots: false
        });
        $('.tabs-wrap .btn-prev').click(function() {
            tabsCarousel.trigger('prev.owl.carousel');
        })
        $('.tabs-wrap .btn-next').click(function() {
            tabsCarousel.trigger('next.owl.carousel');
        })


        $('.tabs-wrap .tab').on('click', function(){
            step = $(this).attr('data-step');
            formCarousel.trigger('to.owl.carousel', step)
        });

    }

   
    
    if($('.formCarousel').length){

        var formCarousel = $('.formCarousel');
        formCarousel.owlCarousel({
            items:1,
            dots: false,
            autoHeight:true
        }).on('changed.owl.carousel', function(event) {

            $('.tabs-wrap .tab').eq(event.item.index).removeClass('complete');
            //index = event.item.index - 1;
            for(i = 0; i < event.item.index; i++){
                $('.tabs-wrap .tab').eq(i).addClass('complete');
            }
        })
        $('.form-footer .btn-prev').click(function() {
            formCarousel.trigger('prev.owl.carousel');
        })
        $('.form-footer .btn-next').click(function() {
            formCarousel.trigger('next.owl.carousel');
        })
    }


    checkHoa();
    

    checkDeath()
    

    $('.death-check').click(function(){
        checkDeath();
    });
    
    $('.hoa-check').click(function(){
        checkHoa();
    });

});

function checkHoa(){
    if($('#isHoa').is(':checked')){
        $('#ifHOA').show();
    }else{
        $('#ifHOA').hide();
    }
}

function checkDeath(){
    if($('#isDate').is(':checked')){
        $('#ifDate').show();
    }else{
        $('#ifDate').hide();
    }
}


/*Add remove*/

var row = '<div class="form-group col-xs-12">'+
        '<div class="row">'+
            '<div class="col-xs-5">'+
                '<select class="form-control selectpicker">'+
                    '<option>Type</option>'+
                    '<option>option</option>'+
                    '<option>option</option>'+
                    '<option>option</option>'+
                    '<option>option</option>'+
                    '<option>option</option>'+
                '</select>'+
            '</div>'+
            '<div class="col-xs-5">'+
                '<div class="input-group">'+
                    '<input type="text" class="form-control" placeholder="Loc #" aria-describedby="">'+
                '</div>'+
            '</div>'+
            '<div class="col-xs-2">'+
                '<div class="row">'+
                    '<div class="input-group">'+
                        '<div class="input-group-btn btn-stack-group">'+
                            '<button onclick="removeRow(this);" class="btn btn-xs btn-default btn-remove" type="button"><i class="fas fa-minus"></i></button>'+
                            '<button onclick="addRow(this);" class="btn btn-xs btn-default btn-add" type="button"><i class="fas fa-plus"></i></button>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';



var row2 = '<div class="form-group col-xs-12">'+
'<div class="row">'+
    '<div class="col-xs-4">'+
        '<select class="form-control selectpicker">'+
            '<option>Type</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
        '</select>'+
    '</div>'+
    '<div class="col-xs-4">'+
        '<select class="form-control selectpicker">'+
            '<option>In Possession</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
            '<option>option</option>'+
        '</select>'+
    '</div>'+
    '<div class="col-xs-3">'+
        '<div class="input-group">'+
            '<input type="text" class="form-control" placeholder="Note" aria-describedby="">'+
        '</div>'+
    '</div>'+
    '<div class="col-xs-1">'+
        '<div class="row">'+
            '<div class="input-group">'+
                '<div class="input-group-btn btn-stack-group">'+
                '<button onclick="removeRow(this);" class="btn btn-xs btn-default btn-remove" type="button"><i class="fas fa-minus"></i></button>'+
                '<button onclick="addRow(this);" class="btn btn-xs btn-default btn-add" type="button"><i class="fas fa-plus"></i></button>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</div>'+
'</div>';

function removeRow(obj){
    $(obj).closest('.form-group').remove();
}

function addRow(obj){
    elm = $(obj).closest('.form-group');
    if($(obj).closest('.addremove-row-2').length){
        $(row2).insertAfter(elm);
        $('.selectpicker').selectpicker('refresh');
    }else{
        $(row).insertAfter(elm);
        $('.selectpicker').selectpicker('refresh');
    }
}