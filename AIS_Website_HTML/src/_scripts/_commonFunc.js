//  ~~~~~~~~~~~~~~ Scripts starts ~~~~~~~~~~~~~~

//  -------------------------------------------
//  Check if IE
//  -------------------------------------------
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
var isIE10 = navigator.userAgent.match(/MSIE 10/i);
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
//  -------------------------------------------
//  Empty Select
//  -------------------------------------------
$("select").on("change", function () {
  if ($(this).val()) {
    $(this).removeClass("not-selected");
  } else {
    $(this).addClass("not-selected");
  }
});

//  -------------------------------------------
//  Custom File input
//  -------------------------------------------
var inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
    labelVal = label.innerHTML;
  input.addEventListener("change", function (e) {
    var fileName = "";
    if (this.files && this.files.length > 1) {
      fileName = (this.getAttribute("data-multiple-caption") || "").replace(
        "{count}",
        this.files.length
      );
    } else {
      fileName = e.target.value.replace(/^.*[\\\/]/, "");
    }

    if (fileName) {
      console.log('fileName', fileName);
      label.querySelector("span").innerHTML = fileName;
    } else {
      label.innerHTML = labelVal;
    }
  });
});
