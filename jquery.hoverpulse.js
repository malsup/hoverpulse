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
	var magnifying = opts.magnify > 1;

	/* if using the original size options rather than the magnify option, setup size_y */
	if(!magnifying){
		// if not modified size_y is same as size
		opts.size_y = opts.size_y || opts.size;
	}
	
	var parent = this.parent();

	// parent must be relatively positioned
	parent.css({ position: 'relative' });
	
	// pulsing element must be absolutely positioned
	this.css({ position: 'absolute', top: 0, left: 0 });

	this.each(function() {
		var $this = $(this);
		var w = $this.width(), h = $this.height();
		var mw = w*opts.magnify, mh = h*opts.magnify;
		$this.data('hoverpulse.size', { w: parseInt(w), h: parseInt(h), mw: parseInt(mw), mh: parseInt(mh) });
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
			var mw = size.mw, mh = size.mh, w = size.w, h = size.h;
			
			/* if using the original size options rather than the magnify option, setup size_y */
			if(!magnifying){
				var newHeight = h+2*opts.size_y;
				var newWidth = w+2*opts.size;
				var leftPos = opts.size;
				var topPos = opts.size_y;
			}
			/* if using the new magnify option */
			else{
				var newHeight = mh;
				var newWidth = mw;
				var leftPos = (mw-w) / 2;
				var topPos = (mh-h) / 2;
			}

			$this.stop().animate({
				top:  ('-'+topPos+'px'),
				left: ('-'+leftPos+'px'),
				height: newHeight+'px',
				width:  newWidth+'px'
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
	magnify: 1,
	size:  20,
	size_y: 0,
	speed: 200,
	zIndexActive: 100,
	zIndexNormal: 1,
	over: $.noop || function() {},
	out: $.noop || function() {}
};

})(jQuery);