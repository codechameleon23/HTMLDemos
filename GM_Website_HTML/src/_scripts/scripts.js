// Scripts.js

// Get View port width
function getViewportWidth() {
  if (window.innerWidth) {
    return window.innerWidth;
  } else if (document.body && document.body.offsetWidth) {
    return document.body.offsetWidth;
  } else {
    return 0;
  }
}

// Close Filter
function filterClose() {
  $(".jsFilterToggle").removeClass("is-active");
  $(".jsFilter").removeClass("is-open");
}
// Open Filter
function filterOpen() {
  $(".jsFilterToggle").addClass("is-active");
  $(".jsFilter").addClass("is-open");
}

// Close Navbar
function navBarClose() {
  $(".hamburger").removeClass("is-active");
  $(".jsNavbarToggle").removeClass("is-open");
  setTimeout(function () {
     $(".jsNavbarToggle").removeClass("nav-transition");
  }, 1000)
}
// Open Navbar
function navBarOpen() {
  searchBarClose();
  setTimeout(function(){
     $(".hamburger").addClass("is-active");
     $(".jsNavbarToggle").addClass("is-open");
  },225)
}
// Close Search-bar
function searchBarClose() {
  $(".search-toggle").removeClass("is-active");
  $(".jsNavbarToggle").removeClass("search-is-open");
}
// Open Search-bar
function searchBarOpen() {
  $(".search-toggle").addClass("is-active");
  $(".jsNavbarToggle").addClass("search-is-open");
}

$(document).ready(function () {

  $(".hamburger").on("click", function () {
    var jsNavbar = $(".jsNavbarToggle");
    jsNavbar.addClass("nav-transition");
    if (jsNavbar.hasClass("is-open")) {
       navBarClose();
    } else {
       navBarOpen();
    }
  });

  $('.navbar .has-dropdown').doubleTapToGo();

  $('.toggle').on('click', function(){
    var parent = $(this).closest('.has-dropdown');
    if(parent.hasClass('is-open')){
      parent.removeClass('is-open');
    
    }else{
      parent.addClass('is-open');
    }
  })

  $('.search-toggle').on('click', function(){
    if ($(this).hasClass("is-active")) {
       searchBarClose();
    } else {
       navBarClose();
       setTimeout(function(){
          searchBarOpen();
       }, 225);
    }
    });

  $('.jsFilterToggle').on('click', function(){
    if ($(this).hasClass("is-active")) {
      filterClose();
    } else {
      filterOpen();
    }
  })

  $('table.stacked').stackedRows();

  // $('.popup').popup();
  $('#jsAnnoncementPopup').popup({
    autoopen: true
  });

});