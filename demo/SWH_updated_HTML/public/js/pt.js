document.getScroll = function () {
   if (window.pageYOffset != undefined) {
      return [pageXOffset, pageYOffset];
   } else {
      var sx, sy, d = document,
         r = d.documentElement,
         b = d.body;
      sx = r.scrollLeft || b.scrollLeft || 0;
      sy = r.scrollTop || b.scrollTop || 0;
      return [sx, sy];
   }
}

var intervalID;
(function ($) {
   var supportTouch = $.support.touch,
      scrollEvent = "touchmove scroll",
      touchStartEvent = supportTouch ? "touchstart" : "mousedown",
      touchStopEvent = supportTouch ? "touchend" : "mouseup",
      touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
   $.event.special.swipeupdown = {
      setup: function () {
         var thisObject = this;
         var $this = $(thisObject);
         $this.bind(touchStartEvent, function (event) {
            var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event,
               start = {
                  time: (new Date).getTime(),
                  coords: [data.pageX, data.pageY],
                  origin: $(event.target)
               },
               stop;

            function moveHandler(event) {
               if (!start) {
                  return
               }
               var data = event.originalEvent.touches ? event.originalEvent.touches[0] : event;
               stop = {
                  time: (new Date).getTime(),
                  coords: [data.pageX, data.pageY]
               };
               if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                  event.preventDefault()
               }
            }
            $this.bind(touchMoveEvent, moveHandler).one(touchStopEvent, function (event) {
               $this.unbind(touchMoveEvent, moveHandler);
               if (start && stop) {
                  if (stop.time - start.time < 1000 && Math.abs(start.coords[1] - stop.coords[1]) > 30 && Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                     start.origin.trigger("swipeupdown").trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown")
                  }
               }
               start = stop = undefined
            })
         })
      }
   };
   $.each({
      swipedown: "swipeupdown",
      swipeup: "swipeupdown"
   }, function (event, sourceEvent) {
      $.event.special[event] = {
         setup: function () {
            $(this).bind(sourceEvent, $.noop)
         }
      }
   })
})(jQuery);

