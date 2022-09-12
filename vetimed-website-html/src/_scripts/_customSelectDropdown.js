//  -------------------------------------------
//  Custom Select Dropdown
//  -------------------------------------------
if ($(".jsCustomSelectDropdown").length > 0) {
  $(".jsCustomSelectDropdown").each(function () {
    var $this = $(this);
    var numberOfOptions = $this.children("option").length;
    var classesList = $this
      .attr("class")
      .replace("jsCustomSelectDropdown", "custom-select-styled select");
    $this.addClass("select-hidden");
    $this.wrap('<div class="custom-select-wrapper"></div>');
    $this.after('<div class="' + classesList + '"></div>');

    var $styledSelect = $this.next("div.custom-select-styled");
    $styledSelect.text($this.children("option").eq(0).text());

    var $list = $("<ul />", {
      class: "custom-select-options",
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
      $("<li />", {
        text: $this.children("option").eq(i).text(),
        rel: $this.children("option").eq(i).val(),
      }).appendTo($list);
    }

    var $listItems = $list.children("li");

    $styledSelect.on("click", function (e) {
      e.stopPropagation();
      $("div.custom-select-styled.active")
        .not(this)
        .each(function () {
          $(this).removeClass("active").next("ul.custom-select-options").hide();
        });
      $(this).toggleClass("active").next("ul.custom-select-options").toggle();
      $(this).next("ul.custom-select-options")
        .find("li")
        .each(function () {
          $(this).removeClass("is-selected");
          if ($(this).attr("rel") === $this.val()) {
            $(this).addClass("is-selected");
          }
        });
    });

    $listItems.on("click", function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass("active");
      $this.val($(this).attr("rel"));
      $list.hide();
    });

    $(document).on("click", function () {
      $styledSelect.removeClass("active");
      $list.hide();
    });
  });
}