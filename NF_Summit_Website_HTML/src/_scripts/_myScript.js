
//  -------------------------------------------
//  Set active on scroll
//  -------------------------------------------
  var mainNavLinks = document.querySelectorAll("nav ul li a");
  var mainSections = document.querySelectorAll("main section");

  var lastId;
  var cur = [];
  window.addEventListener("scroll", function (event) {
    var fromTop = window.scrollY + 10;
    Array.prototype.slice.call(mainNavLinks).forEach(function (link) {
      if(link.hash){
        var section = document.querySelector(link.hash);
        if(section){
          if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add("current");
          } else {
            link.classList.remove("current");
          }
        }
      }
    });
  });