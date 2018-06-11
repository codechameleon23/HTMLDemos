/*Gallery filter functionality*/
(function() {
    var $imgs = $('#filter-group > .news-card');
    var $buttons = $('#filterTab');
    var $buttonActiveClass = 'is-active';
    var tagged = {};

    $imgs.each(function() {
        var img = this;
        var tags = $(this).data('tags');

        if (tags) {
            tags.split(',').forEach(function(tagName) {
                if (tagged[tagName] == null) {
                    tagged[tagName] = [];
                }
                tagged[tagName].push(img);
            })
        }
    })

    $('<a/>', {
    //text: 'Show All', 
        href : "javascript:void(0)",
        html: '<span>All</span>',
        class: 'button tab has-outline theme-bg_hover '+$buttonActiveClass,
        click: function() {
            $(this)
            //.removeClass($buttonDefaultClass)
            .addClass($buttonActiveClass)
            .siblings()
            .removeClass($buttonActiveClass)
            //.addClass($buttonDefaultClass);
            $imgs
            .removeClass('scale-half')
            .fadeIn('slow')
            .addClass('filterd');
        }
    }).appendTo($buttons);

    $.each(tagged, function(tagName) {
        var $n = $(tagged[tagName]).length;
        $('<a/>', {
            //text: tagName + '(' + $n + ')',
            href : "javascript:void(0)",
            html: '<span>'+tagName+'</span>',
            class: 'button tab has-outline theme-bg_hover',
            click: function() {
                $(this)
                //.removeClass($buttonDefaultClass)
                .addClass($buttonActiveClass)
                .siblings()
                .removeClass($buttonActiveClass)
                //.addClass($buttonDefaultClass);
                $imgs
                .hide()
                .removeClass('filterd')
                .filter(tagged[tagName])
                .addClass('filterd')
                .fadeIn('slow');
            }
        }).appendTo($buttons);
    });
}());