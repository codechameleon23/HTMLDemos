
//  -------------------------------------------
//  Shoe Attached file name
//  -------------------------------------------
  if($(".fileInput").length > 0){
    $(".fileInput").change(function() {
      var fileInput = $(this);
      var parent = fileInput.closest(".fileGroup");
      var fileName = fileInput[0].files[0].name;
      parent.find(".removeFile .fileName").text(fileName);
      parent.addClass("attached");
    });
  }
  if($(".removeFile").length > 0){
    $(".removeFile").on("click", function() {
      var removeFile = $(this);
      var parent = removeFile.closest(".fileGroup");
      var fileInput = parent.find(".fileInput");
      fileInput.val("");
      removeFile.find(".fileName").text("");
      parent.removeClass("attached");
    });
  }
//  -------------------------------------------
//  Set active on scroll
//  -------------------------------------------
//   var mainNavLinks = document.querySelectorAll("nav ul li a");
//   var mainSections = document.querySelectorAll("main section");
//
//   var lastId;
//   var cur = [];
//   window.addEventListener("scroll", function (event) {
//     var fromTop = window.scrollY + 10;
//     Array.prototype.slice.call(mainNavLinks).forEach(function (link) {
//       var section = document.querySelector(link.hash);
//
//       if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
//         link.classList.add("current");
//       } else {
//         link.classList.remove("current");
//       }
//     });
//   });