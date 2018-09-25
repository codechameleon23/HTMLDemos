(function($){
	$.widget("ui.zoomit", {
		options : {
			zoompopup : true,
			repeat : true,/*repeat items on next previous*/
			keyboard : true,
			scrolllock : true,/*true : disable body scroll when popup open*/
			thumbactiveClass :''
		},
		_create : function(){
			var self = this,
			o = self.options,
			el = self.element;
			
			self.currentIrem = 0;
			self.ImgArr = [];
			self.ispopup = false;
			
			/*START : create html structure*/
			self.displayArea = el.find('.zmit_displayArea');
			self.thumbArea = el.find('.zmit_thumbArea');
			self.zoomArea = el.find('.zmit_zoomArea');
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
			/*END : create html structure*/
			
			/*START : append image to html*/
			self.zoomimg = $('<img/>',{
				'class':'zmit_zoomImg'
			}).bind({
				click : function(){
					self.nextItem();					
				}
			}).appendTo(self.zoomArea);
			/*END : append image to html*/

			/*START : Apply Controls*/
				/*Display area controls*/
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
			
				/*zoom area controls*/
			self.zoomCloseIco = el.find('.zmit_zoomArea_close').bind({
				click : function(){
					self.closePopup();
				}
			});
			/*END : Apply Controls*/
			
			self.changeDisplay();
			self.zoomArea.popup({
				scrolllock : o.scrolllock,
				onopen : function(){
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
			
			$(window).resize(function(){				
				if(self.ispopup){
					self.changeZoom();
				}
				self.changeDisplay();
			});
			
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
				this.zoomArea.popup('show');
			}
		},
		closePopup : function(){
			if(this.options.zoompopup){
				this.zoomArea.popup('hide');
			}
		},
		changeDisplay : function(){
			el = this;
			var maxWidth = el.displayimgHolder.width();
			var maxHeight = el.displayimgHolder.height();
			
			el.displayimgHolder.html('');
			el.displayimg = $('<img/>',{
				'class':'zmit_displayImg'
			}).bind({
				click : function(){
					el.openPopup();
				}
			}).appendTo(el.displayimgHolder);
			
			var _img = el.displayimg;
			var newImg = new Image;
			newImg.onload = function() {
				_img.src = this.src;
				el.displayimg.attr('src',this.src).hide();
				
				var height = this.height;
				var width = this.width;
				
				if(width < maxWidth && height < maxHeight){
					var newHeight = height;
					var newWidth = width;
				}else{
					var newHeight = getSize(height,width).hasHeight;
					var newWidth = getSize(height,width).hasWidth;
				}
				el.displayimg.css({
					height : newHeight + 'px',
					top: maxHeight/2 - newHeight/2 + 'px',
					left: maxWidth/2 - newWidth/2 + 'px'
				}).fadeIn();
				
				function getSize(nH,nW){
					r = nH/nW;
					if(nH > maxHeight){	
						nH = maxHeight;
						nW = nH/r;
						return getSize(nH,nW)
					}
					else if(nW > maxWidth){
						nW = maxWidth;
						nH = nW*r;
						return getSize(nH,nW)
					}else{
						return {hasHeight : nH,hasWidth : nW};
					}
				}
			}
			newImg.src = $(el.ImgArr[el.currentIrem]).children('img.zoomit_thumbImg').data("medium");
			
			el.thumbArea.find('.zoomit_thumb').removeClass(el.options.thumbactiveClass).eq(el.currentIrem).addClass(el.options.thumbactiveClass);
			if(el.ispopup){
				el.changeZoom();
			}
		},
		changeZoom : function(){
			el = this;
			
			var _img = el.zoomimg;
			var newImg = new Image;
			newImg.onload = function() {
				_img.src = this.src;
				el.zoomimg.attr('src',this.src);
				var h,w = 0;
				h = this.height;
				w = this.width;
				var viewRangeX = el.zoomArea.width();
				var viewRangeY = el.zoomArea.height();
				if(w < viewRangeX && h < viewRangeY){
					el.zoomimg.css({
						top : '50%',
						left : '50%',
						marginLeft : (w/2)*(-1),
						marginTop : (h/2)*(-1),
						position: 'absolute'
						/*top: viewRangeY/2 - h/2 + 'px',
						left: viewRangeX/2 - w/2 + 'px'*/
					});
				}else{
					el.zoomimg.css({
						top: viewRangeY/2 - h/2 + 'px',
						left: viewRangeX/2 - w/2 + 'px'
					});
				}
				el.zoomArea.mousemove(function(event){

						var $this = $(this);
						var parentOffset = $this.offset();
						var mouseX = event.pageX - parentOffset.left;
						var mouseY = event.pageY - parentOffset.top;
						
						var viewRangeX = $this.width();
						var viewRangeY = $this.height();
						
						var contentRangeX = w;
						var contentRangeY = h;
						
						var ratioX = contentRangeX / viewRangeX;
						var ratioY = contentRangeY / viewRangeY;
						
						var differenceX = contentRangeX - viewRangeX;
						var differenceY = contentRangeY - viewRangeY;
						
						var offsetX = (mouseX * ratioX) - mouseX;
						var offsetY = (mouseY * ratioY) - mouseY;
						
						if(w < viewRangeX && h < viewRangeY){
							el.zoomimg.css({
								top : '50%',
								left : '50%',
								marginLeft : (w/2)*(-1),
								marginTop : (h/2)*(-1),
								position: 'absolute'
								/*top: viewRangeY/2 - h/2 + 'px',
								left: viewRangeX/2 - w/2 + 'px'*/
							});
						}else{
							if(h > viewRangeY && w <= viewRangeX){
								el.zoomimg.css({
									top: (offsetY * -1) + 'px',
									left: viewRangeX/2 - w/2 + 'px',
									marginLeft : '',
									marginTop : '',
									position: ''
								});
							}else if(h <= viewRangeY && w > viewRangeX){
								el.zoomimg.css({
									top: viewRangeY/2 - h/2 + 'px',
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
				});
			}
			newImg.src = $(el.ImgArr[el.currentIrem]).children('img.zoomit_thumbImg').data("large");
		}
		
		
	});
})(jQuery);