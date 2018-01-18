$(function(){
    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active").next('.nav').toggleClass('slideInDown animated');
    });
});
