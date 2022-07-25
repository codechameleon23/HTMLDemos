//  -------------------------------------------
// Toggle search bar
//  -------------------------------------------
  // Close
  function searchBarClose() {
    $(".search-toggle").removeClass("is-active");
    $(".jsNavbarToggle").removeClass("search-is-open");
  }
  // Open
  function searchBarOpen() {
    $(".search-toggle").addClass("is-active");
    $(".jsNavbarToggle").addClass("search-is-open");
  }

  $('.search-toggle').on('click', function () {
    if ($(this).hasClass("is-active")) {
      searchBarClose();
    } else {
      navBarClose();
      setTimeout(function () {
        searchBarOpen();
      }, 225);
    }
  });