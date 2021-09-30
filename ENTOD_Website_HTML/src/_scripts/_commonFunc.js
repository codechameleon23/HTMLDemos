
//  ~~~~~~~~~~~~~~ Scripts starts ~~~~~~~~~~~~~~

//  -------------------------------------------
//  Check if IE
//  -------------------------------------------
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var isIE10 = (navigator.userAgent.match(/MSIE 10/i));
//  -------------------------------------------
//  Get View port width
//  -------------------------------------------
function getViewportWidth() {
  if (window.innerWidth) {
    return window.innerWidth;
  } else if (document.body && document.body.offsetWidth) {
    return document.body.offsetWidth;
  } else {
    return 0;
  }
}

function hideCaption(obj){
  var parent = $(obj).closest('.mfp-content');
  var isClose = parent.hasClass('caption-close');
  if(isClose) {
    parent.removeClass('caption-close');
  } else {
    parent.addClass('caption-close');
  }
}