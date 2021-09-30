
//  -------------------------------------------
//  Toggle grid view
//  -------------------------------------------
   $('.jsGridToggleButton').on('click', function(){
      var grid = $(this).attr('data-grid');
      $('.jsGridToggleButton').removeClass('is-active');
      $(this).addClass('is-active');
      $('.jsGridToggleWrapper').attr('data-grid', grid);
   });

//  -------------------------------------------
//  Drop down list menu
//  -------------------------------------------
   $('.jSDropDownList li > a').on('click', function(){
      var trigger = $(this);
      var parent = trigger.closest('li');
      var isActive = parent.hasClass('is-active');
      if(isActive){
         parent.removeClass('is-active');
      } else {
         parent.addClass('is-active');
      }
   });

//  -------------------------------------------
//  Full screen handled
//  -------------------------------------------
   $('.JSFullScreenTrigger').on('click', function(){
      var trigger = $(this);
      var fullScreenTarget = trigger.data('fullscreen-target');
      var selectTarget = document.getElementById(fullScreenTarget) ;
      var elem = selectTarget || document.documentElement;
      if(trigger.hasClass('is-fullscreen')){
         trigger.removeClass('is-fullscreen');
         trigger.attr('aria-label', 'Full screen');
         if (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen ) {
            document.exitFullscreen();
            document.mozCancelFullScreen && document.mozCancelFullScreen();
            document.webkitExitFullscreen && document.webkitExitFullscreen();
            document.msExitFullscreen && document.msExitFullscreen();
         }
      } else {
         trigger.addClass('is-fullscreen');
         trigger.attr('aria-label', 'Exit Full screen');
         if (elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen) {
            elem.requestFullscreen();
            elem.mozRequestFullScreen && elem.mozRequestFullScreen();
            elem.webkitRequestFullscreen && elem.webkitRequestFullscreen();
            elem.msRequestFullscreen && elem.msRequestFullscreen();
         }
      }
   });

//  -------------------------------------------
//  Date picker 
//  -------------------------------------------
   $(".datepicker").flatpickr({
      altInput: true,
      altFormat: "j F, Y",
      dateFormat: "Y-m-d",
      defaultDate: "today",
   });

//  -------------------------------------------
//  time picker
//  -------------------------------------------
//    $(".timepicker").flatpickr({
//       enableTime: true,
//       noCalendar: true,
//       dateFormat: "H:i K",
//       defaultDate: new Date(),
//    });

//  -------------------------------------------
//  Time range
//  -------------------------------------------
  $('.jsTimeRange').ionRangeSlider({
    skin: "round",
    grid: true,
    grid_num: 12,
    // type: 'double',
    min: moment("0000", "hhmm").valueOf(),
    max: moment("1200", "hhmm").valueOf(),
    force_edges: true,
    drag_interval: true,
    step: 300000,
    min_interval: 300000,
    prettify: function (num) {
      return moment(num).format('HH:mm');
    }
  });
//  -------------------------------------------
//  Drop down
//  -------------------------------------------
   $('.dropdown-trigger').on('click', function(){
      var trigger = $(this);
      var target = trigger.closest('.dropdown').find('.dropdown-content');
      if(trigger.hasClass('is-open')){
         trigger.removeClass('is-open')
         target.removeClass('is-active');
      } else {
         trigger.addClass('is-open')
         target.addClass('is-active');
      };
   });

   // window.onclick = function(event) {
   //    if (!event.target.matches('.dropdown-trigger')) {
   //       console.log('in');
   //       var dropdowns = document.getElementsByClassName("dropdown-content");
   //       var i;
   //       for (i = 0; i < dropdowns.length; i++) {
   //          var openDropdown = dropdowns[i];
   //          if (openDropdown.classList.contains('is-active')) {
   //          openDropdown.classList.remove('is-active');
   //          }  
   //       }
   //    }
   // }