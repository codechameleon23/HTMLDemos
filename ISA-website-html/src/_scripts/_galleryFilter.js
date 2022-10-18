//  -------------------------------------------
//  Gallery Filter
//  -------------------------------------------
  var activeClass = "is-active";
  if ($('.filter_parent').length) { //if element exists
    $('.filter_tab').on('click', function () {

      $filter_parent = $(this).closest('.filter_parent');
      $filterBy = $(this).attr('data-filterby');
      if ($(this).hasClass(activeClass)) {
        // $('.filter_tab').removeClass(activeClass); //single select at a time
        // $(this).removeClass(activeClass);
        // filtered($filter_parent);
      } else {
        $('.filter_tab').removeClass(activeClass); //single select at a time
        $(this).addClass(activeClass);
        if ($('.filter_dropdown').val() !== $filterBy) {
          $('.filter_dropdown').val($filterBy)
        }
        filtered($filter_parent);
      }
    });
    $('.filter_dropdown').change(function () {
      // document.getElementsByClassName('filter_parent').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
      $('.filter_tab[data-filterby=' + $(this).val() + ']').trigger('click');
    });
  };

  //filter function
  function filtered(fp) {
    if (fp && fp.find('.filter_tab.is-active').length) {
      fp.find('.filter_obj').removeClass('filtered');
      filterBy = [];
      fp.find('.filter_tab.is-active').each(function () {
        filterBy.push($(this).attr('data-filterby'));
      });
      for (i = 0; i < filterBy.length; i++) {
        $.each(fp.find('.filter_obj.' + filterBy[i]), function (i, el) {
          setTimeout(function () {
            $(el).addClass('filtered');
          }, 0 + (i * 100));
        });
      }
    } else {
      $('.filter_obj').addClass('filtered');
    }
  }