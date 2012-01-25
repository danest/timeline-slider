/*	
	Author: Kevin Urrutia
	Plugin: Time Line Slider
	Version: 0.1
	Contact: urrutia.kevin [at] gmail
	Blog: www.kevinurrutia.tumblr.com
*/
(function($){
	$.fn.TimeLineSlider = function(options){
		var defaults = {
			speed : 800,
			transition: 'fade',
			fadeSpeed: 500
		}
		options = $.extend(defaults, options);
		this.each(function(){

			var $this = $(this);
						
			$this.children().bind('click', function(e){
				var current = $(this);
				var moveBy = ($(this).position()['left'] - $(window).width()/2) + 
								$(this).outerWidth(true)/2 +10;
				$('.timeline-holder').stop(true,true).animate({
					'scrollLeft' : moveBy
				}, options.speed,function(){
					if(options.transition === 'slide'){
						changeFeaturedSlide(current);
					} else {
						changeFeaturedFade(current);
					}
				});
			});
			function changeFeaturedSlide(el){
					var src= el.find('img').attr('src');
					$('#featured img').attr('src', src)
			}
			function changeFeaturedFade(el){
				var src= el.find('img').attr('src');
				var $image = $('#featured img').last();
				$image.css('z-index','2');
				ele = $image.clone().css({'position':'absolute','z-index':'1'}).attr("src",src);
				$image.after(ele).fadeOut(options.fadeSpeed,function(){
					if($('#featured img').length > 1){
						//we dont want to many items in the dom
						$('#featured img').first().remove();
					}
				});
			}
			
		});
		//mantain this
		return this;
	};
})(jQuery);

