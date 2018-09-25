(function($){
	$.widget("ui.zoomit", {
		options : {
			zoompopup : true,
			repeat : true,/*repeat items on next previous*/
			keyboard : true,
			scrolllock : true,/*true : disable body scroll when popup open*/
			thumbactiveClass :'',
			moveOnMouse : true,
			loginText : '<span class="zmit_loding"><i class="fa fa-spinner fa-spin"></i></span>',
			
			/*popup callbacks*/
			
			callbacks : {
				onintialise : function(){},
				beforeDisplay : function(){},
				
				beforeopen : function(){},
				onopen : function(){},
				onclose : function(){},
				opentransitionend : function(){},
				closetransitionend : function(){}
			},
			/*popup options*/
			
		},
		_create : function(){
			var self = this,
			o = self.options,
			el = self.element;
			
			self.currentIrem = 0;
			self.ImgArr = [];
			self.ispopup = false;
			
			self.mouseX = 0;
			self.mouseY = 0;
			
			self.displayArea = el.find('.zmit_displayArea');
			self.thumbArea = el.find('.zmit_thumbArea');
			self.zoomArea = el.find('.zmit_zoomArea').bind({
				click : function(event){
					self.mouseX = event.pageX - $(this).offset().left;
					self.mouseY = event.pageY - $(this).offset().top;	
				}
			}).prepend(o.loginText);
			self.zoomImgholder = el.find('.zmit_zoomImgholder').bind({
				click : function(event){
					if(event.pageX < self.getViewportWidth()/2){
						self.prevItem();
					}else{
						self.nextItem();
					}
				}
			}).appendTo(self.zoomArea);
			
			self.displayimgHolder = el.find('.zmit_displayImgHolder').bind({
				click : function(){
					self.openPopup();
				}
			});
			
			
			el.find('.zmit_thumbArea a.zoomit_thumb').each(function(){
				$(this).children('img').addClass('zoomit_thumbImg');
				self.ImgArr.push(this);
			}).bind({
				click : function(){
					self.currentIrem = $.inArray(this, self.ImgArr);
					self.changeDisplay();
				}
			});
			
			self.zoomimg = $('<img/>',{
				'class':'zmit_zoomImg'
			}).appendTo(self.zoomImgholder);
			
			self.zoomOpenIco = el.find('.zmit_zoomArea_open').bind({
				click : function(){
					self.openPopup();
				}
			});
			
			self.displayAreaNext = el.find('.zmit_control_btn_next').bind({
				click : function(){
					self.nextItem();
				}
			});
			self.displayAreaPrev = el.find('.zmit_control_btn_prev').bind({
				click : function(){
					self.prevItem();
				}
			});	
			
			self.zoomCloseIco = el.find('.zmit_zoomArea_close').bind({
				click : function(){
					self.closePopup();
				}
			});
			
			
			$.when(
				o.callbacks.onintialise()
			).done(
				self.changeDisplay()
			);
					
			self.zoomArea.popup({
				background : o.background,
				backgroundactive : o.backgroundactive,
				color : o.color,
				scrolllock : o.scrolllock,
				opacity : o.opacity,
				onopen : function(){
					o.callbacks.onopen();
					self.ispopup = true;
					self.changeZoom();
					/*START : control next previous usiong keyboard*/
					if(o.keyboard){
						self.zoomArea.keyup(function(event){
							if(event.keyCode === 37){self.prevItem();}
							if(event.keyCode === 39){self.nextItem();}
						});
					}
					/*END : control next previous usiong keyboard*/
				},
				onclose : function(){
					self.ispopup = false;
				}
			});
			
			self.displayMaxHeight = self.displayimgHolder.height();/*display area*/
			self.displayMaxWidth = self.displayimgHolder.width();/*display area*/
			self.displaySrcHeight = 0;/*display image*/
			self.displaySrcWidth = 0;/*display image*/
			
			self.zoomMaxHeight = self.zoomArea.height();/*zoom area*/
			self.zoomMaxWidth = self.zoomArea.width();/*zoom area*/
			self.zoomSrcHeight = 0;/*zoom image*/
			self.zoomSrcWidth = 0;/*zoom image*/
			
			$(window).resize(function(){				
				self.displayimgPosition();
			});
			
			
			
			if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent))
			{ 
			   o.moveOnMouse = false;
			   $('body').addClass('touchDevice');
			}else{
				o.moveOnMouse = o.moveOnMouse;
				$('body').removeClass('touchDevice');
			}
		},
		nextItem : function(){
			if(this.currentIrem < parseInt(this.ImgArr.length-1)){
				this.currentIrem++;
			}else{
				if(this.options.repeat){
					this.currentIrem = 0;
				}else{
					
				}
			}
			this.changeDisplay();
		},
		prevItem : function(){
			if(this.currentIrem > 0){
				this.currentIrem--;
			}else{
				if(this.options.repeat){
					this.currentIrem = parseInt(this.ImgArr.length-1);
				}else{
					
				}
			}
			this.changeDisplay();
		},
		openPopup : function(){
			if(this.options.zoompopup){
				if(!$(el.ImgArr[el.currentIrem]).children('img.zoomit_thumbImg').data('noimages'))this.zoomArea.popup('show');
			}
		},
		closePopup : function(){
			if(this.options.zoompopup){
				this.zoomArea.popup('hide');
			}
		},
		changeDisplay : function(){
			el = this;
			$.when(
				el.options.callbacks.beforeDisplay()
			).done(
				function(){
						el.displayimgHolder.html(el.options.loginText);
						el.displayimg = $('<img/>',{
							'class':'zmit_displayImg'
						});/*.bind({
							click : function(){
								el.openPopup();
							}
						});*/
						
						var _img = el.displayimg;
						var newImg = new Image;
						newImg.onload = function() {
							_img.src = this.src;
							el.displayimg.attr('src',this.src).hide();
							el.displayimgHolder.html(el.displayimg);
							el.displaySrcHeight = this.height;
							el.displaySrcWidth = this.width;
							
							el.displayimgPosition();
						}
						newImg.src = $(el.ImgArr[el.currentIrem]).children('img.zoomit_thumbImg').data("medium");
						
						el.thumbArea.find('.zoomit_thumb').removeClass(el.options.thumbactiveClass).eq(el.currentIrem).addClass(el.options.thumbactiveClass);
						if(el.ispopup){
							el.changeZoom();
						}
				}
			);
		},
		changeZoom : function(){
			el = this;
			el.zoomArea.unbind('mousemove');
			var _img = el.zoomimg.hide();
			var newImg = new Image;
			newImg.onload = function() {
				_img.src = this.src;
				el.zoomimg.attr('src',this.src).show();
				el.zoomSrcHeight = this.height;
				el.zoomSrcWidth = this.width;
				el.displayimgPosition();
				
				if(el.options.moveOnMouse){
					$('body').removeClass('touchDevice');
					el.zoomArea.bind('mousemove',function(event){
						var $this = $(this);
						var parentOffset = $this.offset();
						el.mouseX = event.pageX - parentOffset.left;
						el.mouseY = event.pageY - parentOffset.top;
						
						el.zoomMaxHeight = $this.height();
						el.zoomMaxHeight = $this.width();

						el.displayimgPosition();
					});
				}else{
					 $('body').addClass('touchDevice');
				}
			}
			newImg.src = $(el.ImgArr[el.currentIrem]).children('img.zoomit_thumbImg').data("large");
		},
		displayimgPosition : function(){
			el = this;
			if(el.ispopup){
				el.zoomMaxHeight = el.zoomArea.height();
				el.zoomMaxWidth = el.zoomArea.width();
				
				var ratioX = el.zoomSrcWidth / el.zoomMaxWidth;
				var ratioY = el.zoomSrcHeight / el.zoomMaxHeight;

				var offsetX = (el.mouseX * ratioX) - el.mouseX;
				var offsetY = (el.mouseY * ratioY) - el.mouseY;
				
				if(el.zoomSrcWidth < el.zoomMaxWidth && el.zoomSrcHeight < el.zoomMaxHeight){
					el.zoomimg.css({
						top : '50%',
						left : '50%',
						marginLeft : (el.zoomSrcWidth/2)*(-1),
						marginTop : (el.zoomSrcHeight/2)*(-1),
						position: 'absolute'
					});
				}else{
					if(el.zoomSrcHeight > el.zoomMaxHeight && el.zoomSrcWidth <= el.zoomMaxWidth){
						el.zoomimg.css({
							top: (offsetY * -1) + 'px',
							left: el.zoomMaxWidth/2 - el.zoomSrcWidth/2 + 'px',
							marginLeft : '',
							marginTop : '',
							position: ''
						});
					}else if(el.zoomSrcHeight <= el.zoomMaxHeight && el.zoomSrcWidth > el.zoomMaxWidth){
						el.zoomimg.css({
							top: el.zoomMaxHeight/2 - el.zoomSrcHeight/2 + 'px',
							left: (offsetX * -1) + 'px',
							marginLeft : '',
							marginTop : '',
							position: ''
						});
					}else{
						el.zoomimg.css({
							top: (offsetY * -1) + 'px',
							left: (offsetX * -1) + 'px',
							marginLeft : '',
							marginTop : '',
							position: ''
						});
					}
				}
			};
			el.displayMaxHeight = el.displayimgHolder.height();/*display area*/
			el.displayMaxWidth = el.displayimgHolder.width();/*display area*/
			
			if(el.displaySrcWidth < el.displayMaxWidth && el.displaySrcHeight < el.displayMaxHeight){
				var newHeight = el.displaySrcHeight;
				var newWidth = el.displaySrcWidth;
			}else{
				var newHeight = getSize(el.displaySrcHeight,el.displaySrcWidth).hasHeight;
				var newWidth = getSize(el.displaySrcHeight,el.displaySrcWidth).hasWidth;
			}
			el.displayimg.css({
				height : newHeight + 'px',
				top: el.displayMaxHeight/2 - newHeight/2 + 'px',
				left: el.displayMaxWidth/2 - newWidth/2 + 'px'
			}).fadeIn(function(){
				el.displayimg.css({'opacity' : 1});
			});
			
			function getSize(nH,nW){
				r = nH/nW;
				if(nH > el.displayMaxHeight){	
					nH = el.displayMaxHeight;
					nW = nH/r;
					return getSize(nH,nW)
				}
				else if(nW > el.displayMaxWidth){
					nW = el.displayMaxWidth;
					nH = nW*r;
					return getSize(nH,nW)
				}else{
					return {hasHeight : nH,hasWidth : nW};
				}
			}
		},
		getViewportWidth : function(){
		   if (window.innerWidth){return window.innerWidth;}
		   else if (document.body && document.body.offsetWidth){return document.body.offsetWidth;}
		   else{return 0;}
		},
		getViewportHeight : function(){
		   if (window.innerHeight){return window.innerHeight;}
		   else if (document.body && document.body.offsetHeight){return document.body.offsetHeight;}
		   else{return 0;}
		}
	});
})(jQuery);