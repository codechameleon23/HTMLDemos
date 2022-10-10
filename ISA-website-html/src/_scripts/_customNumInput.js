//  -------------------------------------------
//  Custom Num input
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
  