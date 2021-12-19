//  -------------------------------------------
//  Simple tabs with Select dropdown
//  -------------------------------------------
if($(".tabs-collection").length > 0){
   var tabCollections = $(".tabs-collection");
   tabCollections.each(function(){
      var tabCollection = $(this);
      var tabTriggers = tabCollection.find('.tab');
      var tabTargetAll = tabCollection.find('[data-tab]');
      tabTriggers.on('click', function(){
         if(getViewportWidth() < 576 && $(this).hasClass('active')){
            tabTargetAll.removeClass('active');   
         }else{
            tabTargetAll.removeClass('active');
            tabCollections.find('[data-tab="'+$(this).data('tab')+'"]').addClass('active');
         }
      })
   })
}