//  -------------------------------------------
//  Simple tabs with Select dropdown
//  -------------------------------------------
if ($(".tabs-collection").length > 0) {
  var tabCollections = $(".tabs-collection");
  tabCollections.each(function () {
    var tabCollection = $(this);
    var tabTriggers = tabCollection.find(".tab");
    var tabTargetAll = tabCollection.find("[data-tab]");
    tabTriggers.on("click", function () {
      if (getViewportWidth() < 711 && $(this).hasClass("active")) {
        tabTargetAll.removeClass("active");
      } else {
        tabTargetAll.removeClass("active");
        tabCollections
          .find('[data-tab="' + $(this).data("tab") + '"]')
          .addClass("active");
      }
    });
    $(window).on("resize", function () {
      if (
        getViewportWidth() > 711 &&
        tabCollection.find(".active[data-tab]").length === 0
      ) {
        tabTriggers.eq(0).click();
      }
    });
  });
}
