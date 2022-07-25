//  -------------------------------------------
//  Submenu Dropdown
//  -------------------------------------------
$(document).ready(function () {
  $('.navbar > ul li > .toggle').on('click', function(e){
    if(getViewportWidth() < 992){
      e.stopPropagation();
      var elm = $(this);
      var liParent = elm.closest('li');
      if(!liParent.hasClass('is-open') && liParent.find('.dropdown')){
        liParent.addClass('is-open');
      }else{
        liParent.removeClass('is-open');
      }
    }
  });
});