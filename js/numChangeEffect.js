// JavaScript Document
(function($) {
	//默认参数
	var defaults={
		from: 0,
		to: 100,
		speed: 2000,
		refreshInterval: 100,//数字变化时间间隔
		fixednum:0//保留的小数位数
	};
	function formatter(){
	}
	$.fn.extend({
		///<summary>
		///name of the plugin
		///<summary>
		numChangeEffect:function(options){
			//调用时覆盖默认参数
			var opts = $.extend({},defaults, options||{});
			var h = Math.ceil(opts.speed / opts.refreshInterval),
			i = ((opts.to - opts.from) / h),
			b = opts.from,
			e =0,
			f=$(this),
			d=$(this).selector;
			f.interval=setInterval(a,opts.refreshInterval);
			function a(){
				b += i;
                e++;
				if(e>h-1){
					clearInterval(f.interval);
				}
				$(d).text(b.toFixed(opts.fixednum));
			}
		}
	});
})(jQuery)