/*
 * jQuery HoverPulse Plugin by M. Alsup
 * Examples and docs at: http://malsup.com/jquery/hoverpulse/
 * Dual licensed under the MIT and GPL
 * Requires: jQuery v1.2.6 or later
 * @version: 1.03  23-MAY-2011
 */

(function($) {

$.fn.hoverpulse = function(options) {
	// in 1.3+ we can fix mistakes with the ready state
	if (this.length == 0) {
		if (!$.isReady && this.selector) {
			var s = this.selector, c = this.context;
			$(function() {
				$(s,c).hoverpulse(options);
			});
		}
		return this;
	}

	var opts = $.extend({}, $.fn.hoverpulse.defaults, options);

	var parent = this.parent();

	// if not modified size_y is same as size
	opts.size_y = opts.size_y || opts.size;
	// parent must be relatively positioned
	parent.css({ position: 'relative' });
	// pulsing element must be absolutely positioned
	this.css({ position: 'absolute', top: 0, left: 0 });

	this.each(function() {
		var $this = $(this);
		var w = $this.width(), h = $this.height();
		$this.data('hoverpulse.size', { w: parseInt(w), h: parseInt(h) });
	});

	if(parent.is('td')){
		this.wrap("<div style='position: relative; height: "+parent.innerHeight()+"px;'></div>");
	}

	// bind hover event for behavior
	return this.hover(
		// hover over
		function() {
			var $this = $(this);
			$this.parent().css('z-index', opts.zIndexActive);

			var size = $this.data('hoverpulse.size');
			var w = size.w, h = size.h;
			$this.stop().animate({
				top:  ('-'+opts.size_y+'px'),
				left: ('-'+opts.size+'px'),
				height: (h+2*opts.size_y)+'px',
				width:  (w+2*opts.size)+'px'
			}, opts.speed, opts.over);
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
				width:  (w+'px')
			}, opts.speed, function() {
				$this.parent().css('z-index', opts.zIndexNormal);
				opts.out.call(this);
			});
		}
	);
};

$.fn.hoverpulse.defaults = {
	size:  20,
	size_y: 0,
	speed: 200,
	zIndexActive: 100,
	zIndexNormal: 1,
	over: $.noop || function() {},
	out: $.noop || function() {}
};

})(jQuery);