/*
 * jQuery HoverPulse Plugin by M. Alsup
 * Examples and docs at: http://malsup.com/jquery/hoverpulse/
 * Dual licensed under the MIT and GPL
 * Requires: jQuery v1.2.6 or later
 */

(function($) {

$.fn.hoverpulse = function(options) {
	var opts = $.extend({}, $.fn.hoverpulse.defaults, options);

	// parent must be relatively positioned
	this.parent().css({ position: 'relative' });
	// pulsing element must be absolutely positioned
	this.css({ position: 'absolute', top: 0, left: 0 });

	this.each(function() {
		var $this = $(this);
		var w = $this.width(), h = $this.height();
		$this.data('hoverpulse.size', { w: parseInt(w), h: parseInt(h) });
	});

	// bind hover event for behavior
	return this.hover(
		// hover over
		function() {
			var $this = $(this);
			$this.parent().css('z-index', opts.zIndexActive);
			
			var size = $this.data('hoverpulse.size');
			var w = size.w, h = size.h;
			$this.stop().animate({ 
				top:  ('-'+opts.size+'px'), 
				left: ('-'+opts.size+'px'), 
				height: (h+2*opts.size)+'px', 
				width:	(w+2*opts.size)+'px' 
			}, opts.speed);
		},
		// hover out
		function() {
			var $this = $(this);
			var size = $this.data('hoverpulse.size');
			var w = size.w, h = size.h;
			
			$this.stop().animate({ 
				top:  0, 
				left: 0, 
				height: (h+'px'), 
				width:	(w+'px') 
			}, opts.speed, function() {
				$this.parent().css('z-index', opts.zIndexNormal);
			});
		}
	);
};

$.fn.hoverpulse.defaults = {
	size:  20,
	speed: 200,
	zIndexActive: 100,
	zIndexNormal: 1
};

})(jQuery);
