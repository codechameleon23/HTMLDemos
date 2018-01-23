/*Gallery filter functionality*/
(function() {
    var $imgs = $('#gallery > .box-item');
    var $buttons = $('#filterTab');
    var $buttonActiveClass = 'bg-orange';
    var $buttonDefaultClass = 'bg-grey-light';
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
        class: 'active btn '+$buttonActiveClass,
        click: function() {
            $(this)
            .removeClass($buttonDefaultClass)
            .addClass('active '+$buttonActiveClass)
            .siblings()
            .removeClass('active '+$buttonActiveClass)
            .addClass($buttonDefaultClass);
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
            class: 'btn '+$buttonDefaultClass,
            click: function() {
                $(this)
                .removeClass($buttonDefaultClass)
                .addClass('active '+$buttonActiveClass)
                .siblings()
                .removeClass('active '+$buttonActiveClass)
                .addClass($buttonDefaultClass);
                $imgs
                //.hide()
                .addClass('scale-half')
                .removeClass('filterd')
                .filter(tagged[tagName])
                .addClass('filterd')
                .removeClass('scale-half')
                .fadeIn('slow');
            }
        }).appendTo($buttons);
    });
}());