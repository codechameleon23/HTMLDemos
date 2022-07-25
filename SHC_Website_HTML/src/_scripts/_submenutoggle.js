//  -------------------------------------------
// Submenu toggle : Mobile
//  -------------------------------------------
  $('.navbar > ul li .submenuOpen, .submenuBack').on('click', function (e) {
    if (getViewportWidth() < 13000) {
      e.stopPropagation();
      var elm = $(this);
      var ulParent = elm.closest('ul');
      var liParent = elm.closest('li');
      if (!liParent.hasClass('this-open') && !elm.hasClass('submenuBack') && liParent.find('.dropdown')) {
        liParent.addClass('this-open');
        ulParent.addClass('is-open');
      } else {
        if (elm.hasClass('submenuBack')) {
          ulParent = elm.closest('.this-open').closest('ul');
          ulParent.find('li').removeClass('this-open');
          ulParent.removeClass('is-open');
        }
      }
    }
  });