(function($){
	$.widget("ui.sticky", {
		options:{
			resize : true,
			setzindex : '',/*any integer value*/
			autozindex : true,/*set highest z-index*/
			resolute : false,/*fixed on current position*/
			stickyto : '',/*class/id*//*NOTE: must be parent*/
			startpoint : '',/*any number/class/ID/DOM*/
			endpoint : '',/*any number/class/ID/DOM*/
			sbstitute : true,/*Place holder*/
			horizontalFix : false,/*if true : fix for both scroll*/
			callbacks : {
				onstart : function(){},
				onstop : function(){}
			}
		},
		_create: function(){
			var self = this,
			o = self.options,
			el = self.element;

/////////////////////////////*temp*/
			self.rular = $('<div/>',{'class' : 'ruler'}).css({'position':'fixed','height':'1px','right':'auto','border-top':'1px solid #07F40E','z-index':10000001});
			self.rularend = $('<div/>',{'class' : 'rulerend'}).css({'position':'absolute','height':'1px','right':'auto','border-top':'1px solid red','z-index':10000001});
/////////////////////////////*temp*/
			
			self.startpoint = el.data('startpoint') ? el.data('startpoint') : ( o.startpoint ? o.startpoint : '');
			self.endpoint = el.data('endpoint') ? el.data('endpoint') : ( o.endpoint ? o.endpoint : '');
			
			self.parent = el.data('stickyto') ? el.closest($(el.data('stickyto'))) : ( o.stickyto ? el.closest($(o.stickyto)) : el.parent());
			
			self.romeroom = $('<div/>',{'class' : 'romeroom'}).css({'position':'relative','width':'100%','height':'100%','display':'table'});
			self.zindex = o.autozindex ? parseInt(self.getZindex()-1) : (o.setzindex == '' ? 999 : o.setzindex);
			self.sbstitute = $('<div/>',{'class' : 'sbstitute'});
			
			$.when(self.destroy()).done(self.refresh());
			if(o.resize){$(window).resize(function(){self.refresh();})}
			$(window).bind('click dblclick mousedown mouseenter mouseleave',function(e){self.refresh();});
			$(window).scroll(function(){self.scrolling();});
		},
		refresh : function(){
			el = this;

			var bl = parseInt(this.element.css('border-left-width')) ? parseInt(this.element.css('border-left-width')) : 0;
			var br = parseInt(this.element.css('border-right-width')) ? parseInt(this.element.css('border-right-width')) : 0;
			var pt = parseInt(this.element.css('padding-top')) ? parseInt(this.element.css('padding-top')) : 0;
			var pb = parseInt(this.element.css('padding-bottom')) ? parseInt(this.element.css('padding-bottom')) : 0;
			var bt = parseInt(this.element.css('border-top-width')) ? parseInt(this.element.css('border-top-width')) : 0;
			var bb = parseInt(this.element.css('border-bottom-width')) ? parseInt(this.element.css('border-bottom-width')) : 0;
			
			el.mt = parseInt(this.element.css('margin-top')) ? parseInt(this.element.css('margin-top')) : 0;
			el.mb = parseInt(this.element.css('margin-bottom')) ? parseInt(this.element.css('margin-bottom')) : 0;
			el.ml = parseInt(this.element.css('margin-left')) ? parseInt(this.element.css('margin-left')) : 0;
			el.mr = parseInt(this.element.css('margin-right')) ? parseInt(this.element.css('margin-right')) : 0;
			
			var h = this.element.height();
			el.width = parseInt(this.element.width())-(bl+br);
			el.height = h+pt+pb+bt+bb;
			
			if(this.element.css('position') == 'absolute' || this.element.css('position') == 'fixed'){el.top = el.sbstitute.offset().top - el.mt;
			}else{el.top = this.element.offset().top - el.mt;}
			
			el.intialEnd = el.top+h+pt+pb+bt+bb+el.mt+el.mb
			
			if(this.element.css('position') == 'absolute' || this.element.css('position') == 'fixed'){el.left = el.sbstitute.offset().left - el.ml;
			}else{el.left = this.element.offset().left - el.ml;}
			
			if(el.startpoint){
				el.startstickyfrom = jQuery.type(el.startpoint) === 'object'/*if*/ ? parseInt(el.startpoint.offset().top) : (//else
					jQuery.type(el.startpoint) === 'string'/*if*/ ? parseInt($(el.startpoint).offset().top) : (//else
						jQuery.type(el.startpoint) === 'number'/*if*/ ? el.startpoint : el.top
					)
				);
				if(el.startstickyfrom >= el.top)el.startstickyfrom = el.top;
				
				el.top = el.top - el.startstickyfrom;
			}else{
				el.startstickyfrom = 0;
				el.top;
			}
			
/////////////////////////////*temp*/
				 el.rular.remove();
				 $('body').append(el.rular.css({
					'top' : el.startstickyfrom+'px',
					'left' : el.parent.offset().left+'px',
					'width' : el.parent.outerWidth()
				}));
/////////////////////////////*temp*/


			
			var pt = parseInt(el.parent.css('padding-top')) ? parseInt(el.parent.css('padding-top')) : 0;
			var bt = parseInt(el.parent.css('border-top-width')) ? parseInt(el.parent.css('border-top-width')) : 0;
			var pl = parseInt(el.parent.css('padding-left')) ? parseInt(el.parent.css('padding-left')) : 0;
			var br = parseInt(el.parent.css('border-top-right')) ? parseInt(el.parent.css('border-top-right')) : 0;
			
			var pb = parseInt(el.parent.css('padding-bottom')) ? parseInt(el.parent.css('padding-bottom')) : 0;
			var bb = parseInt(el.parent.css('border-bottom-width')) ? parseInt(el.parent.css('border-bottom-width')) : 0;
			
			el.trackTop = el.parent.offset().top+pt+bt;
			el.trackLeft = el.parent.offset().left+pl+br;
			
			if(el.endpoint && el.endpoint!= 0){
				if(jQuery.type(el.endpoint) === 'object'){	

					var obj = this.element.closest(el.endpoint).length > 0 ? this.element.closest(el.endpoint) : $('body').find(el.endpoint);
					
					var eppt = parseInt(obj.css('padding-top')) ? parseInt(obj.css('padding-top')) : 0;
					var epbt = parseInt(obj.css('border-top-width')) ? parseInt(obj.css('border-top-width')) : 0;
					var eppb = parseInt(obj.css('padding-bottom')) ? parseInt(obj.css('padding-bottom')) : 0;
					var epbb = parseInt(obj.css('border-bottom-width')) ? parseInt(obj.css('border-bottom-width')) : 0;
					
					el.roomEnd = $(obj).offset().top+eppt+epbt+$(obj).height()-(eppt-eppb+epbt-epbb);
					el.trackEnd = obj.offset().top+eppt+epbt+obj.height()-(eppt-eppb+epbt-epbb+el.height+el.mt+el.mb)-el.startstickyfrom;
					
				}else if(jQuery.type(el.endpoint) === 'string'){
					
					var obj = this.element.closest($(el.endpoint)).length > 0 ? this.element.closest($(el.endpoint)) : $('body').find($(el.endpoint));
					
					var eppt = parseInt($(obj).css('padding-top')) ? parseInt($(obj).css('padding-top')) : 0;
					var epbt = parseInt($(obj).css('border-top-width')) ? parseInt($(obj).css('border-top-width')) : 0;
					var eppb = parseInt($(obj).css('padding-bottom')) ? parseInt($(obj).css('padding-bottom')) : 0;
					var epbb = parseInt($(obj).css('border-bottom-width')) ? parseInt($(obj).css('border-bottom-width')) : 0;
					
					el.roomEnd = $(obj).offset().top+eppt+epbt+$(obj).height()-(eppt-eppb+epbt-epbb);
					el.trackEnd = $(obj).offset().top+eppt+epbt+$(obj).height()-(eppt-eppb+epbt-epbb+el.height+el.mt+el.mb)-el.startstickyfrom;
					
				}else if(jQuery.type(el.endpoint) === 'number'){
					el.roomEnd = el.endpoint;
					el.trackEnd = el.endpoint-(el.height+el.mt+el.mb)-el.startstickyfrom;
				}
				
				el.apply = el.roomEnd > el.intialEnd ? true : false;
				
/////////////////////////////*temp*/
				el.rularend.remove();
				$('body').append(el.rularend.css({
					'top' : el.endpoint+'px',
					'left' : el.parent.offset().left+'px',
					'width' : el.parent.outerWidth()
				}));
/////////////////////////////*temp*/
				
			}else{
				el.trackEnd = el.trackTop+el.parent.height()-(pt-pb+bt-bb+el.height+el.mt+el.mb)-el.startstickyfrom;
				el.roomEnd = el.trackEnd;
				
				el.apply = true;
				
			}
			
			el._trigger( "stickyInt", null, '');
			el.applyGlue();
				
		},
		applyGlue : function(){
			el = this;
			el.sbstitute.css({
				'width':this.element.outerWidth(true),
				'height':0,
				'margin-top' : this.element.css('margin-top'),
				'margin-right' : this.element.css('margin-right'),
				'margin-bottom' : this.element.css('margin-bottom'),
				'margin-left' : this.element.css('margin-left')
			}).insertAfter(this.element);
			if(this.element.closest('.romeroom').length < 1){
				el.parent.contents().wrapAll(el.romeroom);
			}	
			$('#brgv').text(el.endpoint +'//'+ el.intialEnd);
			this.element.width(el.width);
			el.scrolling();
		},
		scrolling : function(){
			el = this;
			$('#brgv').text(el.endpoint +'//'+ el.intialEnd);
			if(this.element.closest('.romeroom').length > 0){
				if(this.element.data('resolute') || el.options.resolute){
					if(el.options.sbstitute){el.sbstitute.css({'height':el.height});}
					this.element.css({
						/*'position' : 'absolute',//ie doesn't support fixed
						'top' : $(window).scrollTop(),*/
						'position' : 'fixed',
						'top' : this.element.top,
						'left' : el.options.horizontalFix ? '' : el.left - $(window).scrollLeft(),
						'bottom' : 'auto',
						'z-index' : el.getZindex()
					});
				}else{
					if($(window).scrollTop() > el.top && $(window).scrollTop() < el.trackEnd && el.apply){
						if(el.options.sbstitute){el.sbstitute.css({'height':el.height});}
						
						this._trigger( "stickyStart", null, '');
						
						this.element.css({
							/*'position' : 'absolute',//ie doesn't support fixed
							'top' : $(window).scrollTop() - el.startpoint ? el.startstickyfrom : 0,*/
							'position' : 'fixed',
							'top' : el.startpoint ? el.startstickyfrom : 0,
							'left' : el.options.horizontalFix ? '' : el.left - $(window).scrollLeft(),
							'bottom' : 'auto',
							'z-index' : el.zindex
						});
						
					}else if($(window).scrollTop() > el.top && el.apply){
						if(el.options.sbstitute){el.sbstitute.css({'height':el.height});}
						
						this._trigger( "stickyEnd", null, '');
						
						this.element.css({
							'position' : 'absolute',
							'top' : (el.endpoint && el.endpoint!= 0) ? (el.roomEnd - el.trackTop) - el.height : 'auto',
							'left' : el.options.horizontalFix ? '' : el.left - el.trackLeft - 1,
							'bottom' : (el.endpoint && el.endpoint!= 0) ? 'auto' : 0,
							'z-index' : el.zindex
						});
					}else{
						this._trigger( "stickyInt", null, '');
						el.sbstitute.css({'height':0});
						this.element.css({
							'position' : '',
							'top' : '',
							'left' : '',
							'bottom' : '',
							'z-index' : ''
						});
					}
				}
			}
		},
		getZindex : function(){
			var highest = 999;
			$("*").each(function() {
				var current = parseInt($(this).css("z-index"), 10);
				if(current && highest < current) highest = current;
			});
			
			return highest;
		},
		_destroy : function(){
			el = this;
			
			if(this.element.closest('.romeroom').length > 0){
				this.element.css({
					'width':'',
					'position' : '',
					'top' : '',
					'left' : '',
					'bottom' : '',
					'z-index' : ''
				});
				el.parent.find('.sbstitute').remove();
				this.element.unwrap();
			}
			
			if (typeof callback == "function"){
				callback();
			}
			
		}
	});	
})(jQuery);