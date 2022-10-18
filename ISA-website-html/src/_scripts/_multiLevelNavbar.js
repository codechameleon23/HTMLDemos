//  -------------------------------------------
//  Submenu Dropdown
//  -------------------------------------------
$(document).ready(function () {
  // toggle submenu 
  $('.navbar .nav-link-toogle').on('click', function(e){
    var elm = $(this);
    var liParent = elm.closest('li');
    if(!liParent.hasClass('is-open') && liParent.find('.dropdown')){
      liParent.addClass('is-open');
      $('body').addClass('menu-open');
    }else{
      liParent.removeClass('is-open');
      $('body').removeClass('menu-open');
    }
  });
  $('.navbar .go-back').on('click', function(e){
    var elm = $(this);
    var liParent = elm.closest('li.is-open');
    liParent.removeClass('is-open');
    $('body').removeClass('menu-open');
  });
});