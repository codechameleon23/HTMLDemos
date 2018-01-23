/*Gallery filter functionality*/
(function() {

    // var clrArr = ['bg-green', 'bg-sky', 'bg-orange', 'bg-pink', 'bg-violet'];

    // var getRandom = function(){
    //     return clrArr[Math.floor(Math.random() * clrArr.length)];
    // }

    var $imgs = $('#clinicAddresses .address-label');
    var $buttons = $('#filterClinic');
    var $buttonActiveClass = 'bg-green';
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