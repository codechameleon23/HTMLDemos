//  -------------------------------------------
//  iPhone page refresh on browser back button
//  -------------------------------------------
$(window).bind("pageshow", function (event) {
   if (event.originalEvent.persisted) {
     window.location.reload();
   }
 });