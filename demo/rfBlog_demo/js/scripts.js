// alert(getViewportHeight());
// function getViewportHeight(){if (window.innerHeight){return window.innerHeight;}else if (document.body && document.body.offsetHeight){return document.body.offsetHeight;}else{return 0;}}

$(function(){

    /*Navbar toggle*/
    $(".hamburger").on('click',  function(){
        $(this).toggleClass("is-active");
    });

    /*Bounce one after another*/
    var bouncers = [];
    var bc = 0;
    var bc_timer;
    var bc_interval = 4500;//Start time
    
    $('.bouncer').each(function(){
        bouncers.push($(this));
    });

    bcFirsttime();
    function bcFirsttime(){
        toggleBounce();
        bounceOnebyOne();
    }
    
    function bounceOnebyOne() {
        bc_timer = setInterval(function(){    
            toggleBounce();
        }, bc_interval);
    }

    function toggleBounce(){
        $('.bouncer').removeClass('animated bounceIt');
        $(bouncers[bc]).addClass('animated bounceIt');
        
        if(bc < bouncers.length - 1){
            bc++;
        }else{
            bc = 0;
        }
    }
    
    /*Shake one after another*/
    var shakers = [];
    var sc = 0;
    var sc_timer;
    var sc_interval = 5600;//Start time

    $('.shaker').each(function(){
        shakers.push($(this));
    });
    
    scFirsttime();
    function scFirsttime(){
        toggleShake();
        shakeOnebyOne();
    }
    
    function shakeOnebyOne() {
        sc_timer = setInterval(function(){
            toggleShake()
        }, sc_interval);
    }

    function toggleShake(){
        $('.shaker').removeClass('animated shakeIt');
        $(shakers[sc]).addClass('animated shakeIt');
    
        if(sc < shakers.length - 1){
            sc++;
        }else{
            sc = 0;
        }
    }
    
    /*Pulse one after another*/
    var pulsers = [];
    var pc = 0;
    var pc_timer;
    var pc_interval = 3700;//Start time

    $('.pulser').each(function(){
        pulsers.push($(this));
    });

    pcFirsttime();
    function pcFirsttime(){
        togglePulse();
        pulseOnebyOne();
    }

    function pulseOnebyOne() {
        pc_timer = setInterval(function(){
            togglePulse()
        }, pc_interval);
    }

    function togglePulse(){
        $('.pulser').removeClass('animated pulseIt');

        setTimeout(function(){
            $(pulsers[pc]).addClass('animated pulseIt');            
        }, 500)

        if(pc < pulsers.length - 1){
            pc++;
        }else{
            pc = 0;
        }
    }

    /* Section wise scroll*/
    $.scrollify({
        section : ".section",
        updateHash: true,
        scrollSpeed:1100,
        easing: "easeOutExpo",
        
        before:function(index) {
    
            pageActive( $.scrollify.current() );
    
            if(index > 0){
                $('body').addClass('not-slide_1');
                clearInterval(bc_timer);
                clearInterval(sc_timer);
                clearInterval(pc_timer);
            }else{
                $('body').removeClass('not-slide_1');
                bounceOnebyOne();
                shakeOnebyOne();
                pulseOnebyOne();
            }
        },
        afterRender:function() {
            pageActive( $.scrollify.current() );
        }
    });

    /*Got to slide*/
    $('.goto_button').on('click', function(){

        $(".hamburger").removeClass("is-active");

        slideName = $(this).attr('href');
        $.scrollify.instantMove(slideName);
    });
    /*Next slide*/
    $('.next_button').on('click', function(){
        $.scrollify.next();
    });
    /*Prev slide*/
    $('.prev_button').on('click', function(){
        $.scrollify.previous();
    });
    /*Go to top*/
    $('.gotoTop_button').on('click', function(){
        $.scrollify.move(0);
        // var body = $("html, body");
        // body.stop().animate({scrollTop:0}, 500, 'swing', function() {});
    });


    var content =$('#privacynotice_popup').find('.popup-body').attr('data-content')
    $('#privacynotice_popup').find('.popup-body').load(content);

    /* Popup */
    $('.popup').popup({
        scrolllock : true,
        opacity : '.4',
        beforeopen: function() {
            $.scrollify.disable();
        },
        onclose: function() {
            $.scrollify.enable();
        }
    });

    
    /* Privacy Policy poppup*/
    ///$('#privacynotice_popup').popup({});


    /*Submit contact us form*/
	// Get the form.
	var form = $('#ajax-contact');
	// Get the messages div.
	var formMessages = $('#form-messages');
	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
        // Stop the browser from submitting the form.
        $(form).find('.button').prop('value', 'submitting..').attr('disabled', 'disabled');
        
		e.preventDefault();
		// Serialize the form data.
		var formData = $(form).serialize();
		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
            $(formMessages).fadeIn();
			// Set the message text.
            $(formMessages).text(response);

            setTimeout(function () {
                $(formMessages).fadeOut();
                $(form).find('.button').prop('value', 'submit').removeAttr("disabled"); 
            }, 2000);
			// Clear the form.
			$('#name').val('');
			$('#email').val('');
			$('#phone').val('');
            $('#message').val('');

		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
            $(formMessages).fadeIn();
			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
            }

            setTimeout(function () {
                $(formMessages).fadeOut();
                $(form).find('.button').prop('value', 'submit').removeAttr("disabled"); 
            }, 2000);
		});

	});


    /* instagram feeds */
    if ($('.strip-carousel').length){//if element exists

        var instaFeed = new Instafeed({
            get: 'user',
            userId: '7834359227',
            accessToken: '7834359227.8a9cc2b.46a8a4d456a04cebb8d32d59fc1ab52f',
            tagName: '',
            limit : 4,
            template: '<div class="item"><div class="item-img"><a href="{{link}}" class="img-wrap"><img class="" src="{{image}}" /></a></div></div>',
            sortBy: 'most-recent',
            resolution : 'standard_resolution',
            after : function(){

                /*Strip carousel*/
                stripCarousel = $('.strip-carousel');

                stripCarousel.owlCarousel({
                    items:4,
                    loop:true,
                    nav:false,
                    dots:false,
                    autoplay:true,
                    autoplayTimeout:3000,
                    autoplayHoverPause:true,
                    responsive:{
                        0:{
                            items:3
                        },
                        600:{
                            items:4
                        }
                    }
                });

            }
        });
        instaFeed.run();
    }



});


function pageActive(currentSlide){
    currentSlide = $.scrollify.current();
    var navactive = currentSlide.attr('data-nav');
    var sectionName = currentSlide.attr('data-section-name');
    var pageTheme = currentSlide.attr('data-theme');
    var slideFooter = currentSlide.attr('data-footer');

    $('body').attr({'data-theme':''}).attr({
        'data-theme': pageTheme ? pageTheme : '',
        'data-footer': slideFooter ? slideFooter : "default_footer",
        'data-nav': navactive ? navactive : '',
        'data-section-name': sectionName ? sectionName : ''
    });

    $('.navbar li').removeClass('text_highlight');
    $('.navbar li.'+navactive).addClass('text_highlight');

    $('#fullpage >  section').removeClass('active');
    currentSlide.addClass('active');
}
