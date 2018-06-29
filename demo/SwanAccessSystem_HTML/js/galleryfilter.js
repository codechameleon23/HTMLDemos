/*filter functionality*/
(function() {

    var $imgs = $('#galleryList .thumb');
    var $buttons = $('#galleryFilter');
    var $buttonActiveClass = 'active is-primary';
    var $buttonDefaultClass = '';
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
        html: '<span class="rollover">All</span>',
        class: 'button animate tab is-secondary '+$buttonActiveClass,
        click: function() {
            $(this)
            .removeClass($buttonDefaultClass)
            .addClass($buttonActiveClass)
            .siblings()
            .removeClass($buttonActiveClass)
            .addClass($buttonDefaultClass);
            $imgs
            .hide()
            .show()
            //.fadeIn('slow')
            .addClass('filterd');
        }
    }).appendTo($buttons);

    $.each(tagged, function(tagName) {
        var $n = $(tagged[tagName]).length;
        $('<a/>', {
            //text: tagName + '(' + $n + ')',
            href : "javascript:void(0)",
            html: '<span class="rollover">'+tagName+'</span>',
            class: 'button animate tab is-secondary '+$buttonDefaultClass,
            click: function() {
                $(this)
                .removeClass($buttonDefaultClass)
                .addClass($buttonActiveClass)
                .siblings()
                .removeClass($buttonActiveClass)
                .addClass($buttonDefaultClass);
                $imgs
                .hide()
                .removeClass('filterd')
                .filter(tagged[tagName])
                .addClass('filterd')
                .show()
                //.fadeIn('slow');
            }
        }).appendTo($buttons);
    });
}());