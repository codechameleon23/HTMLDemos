//  -------------------------------------------
//  Popup
//  -------------------------------------------
   $('.popup').popup({
      opacity: 0,
      background: false,
      // absolute: true
      onopen: function() {
         // searchBarClose();
         filterPanelClose();
       }
   });