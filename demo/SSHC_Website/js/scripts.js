$(function(){
    /*Navbar toggle*/
    $(".hamburger").on('click tap',  function(){
        $(this).toggleClass("is-active");
    });

    /*Accordion toggle*/
    $(".accordian-toggle").on('click tap',  function(){
        $(this).toggleClass("open");
    });

    /*Submenu toggle*/
    $(".submenu-toggle").on('click tap',  function(){
        $(this).toggleClass("open");
    });

    /*Sider toggle*/
    $(".sider-toggle").on('click tap',  function(){

        if($(this).closest('.sider').hasClass('open')){
            $('.sider').removeClass('open');
        }else{
            $('.sider').removeClass('open');
            $(this).closest('.sider').addClass("open");    
        }
    });


});