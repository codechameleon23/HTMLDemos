$().fancybox({
    hash : false,
    idleTime: false,
    selector : '.thumb.filterd a',//apply fancybox to thumbs with filter class only
    baseClass : 'fancybox-custom-layout',
    margin    : 0,
    gutter    : 0,
    infobar   : false,
    animationEffect   : "fade",
    animationDuration : 300,
    // What buttons should appear in the top right corner.
    // Buttons will be created using templates from `btnTpl` option
    // and they will be placed into toolbar (class="fancybox-toolbar"` element)
    buttons : [
        'close',
        "thumbs"
    ],
    onInit : function( instance ) {
        // Create new wrapping element, it is useful for styling
        // and makes easier to position thumbnails
        instance.$refs.inner.wrap( '<div class="fancybox-outer"></div>' );
    },
    caption : function(instance, item) {

        var caption = $(this).find('figcaption').html();    
        return caption;
    },
    // Base template for layout
    baseTpl	:
        '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-inner">' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-stage-ratio"><img class="ratio" src="images/16x9.png"/><div class="fancybox-stage"></div></div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>'+
                '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
            '</div>' +
        '</div>',
    btnTpl : {
        // Arrows
        arrowLeft : '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><i class="fas fa-chevron-circle-left"></i></button>',

        arrowRight : '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><i class="fas fa-chevron-circle-right"></i></button>',

        close : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><i class="fas fa-times"></i></button>',
    }
});
