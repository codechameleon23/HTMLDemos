/*Gallery filter functionality*/
(function() {
    var $imgs = $('#newsupdates .card');
    var $buttons = $('#filterTab');
    var $animation = 'fadeIn animated';
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
        html: '<span>View All</span>',
        class: 'active',
        click: function() {
            $(this)
            .addClass('active')
            .siblings()
            .removeClass('active');
            $imgs.fadeIn('slow').addClass($animation);
        }
    }).appendTo($buttons);

    $.each(tagged, function(tagName) {
        var $n = $(tagged[tagName]).length;
        $('<a/>', {
            //text: tagName + '(' + $n + ')',
            href : "javascript:void(0)",
            html: '<span>'+tagName+'</span>',
            click: function() {
                $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');
                $imgs
                .hide().removeClass($animation)
                .filter(tagged[tagName]).addClass($animation)
                .fadeIn('slow');
            }
        }).appendTo($buttons);
    });
}());