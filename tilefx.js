/*
	TileFX - silly image effects using <div>s as pixels
	
	Copyright (c) 2012 Simon Worthington

	The MIT License (MIT):
	Permission is hereby granted, free of charge, to any person obtaining a copy of
	this software and associated documentation files (the "Software"), to deal in
	the Software without restriction, including without limitation the rights to
	use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
	the Software, and to permit persons to whom the Software is furnished to do so,
	subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
	FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
	COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
	IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
	CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	
	Options:
		tilewidth (int): 	width of tiles
		tileheight (int):	height of tiles
		targets (Array):	urls of images to flip between
*/

(function($) {

	var retargetAndFade = function (elem) {
		var targets = elem.parent().data('tilefx').targets;
		elem.fadeOut(600, function () { elem.css('background-image', 'url(' + targets[Math.round(Math.random() * (targets.length-1))] + ')').fadeIn(600) });
	};

	var methods = {
		init: function (options) {
			var settings = $.extend({
				tilewidth: 10,
				tileheight: 10
			}, options);
		
			return this.map( function () {
				var box = $('<div>'), initial = this.getAttribute('src');
				$.each(this.attributes, function() {
					box.attr(this.nodeName, this.nodeValue);
				});
				$(this).replaceWith(box);
				box.data('tilefx', settings);
				
				if (box.css('position') != "relative" && box.css('position') != "absolute")
					box.css('position', 'relative');
				box.css('overflow', 'hidden');
				
				for (var top = 0; top < box.height(); top += settings.tileheight) {
					for (var left = 0; left < box.width(); left += settings.tilewidth) {
						box.append( $('<div>').css({'position': 'absolute',
													'width': settings.tilewidth + 'px',
													'height': + settings.tileheight + 'px',
													'top': top + 'px',
													'left': left + 'px',
													'background-position': (box.width()-left)+'px '+(box.height()-top)+'px',
													'background-image': 'url(' + initial + ')'}));
					}
				}
				
				return box;
			});
		},
		
		scramble: function () {
			$('div', this).each( function () {
				$(this).delay(Math.random() * 2500);
				retargetAndFade($(this));
			});
			
			return this;
		},
		
		wipe: function (speed) {
			speed = speed || 100;
			var tilewidth = this.data('tilefx').tilewidth;
			$('div', this).each( function () {
				$(this).delay(parseInt($(this).css('left')) * speed / tilewidth)
				retargetAndFade($(this));
			});
			
			return this;
		},
		
		retarget: function (targets) {
			var data = this.data('tilefx');
			data.targets = targets;
			this.data('tilefx', data);
			
			return this;
		},
		
		single: function (number) {
			number = number || 1;
			for (var i = number; i > 0; i--) {
				scope = $('div:not(.picked)', this);
				retargetAndFade($(scope[Math.round(Math.random() * (scope.length - 1))]).addClass('picked'));
			}
			$('div.picked', this).removeClass('picked');
		}
	}

	$.fn.tilefx = function (method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.tilefx' );
		}
	};

})(jQuery);