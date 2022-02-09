//  -------------------------------------------
//  Custom Select Dropdown
//  -------------------------------------------
if ($(".jsCustomSelectDropdown").length > 0) {
  $(".jsCustomSelectDropdown").each(function () {
    var $this = $(this);
      numberOfOptions = $this.children("option").length;
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

//  -------------------------------------------
//  Custom Nume inout
//  -------------------------------------------

if ($(".jsCustomNumberInput").length > 0) {
    $(".jsCustomNumberInput").each(function () {
      var numInputElm = $(this);
      numInputElm.addClass('custom-number').append(
        '<div class="quantity-nav">'+
            '<div class="quantity-button quantity-up icon">'+
                '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">'+
                    '<path d="m396.6 352 19.4-20.7L256 160 96 331.3l19.3 20.7L256 201.5z"/>'+
                '</svg>'+
            '</div>'+
            '<div class="quantity-button quantity-down icon">'+
                '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 512 512">'+
                    '<path d="m396.6 160 19.4 20.7L256 352 96 180.7l19.3-20.7L256 310.5z"/>'+
                '</svg>'+
            '</div>'+
        '</div>'
      );
      var spinner = numInputElm,
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find(".quantity-up"),
        btnDown = spinner.find(".quantity-down"),
        min = input.attr("min"),
        max = input.attr("max");
  
      btnUp.click(function () {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });
  
      btnDown.click(function () {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
      });
    });
  }
  