var PageTransitions = (function ($) {
   var $main = $('#pt-main'),
      $pages = $main.children('div.pt-page'),
      pagesCount = $pages.length,
      current = 0,
      pagesShow = 9,
      pitemChange = 30,
      isAnimating = !1,
      endCurrPage = !1,
      endNextPage = !1,
      animEndEventNames = {
         'WebkitAnimation': 'webkitAnimationEnd',
         'OAnimation': 'oAnimationEnd',
         'msAnimation': 'MSAnimationEnd',
         'animation': 'animationend'
      },
      animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
      support = Modernizr.cssanimations;

   function init() {
      $pages.each(function () {
         var $page = $(this);
         $page.data('originalClassList', $page.attr('class'))
      });
      $pages.eq(current).addClass('pt-page-current');
      initScrollEvents();
      $('.p-item[data-slide_id="' + (current + 1) + '"]').addClass("current");
      if (PTSettings.loop == "1") {
         var inf = 4;
         for (var i = 0; i <= inf; i++) {
            $(".p-container").prepend($(".p-item").eq($(".p-item").length - i).clone().removeClass("current normal").addClass("clone"))
         }
      }
      var inf = 3;
      var normalIndex = 0;
      for (var i = 0; i <= inf; i++) {
         if (normalIndex >= $(".p-item.normal").length) normalIndex = 0;
         $(".p-container").append($(".p-item.normal").eq(normalIndex).clone().removeClass("current normal").addClass("clone"));
         normalIndex++
      }
      $(".next").click(function () {
         nextPage(13)
      });
      $(".prev").click(function () {
         prevPage(12)
      });
      $(".p-item").click(function () {
         clearInterval(intervalID);
         var activeIndex = $(".p-item.current").index();
         var indexclick = $(this).index();
         var action = "";
         var dChange = indexclick - activeIndex;
         if (dChange < 0) {
            action = "+="
         } else if (dChange > 0) {
            action = "-="
         } else {
            return
         }
         var _this = $(this);
         var dChangemodule = Math.abs(dChange)
         $(this).data("slide_id");
         toPage(12, $(this).data("slide_id"));
         jQuery(".p-container").animate({
            "margin-top": action + "" + (pitemChange * dChangemodule),
         }, 800, function () {
            var $prev = _this;
            $('.p-item').removeClass("current");
            $prev.addClass("current");
            if (dChange > 0) {
               if (!$('.p-item').eq($prev.index() + 4).length) {
                  $('.p-item[data-slide_id="' + ($prev.data("slide_id")) + '"].normal').addClass("current");
                  var margin = -60 - (($prev.data("slide_id") - 1) * pitemChange);
                  jQuery(".p-container").css("margin-top", margin + "px");
                  $prev.removeClass("current")
               }
            } else if (dChange < 0) {
               // console.log("not found");
               // console.log($('.p-item:nth-child(' + ($prev.index() - 2) + ')'));
               if (!$('.p-item:nth-child(' + ($prev.index() - 2) + ')').length) {
                  $('.p-item[data-slide_id="' + ($prev.data("slide_id")) + '"].normal').addClass("current");
                  var margin = -60 - (($prev.data("slide_id") - 1) * pitemChange);
                  jQuery(".p-container").css("margin-top", margin + "px");
                  $prev.removeClass("current")
               }
            }
         })
      })
      if (PTSettings.autoslide == "yes") {
         initAutoSlide()
      }
   }

   function initAutoSlide() {
      intervalID = setInterval(function () {
         // nextPage(PTSettings.f_effect)
         prevPage(PTSettings.f_effect)
      }, PTSettings.autoslideduration)
   }

   function initScrollEvents() {
      // console.log("initScrollEvents");
      jQuery(window).on('mousewheel DOMMouseScroll keydown', function (event) {
         if (jQuery(".pt-slider").length == 0) return;
         event.stopPropagation();
         // console.log('scroll event fired');
         // console.log(event.keyCode);
         // console.log(event.originalEvent.wheelDelta);
         // console.log(event.originalEvent.detail);
         var delta = 0;
         if (event.originalEvent.detail) {
            delta = event.originalEvent.detail * -40
         } else {
            delta = event.originalEvent.wheelDelta
         }
         if (event.keyCode == 40) {
            // console.log(1);
            event.preventDefault();
            // nextPage(PTSettings.f_effect)
         }
         if ((delta / 120 < 0)) {
            // console.log('delta', 2);
            event.preventDefault();
            // nextPage(PTSettings.f_effect)
         }
         if (event.keyCode == 38) {
            event.preventDefault();
            prevPage(PTSettings.b_effect)
         }
         if ((delta / 120 > 0)) {
            event.preventDefault();
            prevPage(PTSettings.b_effect)
         }
      });
      if (jQuery(window).width() <= 768) {
         jQuery("#pt-main").on("swipedown", function (event) {
            prevPage(PTSettings.b_effect)
         })
         jQuery("#pt-main").on("swipeup", function (event) {
            // nextPage(PTSettings.f_effect)
         })
      }
   }

   function nextPage(options) {

      // change content
      window.scrollY < 100 && gotoContentSlide(current);

      var animation = (options.animation) ? options.animation : options;
      animation = parseInt(PTSettings.f_effect);
      if (isAnimating) {
         return !1
      }
      isAnimating = !0;
      var $currPage = $pages.eq(current);
      if (options.showPage) {
         if (options.showPage < pagesCount - 1) {
            current = options.showPage
         } else {
            current = 0
         }
      } else {
         if (current < pagesCount - 1) {
            ++current
         } else {
            current = 0
         }
      }
      var $nextPage = $pages.eq(current).addClass('pt-page-current'),
         outClass = '',
         inClass = '';
      var animationClasses = getAnimationClasses(animation);
      outClass = animationClasses.outClass;
      inClass = animationClasses.inClass;
      $currPage.addClass(outClass).on(animEndEventName, function () {
         $currPage.off(animEndEventName);
         endCurrPage = !0;
         if (endNextPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      $nextPage.addClass(inClass).on(animEndEventName, function () {
         $nextPage.off(animEndEventName);
         endNextPage = !0;
         if (endCurrPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      if (!support) {
         onEndAnimation($currPage, $nextPage)
      }
      jQuery(".p-container").animate({
         "margin-top": "+=-" + pitemChange,
      }, 800, function () {
         var $next = jQuery(".p-item.current").next();
         $('.p-item').removeClass("current");
         $next.addClass("current");
         if (!$('.p-item').eq($next.index() + 4).length) {
            $('.p-item[data-slide_id="' + (current + 1) + '"].normal').addClass("current");
            jQuery(".p-container").css("margin-top", "-60px");
            $next.removeClass("current")
         }
      })
   }

   function prevPage(animation) {
      if (sectionIndex == 0) {

         // change content

         if ((isAnimating)) {
            return !1
         }
         animation = parseInt(PTSettings.b_effect);
         isAnimating = !0;
         var $currPage = $pages.eq(current);
         if (current != 0) {
            --current
         } else {
            current = pagesCount - 1
         }
         window.scrollY < 100 && gotoContentSlide(current);
         var $nextPage = $pages.eq(current).addClass('pt-page-current'),
            outClass = '',
            inClass = '';
         var animationClasses = getAnimationClasses(animation);
         outClass = animationClasses.outClass;
         inClass = animationClasses.inClass;
         $currPage.addClass(outClass).on(animEndEventName, function () {
            $currPage.off(animEndEventName);
            endCurrPage = !0;
            if (endNextPage) {
               onEndAnimation($currPage, $nextPage)
            }
         });
         $nextPage.addClass(inClass).on(animEndEventName, function () {
            $nextPage.off(animEndEventName);
            endNextPage = !0;
            if (endCurrPage) {
               onEndAnimation($currPage, $nextPage)
            }
         });
         if (!support) {
            onEndAnimation($currPage, $nextPage)
         }
         jQuery(".p-container").animate({
            "margin-top": "+=" + pitemChange,
         }, 800, function () {
            var $prev = jQuery(".p-item.current").prev();
            $('.p-item').removeClass("current");
            $prev.addClass("current");
            // console.log($prev.index());
            // console.log($('.p-item:nth-child(' + ($prev.index() - 2) + ')'));
            if (!$('.p-item:nth-child(' + ($prev.index() - 2) + ')').length) {
               $('.p-item[data-slide_id="' + (current + 1) + '"].normal').addClass("current");
               var margin = -60 - (($prev.data("slide_id") - 1) * pitemChange);
               jQuery(".p-container").css("margin-top", margin + "px");
               $prev.removeClass("current")
            }
         })
      }
   }

   function toPage(animation, page) {
      if (isAnimating) {
         return !1
      }
      window.scrollY < 100 && gotoContentSlide(page - 1);

      page = page - 1;
      isAnimating = !0;
      var $currPage = $pages.eq(current);
      if (current < page) {
         animation = parseInt(PTSettings.f_effect)
      } else if (current > page) {
         animation = parseInt(PTSettings.b_effect)
      } else {
         return
      }
      var $nextPage = $pages.eq(page).addClass('pt-page-current');
      var animationClasses = getAnimationClasses(animation);
      var outClass = animationClasses.outClass;
      var inClass = animationClasses.inClass;
      $currPage.addClass(outClass).on(animEndEventName, function () {
         $currPage.off(animEndEventName);
         endCurrPage = !0;
         if (endNextPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      $nextPage.addClass(inClass).on(animEndEventName, function () {
         $nextPage.off(animEndEventName);
         endNextPage = !0;
         if (endCurrPage) {
            onEndAnimation($currPage, $nextPage)
         }
      });
      if (!support) {
         onEndAnimation($currPage, $nextPage)
      }
      current = page
   }

   // function changePagination() {
   //    jQuery(".p-container").animate({
   //       "margin-top": "+=" + pitemChange,
   //    }, 800, function () {
   //       var $prev = jQuery(".p-item.current").prev();
   //       $('.p-item').removeClass("current");
   //       $prev.addClass("current");
   //       console.log($prev.index());
   //       console.log($('.p-item:nth-child(' + ($prev.index() - 2) + ')'));
   //       if (!$('.p-item:nth-child(' + ($prev.index() - 2) + ')').length) {
   //          $('.p-item[data-slide_id="' + (current + 1) + '"].normal').addClass("current");
   //          jQuery(".p-container").css("margin-top", "-90px");
   //          $prev.removeClass("current")
   //       }
   //    })
   // }

   function onEndAnimation($outpage, $inpage) {
      endCurrPage = !1;
      endNextPage = !1;
      var isMac = /mac/i.test(navigator.platform);
      var setTimeoutTime = 0;
      if (isMac) setTimeoutTime = 400;
      resetPage($outpage, $inpage);
      setTimeout(function () {
         isAnimating = !1
      }, setTimeoutTime)
   }

   function resetPage($outpage, $inpage) {
      $outpage.attr('class', $outpage.data('originalClassList'));
      $inpage.attr('class', $inpage.data('originalClassList') + ' pt-page-current')
   }

   function getAnimationClasses(animation) {
      var outClass;
      var inClass;
      switch (animation) {
         case 1:
            outClass = 'pt-page-moveToLeft';
            inClass = 'pt-page-moveFromRight';
            break;
         case 2:
            outClass = 'pt-page-moveToRight';
            inClass = 'pt-page-moveFromLeft';
            break;
         case 3:
            outClass = 'pt-page-moveToTop';
            inClass = 'pt-page-moveFromBottom';
            break;
         case 4:
            outClass = 'pt-page-moveToBottom';
            inClass = 'pt-page-moveFromTop';
            break;
         case 5:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
         case 6:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
         case 7:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
         case 8:
            outClass = 'pt-page-fade';
            inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
         case 9:
            outClass = 'pt-page-moveToLeftFade';
            inClass = 'pt-page-moveFromRightFade';
            break;
         case 10:
            outClass = 'pt-page-moveToRightFade';
            inClass = 'pt-page-moveFromLeftFade';
            break;
         case 11:
            outClass = 'pt-page-moveToTopFade';
            inClass = 'pt-page-moveFromBottomFade';
            break;
         case 12:
            outClass = 'pt-page-moveToBottomFade';
            inClass = 'pt-page-moveFromTopFade';
            break;
         case 13:
            outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
            inClass = 'pt-page-moveFromRight';
            break;
         case 14:
            outClass = 'pt-page-moveToRightEasing pt-page-ontop';
            inClass = 'pt-page-moveFromLeft';
            break;
         case 15:
            outClass = 'pt-page-moveToTopEasing pt-page-ontop';
            inClass = 'pt-page-moveFromBottom';
            break;
         case 16:
            outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
            inClass = 'pt-page-moveFromTop';
            break;
         case 17:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromRight pt-page-ontop';
            break;
         case 18:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromLeft pt-page-ontop';
            break;
         case 19:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromBottom pt-page-ontop';
            break;
         case 20:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-moveFromTop pt-page-ontop';
            break;
         case 21:
            outClass = 'pt-page-scaleDown';
            inClass = 'pt-page-scaleUpDown pt-page-delay300';
            break;
         case 22:
            outClass = 'pt-page-scaleDownUp';
            inClass = 'pt-page-scaleUp pt-page-delay300';
            break;
         case 23:
            outClass = 'pt-page-moveToLeft pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 24:
            outClass = 'pt-page-moveToRight pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 25:
            outClass = 'pt-page-moveToTop pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 26:
            outClass = 'pt-page-moveToBottom pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 27:
            outClass = 'pt-page-scaleDownCenter';
            inClass = 'pt-page-scaleUpCenter pt-page-delay400';
            break;
         case 28:
            outClass = 'pt-page-rotateRightSideFirst';
            inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
            break;
         case 29:
            outClass = 'pt-page-rotateLeftSideFirst';
            inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
            break;
         case 30:
            outClass = 'pt-page-rotateTopSideFirst';
            inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
            break;
         case 31:
            outClass = 'pt-page-rotateBottomSideFirst';
            inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
            break;
         case 32:
            outClass = 'pt-page-flipOutRight';
            inClass = 'pt-page-flipInLeft pt-page-delay500';
            break;
         case 33:
            outClass = 'pt-page-flipOutLeft';
            inClass = 'pt-page-flipInRight pt-page-delay500';
            break;
         case 34:
            outClass = 'pt-page-flipOutTop';
            inClass = 'pt-page-flipInBottom pt-page-delay500';
            break;
         case 35:
            outClass = 'pt-page-flipOutBottom';
            inClass = 'pt-page-flipInTop pt-page-delay500';
            break;
         case 36:
            outClass = 'pt-page-rotateFall pt-page-ontop';
            inClass = 'pt-page-scaleUp';
            break;
         case 37:
            outClass = 'pt-page-rotateOutNewspaper';
            inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
            break;
         case 38:
            outClass = 'pt-page-rotatePushLeft';
            inClass = 'pt-page-moveFromRight';
            break;
         case 39:
            outClass = 'pt-page-rotatePushRight';
            inClass = 'pt-page-moveFromLeft';
            break;
         case 40:
            outClass = 'pt-page-rotatePushTop';
            inClass = 'pt-page-moveFromBottom';
            break;
         case 41:
            outClass = 'pt-page-rotatePushBottom';
            inClass = 'pt-page-moveFromTop';
            break;
         case 42:
            outClass = 'pt-page-rotatePushLeft';
            inClass = 'pt-page-rotatePullRight pt-page-delay180';
            break;
         case 43:
            outClass = 'pt-page-rotatePushRight';
            inClass = 'pt-page-rotatePullLeft pt-page-delay180';
            break;
         case 44:
            outClass = 'pt-page-rotatePushTop';
            inClass = 'pt-page-rotatePullBottom pt-page-delay180';
            break;
         case 45:
            outClass = 'pt-page-rotatePushBottom';
            inClass = 'pt-page-rotatePullTop pt-page-delay180';
            break;
         case 46:
            outClass = 'pt-page-rotateFoldLeft';
            inClass = 'pt-page-moveFromRightFade';
            break;
         case 47:
            outClass = 'pt-page-rotateFoldRight';
            inClass = 'pt-page-moveFromLeftFade';
            break;
         case 48:
            outClass = 'pt-page-rotateFoldTop';
            inClass = 'pt-page-moveFromBottomFade';
            break;
         case 49:
            outClass = 'pt-page-rotateFoldBottom';
            inClass = 'pt-page-moveFromTopFade';
            break;
         case 50:
            outClass = 'pt-page-moveToRightFade';
            inClass = 'pt-page-rotateUnfoldLeft';
            break;
         case 51:
            outClass = 'pt-page-moveToLeftFade';
            inClass = 'pt-page-rotateUnfoldRight';
            break;
         case 52:
            outClass = 'pt-page-moveToBottomFade';
            inClass = 'pt-page-rotateUnfoldTop';
            break;
         case 53:
            outClass = 'pt-page-moveToTopFade';
            inClass = 'pt-page-rotateUnfoldBottom';
            break;
         case 54:
            outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomLeftIn';
            break;
         case 55:
            outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomRightIn';
            break;
         case 56:
            outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomTopIn';
            break;
         case 57:
            outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateRoomBottomIn';
            break;
         case 58:
            outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeLeftIn';
            break;
         case 59:
            outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeRightIn';
            break;
         case 60:
            outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeTopIn';
            break;
         case 61:
            outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateCubeBottomIn';
            break;
         case 62:
            outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselLeftIn';
            break;
         case 63:
            outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselRightIn';
            break;
         case 64:
            outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselTopIn';
            break;
         case 65:
            outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
            inClass = 'pt-page-rotateCarouselBottomIn';
            break;
         case 66:
            outClass = 'pt-page-rotateSidesOut';
            inClass = 'pt-page-rotateSidesIn pt-page-delay200';
            break;
         case 67:
            outClass = 'pt-page-rotateSlideOut';
            inClass = 'pt-page-rotateSlideIn';
            break
      }
      return {
         outClass: outClass,
         inClass: inClass
      }
   }
   init();

   function test() {
      jQuery(".p-container").animate({
         "margin-top": "-150px",
      }, 800, function () {
         jQuery(".p-container").css("margin-top", "-60px")
      })
   }
   return {
      init: init,
      nextPage: nextPage,
      prevPage: prevPage,
      test: test,
   }
})(jQuery);