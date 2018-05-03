/*filter functionality*/
(function() {

    var $imgs = $('#FAQList .accordion');
    var $buttons = $('#FAQfilter');
    var $buttonActiveClass = 'button-fill';
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
        html: '<b>All</b>',
        class: 'button button-primary button-thin button-lg '+$buttonActiveClass,
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
            html: '<b>'+tagName+'</b>',
            class: 'button button-primary button-thin button-lg '+$buttonDefaultClass,
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