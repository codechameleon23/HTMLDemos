//  -------------------------------------------
//  Accordion
//  -------------------------------------------
  function getQueryString() {
    var key = false,
      res = {},
      itm = null;
    // get the query string without the ?
    var qs = location.search.substring(1);
    // check for the key as an argument
    if (arguments.length > 0 && arguments[0].length > 1)
      key = arguments[0];
    // make a regex pattern to grab key/value
    var pattern = /([^&=]+)=([^&]*)/g;
    // loop the items in the query string, either
    // find a match to the argument, or build an object
    // with key/value pairs
    while (itm = pattern.exec(qs)) {
      if (key !== false && decodeURIComponent(itm[1]) === key)
        return decodeURIComponent(itm[2]);
      else if (key === false)
        res[decodeURIComponent(itm[1])] = decodeURIComponent(itm[2]);
    }

    return key === false ? res : null;
  }

  function setUrl(step) {
    var stepNo = step.split('_')[1];
    var attr = step.split('_')[0];
    history.pushState({}, '', '?' + attr + '=' + stepNo);
  }

  var url_string = new URL(window.location.href);
  var url_obj = getQueryString();

  $('.accordion-wrapper').each(function () {
    var item = $(this);
    var tagetAccordions = item.children('.toggle-tabs, .toggle-content').children('.accordion');

    var tagetAccordionsToggles = tagetAccordions.children('.accordion-toggle');
    var attr = tagetAccordionsToggles.attr('data-filterby');
    var gotToBtn = item.find('[data-goto]');

    var togglable = item.data('togglable');
    var closeOthers = item.data('close-others');
    var seturl = item.data('seturl');

    var tabNo = attr.split('_')[1];
    var attrname = attr.split('_')[0];

    var paramVal = url_obj[attrname];

    if (seturl && paramVal) {
      var tabNo = paramVal;
      var elmAttr = attrname + '_' + tabNo;

      tagetAccordions.removeClass('is-open');
      defaultTargetTab = item.find('[data-filterby="' + elmAttr + '"]').closest('.accordion');
      defaultTargetTab.addClass("is-open");
    }

    tagetAccordionsToggles.on('click tap', function () {
      var elm = $(this);
      var elmAttr = elm.attr('data-filterby');
      var targetTab = item.find('[data-filterby="' + elmAttr + '"]').closest('.accordion');

      if (togglable && targetTab.hasClass("is-open")) {
        tagetAccordions.removeClass('is-open');
        targetTab.removeClass("is-open");
      } else {
        if (closeOthers) {
          tagetAccordions.removeClass('is-open');
        }
        targetTab.addClass("is-open");
        seturl && setUrl(elmAttr);
      }

      if (getViewportWidth() < 991) {
        setTimeout(function () {
          var targetTabOffset = targetTab.last().offset().top;
          $("html, body").animate({
            scrollTop: targetTabOffset
          }, 'slow');
        }, 200)
      }

    })

    gotToBtn.on('click tap', function () {
      var elm = $(this);
      var elmAttr = elm.attr('data-goto');
      item.find('[data-filterby="' + elmAttr + '"]').trigger('click');
    })

  });