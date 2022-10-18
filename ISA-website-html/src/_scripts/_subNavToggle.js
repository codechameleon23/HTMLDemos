
//  -------------------------------------------
//  Submenu toggle
//  -------------------------------------------
  $('.submenu-trigger, .back-button').on('click', function(e){
    var elm = $(this);
    var isBackClicked = elm.hasClass('back-button');
    var ulParent = elm.closest('ul');
    var liParent = elm.closest('li');
    if(liParent.hasClass('is-open') || isBackClicked){
      ulParent.children('li').removeClass('is-open');
    }else{
      ulParent.children('li').removeClass('is-open');
      liParent.addClass('is-open');
    }
  });